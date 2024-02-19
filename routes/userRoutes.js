const express = require("express");
const router = express.Router();
const {addUser} = require("../controllers/usersController");
require("dotenv").config();

router.post("/", addUser);

module.exports = router;
