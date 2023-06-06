const Cart = require("../models/cartSchema");
const Product = require("../models/ProductSchema");

exports.addToCart = async (userId, productId, quantity) => {
  try {
    console.log("in service");
    let subtotal,
      totalAmount = 0;
    const shippingcharges = 40;

    const product = await Product.findById(productId);
    const price = product.Price;

    const cart = new Cart({
      customer: userId,
      items: [],
      subtotal,
      totalAmount,
    });

    cart.items.push({
      product: productId,
      quantity,
      shippingcharges,
      Price: price,
    });

    cart.subtotal = cart.items.reduce((subtotal, item) => {
      return subtotal + item.quantity * item.Price;
    }, 0);

    cart.totalAmount = shippingcharges + cart.subtotal;
    await cart.save();
    return cart;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to add product to cart");
  }
};

exports.getCart = async function (userid) {
  try {
    console.log("in service");
    const cart = await Cart.findOne({ customer: userid });
    console.log(cart);
    return cart;
  } catch (error) {
    throw { message: error.message };
  }
};
