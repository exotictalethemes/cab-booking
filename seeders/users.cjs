'use strict';
const { v4: uuidv4 } = require('uuid');
module.exports = {
  up: async (queryInterface, Sequelize) => {
 
 
      await queryInterface.bulkInsert('users', 
      [
      {
        id : '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
        name: 'test',
        email : "test@test.com",
        password : "test",
      },
      {
        id : uuidv4(),
        name: 'taylor',
        email : "taylor@alzfjl.com",
        password : "taylordafsefsedf",
      },
      {
        id : uuidv4(),
        name: 'lulu',
        email : "lulu@alzfjl.com",
        password : "luluafsefsedf",
      },
      {
        id : uuidv4(),
        name: 'honey',
        email : "honey@alzfjl.com",
        password : "honeysafsefsedf",
      },
      {
        id : uuidv4(),
        name: 'William C. Hepp',
        email : "WilliamCHepp@jourrapide.com",
        password : "fohph2Cee",
      },
      {
        id : uuidv4(),
        name: 'Dennis T. Tan',
        email : "DennisTTan@dayrep.com",
        password : "eiPhue3zae",
      },
      {
        id : uuidv4(),
        name: 'Michael A. Hall',
        email : "MichaelAHall@teleworm.us",
        password : "ahwai7Moob5p",
      },
      {
        id : uuidv4(),
        name: 'Shirley R. Gay',
        email : "ShirleyRGay@jourrapide.com",
        password : "Rai0Shauh",
      },
      {
        id : uuidv4(),
        name: 'Ron M. Roye',
        email : "RonMRoye@dayrep.com",
        password : "Ohfu0ifo9b",
      } 
    ],{timestamps: false});
 
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
