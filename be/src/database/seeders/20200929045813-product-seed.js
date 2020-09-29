'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [{
      adminId: 1,
      name: 'Dummy Product 1',
      price: '50000',
      weight: 50,
      description: 'Ini barang bla bla bla',
      tags: 'Baru, ya',
      stock: 50,
      imageId: 12,
      imageName: 'https://res.cloudinary.com/dvuvqraf1/image/upload/v1599021462/md97fd1zoz9mnimfjyww.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      adminId: 1,
      name: 'Dummy Product 2',
      price: '50000',
      weight: 50,
      description: 'Ini barang bla bla bla',
      tags: 'Baru, ya',
      stock: 50,
      imageId: 12,
      imageName: 'https://res.cloudinary.com/dvuvqraf1/image/upload/v1599021462/md97fd1zoz9mnimfjyww.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {})
  }
};
