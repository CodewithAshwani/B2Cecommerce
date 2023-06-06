const Cart = require("../models/cartSchema");
const Order = require("../models/orderSchema");

const createOrder = async function (userId, Address) {
  try {
    const status = "pending";
    console.log("ins service");
    const cart = await Cart.findOne({ customer: userId });
    console.log(cart);
    const createOrder = new Order({
      customer: userId,
      Address,
      items: cart.items,
      status,
      totalAmount: cart.totalAmount,
    });
    await createOrder.save();
    return createOrder;
  } catch (error) {
    console.log(error);
    throw { message: error.message };
  }
};

const getOrder = async function (userId) {
  try {
    console.log("in service");
    const order = await Order.findOne({ customer: userId });
    return order;
  } catch (error) {
    console.log(error);
    throw { message: error.message };
  }
};

module.exports = { createOrder, getOrder };
