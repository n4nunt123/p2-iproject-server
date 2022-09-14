'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookmarks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      rightHand: {
        type: Sequelize.STRING
      },
      leftHand: {
        type: Sequelize.STRING
      },
      helmet: {
        type: Sequelize.STRING
      },
      chestArmor: {
        type: Sequelize.STRING
      },
      gauntlet: {
        type: Sequelize.STRING
      },
      legArmor: {
        type: Sequelize.STRING
      },
      talisman1: {
        type: Sequelize.STRING
      },
      talisman2: {
        type: Sequelize.STRING
      },
      talisman3: {
        type: Sequelize.STRING
      },
      talisman4: {
        type: Sequelize.STRING
      },
      UserId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bookmarks');
  }
};