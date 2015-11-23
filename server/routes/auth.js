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
    sub: user.instagram_id,
    id: user.id
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
    console.log('body user:', body.user);
    // Step 2a. Link user accounts.
    if (req.headers.authorization) {

        models.User.find({
          where: {
            instagram_id: body.user.id
          }
        }).then(function(existingUser) {
          console.log('body user id: ', body.user.id);
        if (existingUser) {
          return res.status(409).send({ message: 'There is already an Instagram account that belongs to you' });
        }

        var token = req.headers.authorization.split(' ')[1];
        var payload = jwt.decode(token, config.TOKEN_SECRET);
        models.User.find({
          where: {
            instagram_id: body.user.id
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
  var instagram_id = req.user.instagram_id;
  var instagramUrl = "https://api.instagram.com/v1/users/" + instagram_id + "/media/recent/?client_id=311624c2f9f9454a9c7c053b234cc12a";

  console.log('instagram URL', instagramUrl);
  request
    .get(instagramUrl, function(e, r, user) {
      // console.log('e:', e);
      // console.log('r:', r);
      var singleUrl = JSON.parse(user).data[0].images.standard_resolution.url
      console.log('user:', singleUrl);
      res.send({ url: singleUrl });
    })
  //   .on('response', function(response) {
  //     console.log('this is the start of my response: ', Object.keys(response.req));
  // });
});





module.exports = router;
