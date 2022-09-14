'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const data = require('../data/equipment.json').map(el => {
      return {
        ...el,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    })
    await queryInterface.bulkInsert('Weapons', data)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Weapons', null, {});
  }
};
