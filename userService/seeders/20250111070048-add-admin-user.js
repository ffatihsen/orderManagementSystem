'use strict';

const bcrypt = require('bcryptjs'); 
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    const hashedPassword = await bcrypt.hash('1234567Ab!', 10);

    await queryInterface.bulkInsert('users', [
      {
        user_id: uuidv4(),
        name: 'admin',
        email: 'admin@gmail.com',
        password: hashedPassword,
        role: 'admin',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);



  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', { email: 'admin@gmail.com' }, {});
  }
};
