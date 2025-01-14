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
    }
  }
  Order.init({
    order_id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull:false
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull:false
    },
    status: {
      type:DataTypes.STRING,
      allowNull:false
    },
    total_amount:{
      type: DataTypes.DECIMAL,
      allowNull:false
    },
    tax_amount:{
      type: DataTypes.DECIMAL,
      allowNull:false,
      defaultValue:0
    }
  }, {
    sequelize,
    modelName: 'Order',
    underscored:true
  });
  return Order;
};