const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  UpdateProduct,
  deleteProduct,
} = require("../controllers/productController");
///according to admin
router.route("/:userid/createProduct").post(createProduct);
router.route("/getAllProducts").get(getAllProducts);
router.route("/:userid/UpdateProduct/:pid").put(UpdateProduct);
router.route("/:userid/deleteProduct/:pid").delete(deleteProduct);

module.exports = router;
