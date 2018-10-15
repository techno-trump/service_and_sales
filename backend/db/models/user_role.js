'use strict';
export default (sequelize, DataTypes) => {
	const fields = {
			user_id: {
				allowNull: false,
        type: DataTypes.INTEGER,
				references: {
            model: 'users',
            key: 'id'
          }
      },
      role_id: {
				allowNull: false,
        type: DataTypes.INTEGER,
				references: {
            model: 'roles',
            key: 'id'
          }
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE
      },
			created_by: {
				allowNull: false,
        type: DataTypes.INTEGER,
				references: {
					model: 'users',
					key: 'id'
				}
      }
		};
	const config = {
		timestamps: false,
		underscored: true,
		tableName: 'user_roles'
	};
  const userRolesModel = sequelize.define('UserRole', fields, config);
  userRolesModel.associate = function(models) {
    // associations can be defined here
  };
  return userRolesModel;
};