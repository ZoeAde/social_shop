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


//recieve code from instagram auth and save data to db
 function(request, accessToken, refreshToken, profile, done) {
  console.log(profile._json.data.counts.media);
  models.User.create({
    token: accessToken,
    name: profile.displayName,
    username: profile.full_name,
    bio: profile.bio,
    profile_picture: profile.profile_picture,
    instagram_id: profile.id,
    media: profile._json.data.counts.media,
    followed_by: profile._json.data.counts.followed_by,
    follows: profile._json.data.counts.follows
  }).then(function(user) {
    return done(null, user);
  });
}));

// serialize user into the session
init();


module.exports = passport;
