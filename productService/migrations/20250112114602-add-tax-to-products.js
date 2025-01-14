'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.addColumn('products', 'tax', {
      type: Sequelize.DECIMAL,
      allowNull: false,
      defaultValue: 20,
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('products', 'tax');
  }
};
