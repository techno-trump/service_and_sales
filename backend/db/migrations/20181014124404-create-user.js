'use strict';
import db from '../.';

const addPassHashingTrigger = async (sequelize) => {
	let rawQueryStr = 'CREATE OR REPLACE FUNCTION users_password_hashing() ';
	rawQueryStr += 'RETURNS trigger AS ';
  rawQueryStr += '$BODY$ ';
	rawQueryStr += 'BEGIN ';
	rawQueryStr += 'IF ((TG_OP = \'INSERT\' OR TG_OP = \'UPDATE\' AND NEW.password != OLD.password) AND NEW.password IS NOT NULL AND NEW.password != \'\')';
	rawQueryStr += 'THEN NEW.password = crypt(NEW.password, gen_salt(\'md5\')); END IF; ';
	rawQueryStr += 'RETURN NEW; ';
	rawQueryStr += 'END; ';
	rawQueryStr += '$BODY$ LANGUAGE plpgsql VOLATILE';
	await sequelize.query(rawQueryStr);
	rawQueryStr = 'CREATE TRIGGER password_hashing ';
	rawQueryStr += 'BEFORE INSERT OR UPDATE ';
  rawQueryStr += 'ON users FOR EACH ROW ';
	rawQueryStr += 'EXECUTE PROCEDURE users_password_hashing();';
  await sequelize.query(rawQueryStr);
};
const addCreatedByCheck = async (sequelize) => {
	let rawQueryStr = 'ALTER TABLE users ';
	rawQueryStr += 'ADD constraint created_by_check CHECK(created_by IS NOT NULL OR login = \'system\');';
	await sequelize.query(rawQueryStr);
}
export default {
  up: async (queryInterface, Sequelize) => {
		await db.User.sync({ force: true });
		await addPassHashingTrigger(queryInterface.sequelize);
		await addCreatedByCheck(queryInterface.sequelize);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};