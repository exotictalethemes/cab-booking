'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {

      id: { type: Sequelize.UUID,defaultValue: Sequelize.UUIDV4 , primaryKey: true},
      name : { type : Sequelize.STRING, allowNull : false },
      email : {type : Sequelize.STRING, allowNull : false },
      password : {type : Sequelize.STRING, allowNull : false }

    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};