'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Admins', [{
      firstName: 'First',
      lastName: 'Dummy',
      username: 'firstdummy',
      password: '$2b$10$EfxBTxcOjA7i207lJoxvB.P2QIEp6tBs8cG/nD3Yy06gn7CIMGCmC', // 12345678
      salt: '$2b$10$f1si6T3fPDoPK860k2eZ8u',
      email: 'dacc2770@gmail.com',
      phoneNumber: '0812354681755',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Admins', null, {})
  }
};
