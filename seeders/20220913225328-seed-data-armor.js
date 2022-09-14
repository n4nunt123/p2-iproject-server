'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const data = require('../data/armor.json').map(el => {
      return {
        ...el,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    })
    await queryInterface.bulkInsert('Armors', data)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Armors', null, {});
  }
};
