const express = require("express");
const router = express.Router();

const {
  verifyUserRole,
  addProductToCart,
  getCart,
} = require("../controllers/cartController");
const { verifyToken } = require("../controllers/authController");

router.route("/addTocart").post(verifyToken, verifyUserRole, addProductToCart);
router.route("/showCart").get(verifyToken, verifyUserRole, getCart);



module.exports = router;
