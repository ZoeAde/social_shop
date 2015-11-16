'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    code: DataTypes.STRING
    //profile_picture:DataTypes.STRING
    //full_name:DataTypes.STRING
    //id:DataTypes.STRING
    //media:DataTypes.INTEGER
    //followed_by:DataTypes.INTEGER
    //follows:DataTypes.INTEGER
    //bio:DataTypes.STRING
    //token: DataTypes.STRING
    //phone: DataTypes.STRING
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
