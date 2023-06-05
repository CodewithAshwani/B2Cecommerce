const express = require("express");

const router = express.Router();

const createUser = require("../controllers/authController");

router.route("/signUp").post(createUser);
router.route("/login").post(userLogin);

module.exports = router;
