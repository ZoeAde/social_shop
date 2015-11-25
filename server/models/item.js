'use strict';
module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define('Item', {
    title: DataTypes.STRING,
    seller: DataTypes.STRING,
    buyer: DataTypes.STRING,
    size: DataTypes.STRING,
    category: DataTypes.STRING,
    condition: DataTypes.STRING,
    brand: DataTypes.STRING,
    summary: DataTypes.STRING,
    minimum: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Item.belongsTo(models.User);
      }
    }
  });
  return Item;
};
