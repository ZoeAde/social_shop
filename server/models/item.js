'use strict';
module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define('Item', {
    ItemId: DataTypes.SERIAL,
    seller: DataTypes.STRING,
    buyer: DataTypes.STRING,
    size: DataTypes.STRING,
    category: DataTypes.STRING,
    description: DataTypes.STRING,
    condition: DataTypes.STRING,
    status: DataTypes.STRING,
    minimum: DataTypes.NUMBER,
    imgUrl: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Item.belongsTo(models.User);
      }
    }
  });
  return Item;
};
