'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Checkout extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Order, { foreignKey: 'orderId' })
      this.hasMany(models.Payment, { foreignKey: 'chekoutId' })
    }
  };
  Checkout.init({
    orderId: DataTypes.INTEGER,
    date: DataTypes.DATE,
    note: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Checkout',
  });
  return Checkout;
};