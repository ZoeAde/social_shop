var express = require('express');
var router = express.Router();
var moment = require('moment');
var jwt = require('jwt-simple');
var request = require('request');
var qs = require('querystring');

var config = require('../../_config');
var models = require('../models/index.js');


// *** login required *** //
function ensureAuthenticated(req, res, next) {
  if (!(req.headers && req.headers.authorization)) {
    return res.status(400).send({
      message: 'You did not provide a JSON Web Token in the authorization header.'
    });
  }

  // decode the token
  var header = req.headers.authorization.split(' ');
  var token = header[1];
  var payload = jwt.decode(token, config.TOKEN_SECRET);
  var now = moment().unix();

  // check if the token has expired
  if (now > payload.exp) {
    return res.status(401).send({
      message: 'Token has expired. '
    });
  }

  // check if the user still exists in the db
    models.User.find({
        where: {
          instagram_id: payload.sub
        }
    }).then(function(user) {
    if (!user) {
      return res.status(400).send({
        message: 'User no longer exists. '
      });
    }
    req.user = user;
    next();
  });
}

// *** generate token *** //
function createToken(user) {
  var payload = {
    exp: moment().add(14, 'days').unix(),
    iat: moment().unix(),
    sub: user._id
  };
  return jwt.encode(payload, config.TOKEN_SECRET);
}

router.post('/instagram', function(req, res) {
  var accessTokenUrl = 'https://api.instagram.com/oauth/access_token';

  var params = {
    client_id: req.body.clientId,
    redirect_uri: req.body.redirectUri,
    client_secret: config.INSTAGRAM_SECRET,
    code: req.body.code,
    grant_type: 'authorization_code'
  };

  // Step 1. Exchange authorization code for access token.
  request.post({ url: accessTokenUrl, form: params, json: true }, function(error, response, body) {
    // console.log(body);
    // Step 2a. Link user accounts.
    if (req.headers.authorization) {

        models.User.find({
          where: {
            instagram_id: body.user.id
          }
        }).then(function(existingUser) {
        if (existingUser) {
          return res.status(409).send({ message: 'There is already an Instagram account that belongs to you' });
        }

        var token = req.headers.authorization.split(' ')[1];
        var payload = jwt.decode(token, config.TOKEN_SECRET);
        models.User.find({
          where: {
            instagram_id: payload.sub
          }
        }).then(function(user) {
          if (!user) {
            return res.status(400).send({ message: 'User not found' });
          }
          user.instagram_id = body.user.id;
          user.email = null;
          user.save(function() {
            var token = createToken(user);

            res.send({
              token: token,
              user: user
            });
          });
        });
      });
    } else {
      // Step 2b. Create a new user account or return an existing one.
      console.log(body.user.id);
        models.User.findOne({
          where: {
            instagram_id: body.user.id
          }
        }).then(function(existingUser) {
        if (existingUser) {
          return res.send({
            token: createToken(existingUser),
            user: existingUser
          });
        } else {
        var user = models.User.create({
          name: body.user.full_name,
          email: null,
          username: body.user.username,
          profile_picture: body.user.profile_picture,
          instagram_id: body.user.id
        }).then(function() {
          var token = createToken(user);

          res.send({
            token: token,
            user: user
          });
        });
        }
      });
    }
  });
});

router.get('/api/feed', ensureAuthenticated, function(req, res) {
  console.log('this is my token: ', token);
  var feedUrl = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=' + token;
  var params = { access_token: req.user.accessToken };

  request.get({ url: feedUrl, qs: params, json: true }, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body.data);
    }
  });
});


module.exports = router;
