'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('bookings', {
      id: { type: Sequelize.INTEGER , autoIncrement: true, primaryKey: true},
      userid : { type: Sequelize.UUID, allowNull : false ,primaryKey: false},
      to : { type : Sequelize.STRING, allowNull : false },
      from : { type : Sequelize.STRING, allowNull : false }

    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('bookings');
  }
};