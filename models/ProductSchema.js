const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
    maxlength: 15,
  },
  Description: {
    type: String,
    required: true,
    maxlength: 500,
  },
  Price: {
    type: Number,
    required: true,
  },
  Availabilty: {
    type: Boolean,
    required: true,
  },
  Category: {
    type: String,
    enum: ["Personal care", "Electronics", "Baby care", "Dairy", "tea-coffee"],
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
