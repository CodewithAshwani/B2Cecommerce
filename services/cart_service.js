const Cart = require("../models/cartSchema");
const helperService = require("../services/helperService");

exports.addToCart = async (userId, productId, quantity) => {
  try {
    console.log("in service");
    ////find cart if cart is there
    let cart = await Cart.findOne({ customer: userId });
    console.log(cart);
    if (!cart) {
      cart = new Cart({ customer: userId, items: [] });
    }
    const cartid = cart._id;
    console.log(cartid);
    await helperService.ProductexistInCart(cartid, productId, quantity);

    cart.items.push({ product: productId, quantity });
    console.log("item is pushed");
    await cart.save();
    return cart;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to add product to cart");
  }
};

exports.getCart = async function (userid) {
  try {
    const cart = await Cart.find({ customer: userid });
    console.log(cart);
    return cart;
  } catch (error) {
    throw { message: error.message };
  }
};
