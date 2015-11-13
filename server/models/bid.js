'use strict';
module.exports = function(sequelize, DataTypes) {
  var Bid = sequelize.define('Bid', {
    ItemId: DataTypes.STRING,
    UserId: DataTypes.STRING,
    bidAmount: DataTypes.NUMBER
  }, {
    classMethods: {
      associate: function(models) {
        Bid.belongsTo(models.User);
      }
    }
  });
  return Bid;
};
