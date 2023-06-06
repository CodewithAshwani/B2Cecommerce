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
  Availability: {
    type: Boolean,
    required: true,
  },
  Category: {
    type: String,
    enum: {
      values: [
        "Personal care",
        "Electronics",
        "Baby care",
        "Dairy",
        "tea-coffee",
        "food",
        "fruits",
      ],
      message:
        'Invalid category. Valid categories are: "Personal care", "Electronics", "Baby care", "Dairy", "tea-coffee", "food".',
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
