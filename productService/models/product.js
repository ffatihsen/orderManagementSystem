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
    }
  }
  Product.init({
    name:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    stock: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    price: {
      type:DataTypes.DECIMAL,
      allowNull:false
    },
    tax: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 20,
    }
  }, {
    sequelize,
    modelName: 'Product',
    underscored:true
  });
  return Product;
};