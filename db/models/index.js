const {User, userValidationSchema} = require("./user");
const Enterprise = require("./enterprise");
const UserEnterprises = require("./user_enterprises");
const {Sequelize} = require("sequelize");

Enterprise.belongsToMany(User, {
	through: {
		model: UserEnterprises,
		unique: false,
		scope: {
			permissions: Sequelize.ARRAY(Sequelize.STRING)
		}
	},
	foreignKey: "enterpriseId",
	otherKey: "userId"
});

User.belongsToMany(Enterprise, {
	through: {
		model: UserEnterprises,
		unique: false,
		scope: {
			permissions: Sequelize.ARRAY(Sequelize.STRING)
		}
	},
	foreignKey: "userId",
	otherKey: "enterpriseId"
});

module.exports = {User, Enterprise, UserEnterprises, userValidationSchema};
