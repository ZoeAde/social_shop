var passport = require('passport');
var InstagramStrategy = require('passport-instagram').Strategy;

var models = require('../models/index');
var config = require('../../_config');
var init = require('./init');

passport.use(new InstagramStrategy({
    clientID: config.instagram.clientID,
    clientSecret: config.instagram.clientSecret,
    callbackURL: config.instagram.callbackURL,
    passReqToCallback: true
  },


//CHECK HOW TO CALL BACK USERNAME IN PARAMS
 function(request, accessToken, refreshToken, profile, done) {
  console.log('test:', request.query.code);
  models.User.create({
    code: request.query.code
  }).then(function(user) {
    return done(null, user);
  });
}));

// serialize user into the session
init();


module.exports = passport;
