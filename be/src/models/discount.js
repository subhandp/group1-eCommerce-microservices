'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Discount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Order, { foreignKey: 'discountId' })
    }
  };
  Discount.init({
    dicountName: DataTypes.STRING,
    expired: DataTypes.DATE,
    total: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Discount',
  });
  return Discount;
};