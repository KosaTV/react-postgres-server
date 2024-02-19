const validateWithSchema = async (schema, data) => {
	try {
		await schema.validate(data, {abortEarly: false});
		return null;
	} catch (error) {
		const errorMessage = error.errors.join(", ");
		return errorMessage;
	}
};

module.exports = validateWithSchema;
