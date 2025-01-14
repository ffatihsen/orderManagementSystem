'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InvoiceItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  InvoiceItem.init({
    invoice_id: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    product_id:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    product_name:{
      type:DataTypes.STRING,
      allowNull:false
    },
    quantity: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    price: {
      type:DataTypes.FLOAT,
      allowNull:false
    },
    tax: {
      type:DataTypes.FLOAT,
      allowNull:false
    },
    total_price: {
      type:DataTypes.FLOAT,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'InvoiceItem',
    underscored:true
  });
  return InvoiceItem;
};