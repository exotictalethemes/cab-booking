'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('bookings', 
      [
      {
        userid : '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
        to: 'Goa',
        from : 'Leh-Ladakh'
      },
      {
        userid : '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
        to: 'Srinagar',
        from : 'Andaman'
      },
      {
        userid : '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
        to: 'Binsar',
        from : 'Coorg'
      },
      {
        userid : '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
        to: 'Kerala',
        from : 'Kanatal'
      },
      {
        userid : '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
        to: 'Kasol',
        from : 'Kutch'
      },
      {
        userid : '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
        to: 'Rishikesh',
        from : 'Shimla'
      },
      {
        userid : '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
        to: 'Udaipur',
        from : 'Manali'
      },
      {
        userid : '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
        to: 'Jodhpur',
        from : 'Jaisalmer'
      },
      {
        userid : '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
        to: 'Mukteshwar',
        from : 'Mukteshwar'
      },
      {
        userid : '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
        to: 'Sikkim',
        from : 'Cherrapunji'
      },
            {
        userid : '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
        to: 'Mathura',
        from : 'Jabalpur'
      },
      
      
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
