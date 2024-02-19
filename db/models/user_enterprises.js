const {Sequelize, sequelize} = require("../index");

const UserEnterprises = sequelize.define("user_enterprise", {
	userId: {
		field: "user_id",
		type: Sequelize.STRING
	},
	enterpriseId: {
		field: "enterprise_id",
		type: Sequelize.INTEGER
	},
	permissions: {
		field: "permissions",
		type: Sequelize.ARRAY(Sequelize.STRING),
		defaultValue: []
	}
});

module.exports = UserEnterprises;
