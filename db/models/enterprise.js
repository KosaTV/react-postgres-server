const {Sequelize, sequelize} = require("../index");

const Enterprise = sequelize.define("enterprise", {
	enterpriseId: {
		field: "enterprise_id",
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	name: {
		field: "name",
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			len: [3, 100]
		}
	},
	taxId: {
		field: "tax_id",
		type: Sequelize.STRING,
		unique: true,
		allowNull: false,
		validate: {
			len: [3, 20]
		}
	},
	address: {
		field: "address",
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			len: [3, 255]
		}
	}
});

module.exports = Enterprise;
