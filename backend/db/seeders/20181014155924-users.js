'use strict';
export default {
  up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('users', null, {});
		await queryInterface.bulkInsert('users', [{
			login: 'system',
			name: 'system',
			created_at: 'NOW()'
		},
    {
			login: 'admin',
			name: 'Administrator',
      password: 'admin',
			created_at: 'NOW()',
      created_by: 1
		}], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
