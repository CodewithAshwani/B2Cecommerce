const Cart = require("../models/cartSchema");

exports.addToCart = async (userId, productId, quantity) => {
  try {
    console.log("in service");
    let cart = await Cart.findOne({ customer: userId });

    if (!cart) {
      cart = new Cart({ customer: userId, items: [] });
    }
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    // Save the updated cart
    await cart.save();

    return cart;
  } catch (error) {
    throw new Error("Failed to add product to cart");
  }
};
