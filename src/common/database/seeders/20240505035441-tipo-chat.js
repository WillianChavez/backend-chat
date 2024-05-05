'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ctl_tipo_chat', [{
      nombre: 'Grupal',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      nombre: 'Individual',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ctl_tipo_chat', null, {});
  }
};
