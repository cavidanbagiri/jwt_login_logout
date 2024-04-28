'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('ItemsModels', {
      fields: ['countryId'],
      type: 'foreign key',
      name: '"countryId"',
      references: { //Required field
        table: 'CountryModels',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    await queryInterface.addConstraint('ItemsModels', {
      fields: ['categoryId'],
      type: 'foreign key',
      name: '"categoryId"',
      references: { //Required field
        table: 'CategoryModels',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    await queryInterface.addConstraint('ItemsModels', {
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
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint("ItemsModels", "userId");
    await queryInterface.removeConstraint("ItemsModels", "categoryId");
    await queryInterface.removeConstraint("ItemsModels", "countryId");
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
