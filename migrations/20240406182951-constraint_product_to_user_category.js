'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('ProductModels', {
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
    await queryInterface.addConstraint('ProductModels', {
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
    await queryInterface.addConstraint('ProductModels', {
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
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint("ProductModels", "categoryId");
    await queryInterface.removeConstraint("ProductModels", "userId");
    await queryInterface.removeConstraint("ProductModels", "countryId");
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
