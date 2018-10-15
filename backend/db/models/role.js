'use strict';
export default (sequelize, DataTypes) => {
	const fields = {
			id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
				allowNull: false,
        type: DataTypes.STRING
      },
			alias: {
				allowNull: false,
				unique: true,
        type: DataTypes.STRING
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
		tableName: 'roles'
	};
  const roleModel = sequelize.define('Role', fields, config);
  roleModel.associate = function(models) {
    roleModel.belongsToMany(models.User, { through: 'user_roles', as: 'role' });
  };
  return roleModel;
};