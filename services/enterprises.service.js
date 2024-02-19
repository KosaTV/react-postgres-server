const {Op} = require("sequelize");
const {Enterprise, User, UserEnterprises} = require("../db/models");

const addUsers = async (userHashes, taxId, permissions) => {
	try {
		const enterprise = await Enterprise.findOne({where: {taxId}});
		if (!enterprise) {
			throw new Error(`Enterprise with taxId ${taxId} not found`);
		}

		const users = await User.findAll({where: {userId: {[Op.in]: userHashes}}});
		if (users.length !== userHashes.length) {
			throw new Error("One or more users not found");
		}

		const promises = users.map(async user => {
			// await enterprise.addUser(user, {through: {permissions: permissions, active: true}}); //* - Sequalize doesn't allow add additional column for joining table, so I used manual approach instead
			await UserEnterprises.create({
				userId: user.userId,
				enterpriseId: enterprise.enterpriseId,
				permissions: permissions
			});
		});

		await Promise.all(promises);

		return {message: "Users added to enterprise successfully with permissions"};
	} catch (error) {
		console.error("Error adding users to enterprise:", error);
		throw error;
	}
};

const getUsers = async taxId => {
	try {
		let users = [];

		if (taxId) {
			const enterprises = await Enterprise.findAll({where: {taxId}});

			for (const enterprise of enterprises) {
				const userEnterprises = await UserEnterprises.findAll({where: {enterpriseId: enterprise.enterpriseId}});

				const userHashes = userEnterprises.map(entry => entry.userId);

				const matchedUsers = await User.findAll({where: {userId: userHashes}});

				users = users.concat(matchedUsers);
			}
		} else {
			users = await User.findAll();
		}

		return users;
	} catch (error) {
		console.error("Error getting users:", error);
		throw error;
	}
};

module.exports = {addUsers, getUsers};
