const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  UpdateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { verifyToken } = require("../controllers/authController");

///according to admin
router.route("/createproduct").post(verifyToken, createProduct);
router.route("/getAllProducts").get(verifyToken, getAllProducts);
router.route("/UpdateProduct").patch(verifyToken, UpdateProduct);
router.route("/:pid/deleteProduct").delete(verifyToken, deleteProduct);

module.exports = router;
