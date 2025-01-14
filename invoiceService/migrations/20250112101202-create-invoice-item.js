'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('invoice_items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      invoice_id: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull:false
      },
      tax: {
        type: Sequelize.FLOAT,
        allowNull:false
      },
      total_price: {
        type: Sequelize.FLOAT,
        allowNull:false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('InvoiceItems');
  }
};