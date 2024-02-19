const usersService = require("../services/users.service");

const addUser = async (req, res) => {
	const {email, firstName, lastName, phoneNumber} = req.body;

	try {
		const result = await usersService.addUser(email, firstName, lastName, phoneNumber);
		res.status(200).json(result);
	} catch (error) {
		console.error("Error adding users:", error);
		res.status(400).json({error: error.message});
	}
};
module.exports = {addUser};
