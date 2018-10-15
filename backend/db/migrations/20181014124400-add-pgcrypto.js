'use strict';

const addPgcrypto = async (sequelize) => {
	let rawQueryStr = 'CREATE EXTENSION pgcrypto;';
	await sequelize.query(rawQueryStr);
}
const removePgcrypto = async (sequelize) => {
	let rawQueryStr = 'DROP EXTENSION IF EXISTS pgcrypto;';
	await sequelize.query(rawQueryStr);
}
export default {
  up: async (queryInterface, Sequelize) => {
		await addPgcrypto(queryInterface.sequelize);
  },
  down: async (queryInterface, Sequelize) => {
    await removePgcrypto(queryInterface.sequelize);
  }
};