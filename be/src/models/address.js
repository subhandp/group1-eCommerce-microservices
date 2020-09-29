'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "userId" })
      this.belongsTo(models.Admin, { foreignKey: "adminId" })
    }
  };
  Address.init({
    adminId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    addressName: DataTypes.STRING,
    city: DataTypes.STRING,
    zipcode: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};