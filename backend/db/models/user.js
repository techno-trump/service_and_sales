'use strict';
export default (sequelize, DataTypes) => {
	const hooks = {
		beforeSave: (record, options) => {
			record.password = 'hello';
		}
	};
	const fields = {
			id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
			login: {
				unique: true,
				allowNull: false,
				type: DataTypes.STRING
			},
			password:  {
				type: DataTypes.STRING
			},
			name: {
				allowNull: false,
				type: DataTypes.STRING
			},
			surname: {
				type: DataTypes.STRING
			},
			emails: {
				type: DataTypes.STRING
			},
			phones: {
				type: DataTypes.STRING
			},
      created_at: {
				
        allowNull: false,
        type: DataTypes.DATE
      },
			created_by: {
        type: DataTypes.INTEGER,
				references: {
					model: 'users',
					key: 'id'
				}
      },
      updated_at: {
        type: DataTypes.DATE
      },
      updated_by: {
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
		tableName: 'users',
		hooks
	};
  const userModel = sequelize.define('User', fields, config);
  userModel.associate = function(models) {
    userModel.belongsToMany(models.Role, { through: 'user_roles', as: 'user' });
  };
  return userModel;
};