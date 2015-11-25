'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      seller: {
        type: Sequelize.STRING
      },
      buyer: {
        type: Sequelize.STRING
      },
      size: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      condition: {
        type: Sequelize.STRING
      },
      brand: {
        type: Sequelize.STRING
      },
      summary: {
        type: Sequelize.STRING
      },
      minimum: {
        type: Sequelize.STRING
      },
      imgUrl: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Items');
  }
};