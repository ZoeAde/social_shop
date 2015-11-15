'use strict';
module.exports = function(sequelize, DataTypes) {
  var Bid = sequelize.define('Bid', {
    itemId: DataTypes.STRING,
    userId: DataTypes.STRING,
    bidAmount: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Bid.belongsTo(models.User);
      }
    }
  });
  return Bid;
};
