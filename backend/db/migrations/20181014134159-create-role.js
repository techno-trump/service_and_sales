'use strict';
import db from '../.';
export default {
  up: async (queryInterface, Sequelize) => {
		await db.Role.sync({ force: true });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('roles');
  }
};