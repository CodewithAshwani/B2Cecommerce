const express = require("express");
const router = express.Router();

const {
  verifyUserRole,
  addProductToCart,
  getCart,
} = require("../controllers/cartController");

router.route("/:userid/addTocart").post(verifyUserRole, addProductToCart);
router.route("/:userid/getCart").post(verifyUserRole, getCart);

// router.route("/:userid/");

module.exports = router;
