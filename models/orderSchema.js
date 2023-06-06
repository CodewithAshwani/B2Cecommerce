const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  Address: {
    type: String,
    required: true,
    maxlength: 300,
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
    },
  ],
  status: {
    type: String,
    enum: ["pending", "Confirmed"],
    default: "pending",
  },
  totalAmount: {
    type: String,
    required: true,
  },
  orderCreatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
