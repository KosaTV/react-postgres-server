const express = require("express");
const router = express.Router();
const {addUsers, getUsers} = require("../controllers/enterprisesController");
require("dotenv").config();

router.get("/users", getUsers);
router.post("/users/add", addUsers);

module.exports = router;
