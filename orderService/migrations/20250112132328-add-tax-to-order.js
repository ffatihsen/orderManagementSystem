'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('orders', 'tax_amount', {
      type: Sequelize.DECIMAL,
      allowNull: false,
      defaultValue: 0,
    });

    await queryInterface.addColumn('order_items', 'tax', {
      type: Sequelize.DECIMAL,
      allowNull: false,
      defaultValue: 0,
    });


  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('orders', 'taxAmount');
    await queryInterface.removeColumn('OrderItems', 'tax');

  }
};
