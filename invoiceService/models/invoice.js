'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Invoice.init({
    order_id: {
      type:DataTypes.UUID,
      allowNull:false
    },
    user_id: {
      type:DataTypes.UUID,
      allowNull:false
    },
    user_email: {
      type:DataTypes.STRING,
      allowNull:false
    },
    user_name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    invoice_date: {
      type:DataTypes.DATE,
      allowNull:false
    },
    total_amount: {
      type:DataTypes.FLOAT,
      allowNull:false
    },
    tax_amount: {
      type:DataTypes.FLOAT,
      allowNull:false
    },
    status: {
      type:DataTypes.STRING,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Invoice',
    underscored:true
  });
  return Invoice;
};