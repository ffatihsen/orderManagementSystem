'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OrderItem.init({
    order_id: {
      type:DataTypes.UUID,
      allowNull:false
    },
    product_id: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    quantity: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    price: {
      type:DataTypes.DECIMAL,
      allowNull:false
    },
    tax: {
      type:DataTypes.DECIMAL,
      allowNull:false,
      defaultValue:0
    }
  }, {
    sequelize,
    modelName: 'OrderItem',
    underscored:true
  });
  return OrderItem;
};