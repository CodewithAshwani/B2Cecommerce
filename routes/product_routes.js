const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  UpdateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.route("/createProduct").post(createProduct);
router.route("/getAllProduct").get(getAllProducts);
router.route("/UpdateProduct/:id").patch(UpdateProduct);
router.route("/deleteProduct/:id").delete(deleteProduct);

module.exports = router;
