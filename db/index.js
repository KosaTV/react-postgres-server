const Sequelize = require("sequelize");
const yup = require("yup");

const dbDetails = {
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	password: process.env.DB_USER_PASSWORD,
	port: process.env.DB_PORT
};

const sequelize = new Sequelize(dbDetails.database, dbDetails.user, dbDetails.password, {
	dialect: "postgres",
	omitNull: true
});

sequelize.sync();

module.exports = {Sequelize, sequelize, yup};
