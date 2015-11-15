'use strict';
module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define('Item', {
    seller: DataTypes.STRING,
    buyer: DataTypes.STRING,
    size: DataTypes.STRING,
    category: DataTypes.STRING,
    summary: DataTypes.STRING,
    condition: DataTypes.STRING,
    status: DataTypes.STRING,
    minimum: DataTypes.INTEGER,
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
