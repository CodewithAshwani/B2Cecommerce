const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  UpdateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { verifyToken } = require("../controllers/authController")
///according to admin
router.route("/").post(verifyToken, createProduct);
router.route("/").get(verifyToken, getAllProducts);
router.route("/").patch(verifyToken, UpdateProduct);
router.route("/:pid/").delete(verifyToken, deleteProduct);

module.exports = router;
