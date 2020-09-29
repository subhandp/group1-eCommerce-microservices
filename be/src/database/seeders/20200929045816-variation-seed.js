'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Variations', [{
      productId: 1,
      color: 'blue',
      size: 'M',
      material: 'cloth',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      productId: 2,
      color: 'blue',
      size: 'M',
      material: 'cloth',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Variations', null, {})
  }
};
