'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Discounts', [{
      discountName: 'Diskon Dummy',
      expired: new Date(),
      total: 0.3,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Discounts', null, {})
  }
};
