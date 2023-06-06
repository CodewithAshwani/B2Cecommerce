const express = require("express");
const router = express.Router();
const { verifyUserRole } = require("../controllers/cartController");
const { placeOrder, getOrder } = require("../controllers/orderController");

router.route("/:userid/placeOrder").post(verifyUserRole, placeOrder);
router.route("/:userid/getOrder").get(getOrder);
module.exports = router;
