'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ctl_tipo_chat', [{
      nombre: 'Grupal',
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      nombre: 'Individual',
      created_at: new Date(),
      updated_at: new Date(),
    }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ctl_tipo_chat', null, {});
  }
};
