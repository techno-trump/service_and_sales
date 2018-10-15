'use strict';
import db from '../.';
export default {
  up: async (queryInterface, Sequelize) => {
		await db.UserRole.sync({ force: true });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user_roles');
  }
};