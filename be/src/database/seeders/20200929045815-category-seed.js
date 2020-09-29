'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories', [{
      productId: 1,
      categoryName: 'Makanan',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      productId: 2,
      categoryName: 'Makanan',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {})
  }
};
