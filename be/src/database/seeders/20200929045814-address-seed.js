'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Addresses', [{
      adminId: 1,
      addressName: 'Alamat rumah',
      city: 'Medan',
      zipcode: '4052',
      address: 'Jalan simpang siur, gg pergelutan no 48',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 1,
      addressName: 'Alamat rumah',
      city: 'Medan',
      zipcode: '4052',
      address: 'Jalan surgawi, gg pergelutan no 48',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 1,
      addressName: 'Alamat kost',
      city: 'Medan',
      zipcode: '4052',
      address: 'Jalan duniawi, gg pergelutan no 48',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Addresses', null, {})
  }
};
