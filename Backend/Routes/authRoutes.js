const express = require("express");
const { registerStudent } = require("../Routes/registerRoute");
const { loginStudent } = require("../Routes/loginRoute");

const router = express.Router();

// router.post("/register", registerStudent);
router.post("/login", loginStudent);

module.exports = router;
