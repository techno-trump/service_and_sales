import Sequelize from 'sequelize';
import logger from '../../logger';
const env = process.env.NODE_ENV || 'development';
const config = require('../config.js')[env];

let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}
sequelize.query(
	`CREATE DATABASE ${sequelize.getQueryInterface().quoteIdentifier(config.database)}`,
	{ type: sequelize.QueryTypes.RAW })
.then(() => {
	logger.info(`Database ${config.database} created.`);
	process.exit(0);
})
.catch(ex => {
	if (ex.name == 'SequelizeDatabaseError') {
		let duplicateDbErrorCode;
		switch (config.dialect) {
			case 'postgres':
				duplicateDbErrorCode = '42P04';
				break;
		}
		if (ex.original.code == duplicateDbErrorCode) {
			logger.info(`Database ${config.database} already exists.`);
			process.exit(0);
		} else {
			exitBecouseOfError(ex);
		}
	} else {
		exitBecouseOfError(ex);
	}
});

function exitBecouseOfError (msg) {
	logger.error(msg);
	process.exit(1);
}