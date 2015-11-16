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


//recieve code from instagram auth
 function(request, accessToken, refreshToken, profile, done) {
  models.User.create({
    token: accessToken,
    name: profile.displayName,
    username: profile.full_name,
    bio: profile.bio,
    profile_picture: profile.profile_picture,
    id: profile.id,
    media: profile.counts.media,
    followed_by: profile.counts.followed_by,
    follows: profile.counts.follows
  }).then(function(user) {
    return done(null, user);
  });
}));

// serialize user into the session
init();


module.exports = passport;
