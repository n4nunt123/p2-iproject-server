'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const data = require('../data/shield.json').map(el => {
      return {
        ...el,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    })
    await queryInterface.bulkInsert('Shields', data)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Shields', null, {});
  }
};
