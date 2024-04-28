'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('CardModels', {
      fields: ['userId'],
      type: 'foreign key',
      name: '"userId"',
      references: { //Required field
        table: 'UserModels',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    
    await queryInterface.addConstraint('CardModels', {
      fields: ['itemsId'],
      type: 'foreign key',
      name: '"itemsId"',
      references: { //Required field
        table: 'ItemsModels',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint("CardModels", "userId");
    await queryInterface.removeConstraint("CardModels", "itemsId");
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
