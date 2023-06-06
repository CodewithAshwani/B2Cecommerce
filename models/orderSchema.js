const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  Address:{
    type:String,
    required:true,
  },
  items:{
    type:mongoose.Schema.Types.ObjectId;
    ref:"Cart",
    required:true,
  },
  orderCreated:{
    type:Date,
    default:Date.now,
  }
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
