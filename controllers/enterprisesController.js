const enterprisesService = require("../services/enterprises.service");

const addUsers = async (req, res) => {
	const {userHashes, taxId, permissions} = req.body;

	try {
		const result = await enterprisesService.addUsers(userHashes, taxId, permissions);
		res.status(200).json(result);
	} catch (error) {
		console.error("Error adding users:", error);
		res.status(400).json({error: error.message});
	}
};

const getUsers = async (req, res) => {
	try {
		const {taxId, page} = req.query;

		const result = await enterprisesService.getUsers(taxId, page);

		res.status(200).json(result);
	} catch (error) {
		console.error("Error getting users:", error);
		res.status(400).json({error: error.message});
	}
};

module.exports = {addUsers, getUsers};
