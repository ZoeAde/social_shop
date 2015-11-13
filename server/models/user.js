'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    first: DataTypes.STRING,
    last: DataTypes.STRING,
    email: DataTypes.STRING,
    instagram: DataTypes.STRING,
    UserId: DataTypes.SERIAL
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Item);
        User.hasMany(models.Bid);
      }
    }
  });
  return User;
};
