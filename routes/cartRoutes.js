const express = require("express");
const router = express.Router();

const {
  verifyUserRole,
  addToCart,
  getCart,
} = require("../controllers/cartController");

router.route("/:userid/addTocart").post(verifyUserRole, addToCart);
router.route("/:userid/getCart").post(verifyUserRole, getCart);

module.exports = router;
