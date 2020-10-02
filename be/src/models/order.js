'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Discount, { foreignKey: 'discountId' })
      this.belongsTo(models.User, { foreignKey: 'userId' })
      this.hasMany(models.Payment, { foreignKey: 'orderId' })
      this.hasMany(models.Order_Item, { foreignKey: 'orderId' })
    }
  };
  Order.init({
    discountId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    courierName: DataTypes.STRING,
    courierService: DataTypes.STRING,
    courierPrice: DataTypes.INTEGER,
    totalPayment: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};