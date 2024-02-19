const {Sequelize, sequelize, yup} = require("../index");
const {v4: uuidv4} = require("uuid");
const bcrypt = require("bcrypt");

const User = sequelize.define("user", {
	userId: {
		field: "user_id",
		type: Sequelize.STRING,
		unique: true,
		primaryKey: true
	},
	email: {
		field: "email",
		type: Sequelize.STRING,
		unique: true,
		allowNull: false,
		validate: {
			isEmail: true,
			len: [5, 254]
		}
	},
	firstName: {
		field: "first_name",
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			len: [3, 50]
		}
	},
	lastName: {
		field: "last_name",
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			len: [3, 50]
		}
	},
	phoneNumber: {
		field: "phone_number",
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			len: [5, 20]
		}
	}
});

User.beforeCreate(async user => {
	try {
		const uuid = uuidv4();

		const hashedUuid = await bcrypt.hash(uuid, 10);

		const formattedHash = `0x${hashedUuid}`;

		user.userId = formattedHash;
	} catch (error) {
		console.error("Error generating userId:", error);
		throw error;
	}
});

const userValidationSchema = yup.object().shape({
	email: yup.string().email().required(),
	firstName: yup.string().required(),
	lastName: yup.string().required(),
	phoneNumber: yup.string().required()
});

module.exports = {User, userValidationSchema};
