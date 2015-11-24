'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    token: DataTypes.STRING,
    profile_picture: DataTypes.STRING,
    full_name: DataTypes.STRING,
    instagram_id: DataTypes.STRING,
    media: DataTypes.INTEGER,
    followed_by: DataTypes.INTEGER,
    follows: DataTypes.INTEGER,
    bio: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};

//address
//city
//state
//zip
//phone number;
