const express = require("express");
const router = express.Router();
// const } = require("../controllers/");
const { verifyUserRole } = require("../controllers/cartController");

router.route("/:userid/placeOrder").post(verifyUserRole);

module.exports = router;
