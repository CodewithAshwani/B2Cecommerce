const express = require("express");
const router = express.Router();

const { verifyUserRole, addToCart } = require("../controllers/cartController");

router.route("/:userid/addTocart").post(verifyUserRole, addToCart);

module.exports = router;
