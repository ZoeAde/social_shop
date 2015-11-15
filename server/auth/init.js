var passport = require('passport');
var models = require('../models/index');


module.exports = function() {

// serialize and deserialize user (passport)
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  console.log(models.User);
  models.User.findOne({
    where: {id:models.User.id}
  }).then(function(user) {
    return done(null, user);
  });
});

};
