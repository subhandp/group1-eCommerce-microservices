'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'First',
      lastName: 'User',
      username: 'firstuser',
      password: '$2b$10$EfxBTxcOjA7i207lJoxvB.P2QIEp6tBs8cG/nD3Yy06gn7CIMGCmC', // 12345678
      salt: '$2b$10$f1si6T3fPDoPK860k2eZ8u',
      email: 'oliviergiroud@gmail.com',
      phoneNumber: '0812356521969',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
};
