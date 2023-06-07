const express = require("express");
const router = express.Router();
const { verifyUserRole } = require("../controllers/cartController");
const { placeOrder, getOrder } = require("../controllers/orderController");
const { verifyToken } = require("../controllers/authController");

router.route("/placeOrder").post(verifyToken, verifyUserRole, placeOrder);
router.route("/showOrder").get(verifyToken, verifyUserRole, getOrder);
module.exports = router;
