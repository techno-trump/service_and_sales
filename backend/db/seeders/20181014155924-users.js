'use strict';
export default {
  up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('users', null, {});
		await queryInterface.bulkInsert('users', [{
			login: 'system',
			name: 'system',
			created_at: 'NOW()'
		}], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
