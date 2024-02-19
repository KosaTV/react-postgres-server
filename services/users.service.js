const {userValidationSchema, User} = require("../db/models");
const validateWithSchema = require("../helpers/validateWithSchema");

const addUser = async (email, firstName, lastName, phoneNumber) => {
	try {
		const userData = {email, firstName, lastName, phoneNumber};
		const validationError = await validateWithSchema(userValidationSchema, userData);

		if (validationError) {
			throw new Error(validationError);
		}

		const user = await User.create({
			email,
			firstName,
			lastName,
			phoneNumber
		});

		return {message: "User added successfully"};
	} catch (error) {
		console.error("Error adding users:", error);
		throw error;
	}
};

module.exports = {addUser};
