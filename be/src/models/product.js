'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Admin, { foreignKey: 'adminId' })
      this.hasMany(models.Category, { foreignKey: 'productId' })
      this.hasMany(models.Variation, { foreignKey: 'productId' })
      this.hasMany(models.Order_Item, { foreignKey: 'productId' })
    }
  };
  Product.init({
    adminId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    weight: DataTypes.INTEGER,
    description: DataTypes.STRING,
    tags: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    imageId: DataTypes.STRING,
    imageName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};