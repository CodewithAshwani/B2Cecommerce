const Cart = require("../models/cartSchema");
const Product = require("../models/ProductSchema");

// exports.addToCart = async (userId, productId, quantity) => {
// try {
//     console.log("in service");
//     let subtotal,
//       totalAmount = 0;
//     const shippingcharges = 40;

//     const product = await Product.findById(productId);
//     const price = product.Price;

//     const cart = new Cart({
//       customer: userId,
//       items: [],
//       subtotal,
//       totalAmount,
//     });

//     cart.items.push({
//       product: productId,
//       quantity,
//       shippingcharges,
//       Price: price,
//     });

//     cart.subtotal = cart.items.reduce((subtotal, item) => {
//       return subtotal + item.quantity * item.Price;
//     }, 0);

//     cart.totalAmount = shippingcharges + cart.subtotal;
//     await cart.save();
//     return cart;
// } catch (error) {
//     console.log(error);
//     throw new Error("Failed to add product to cart");
// }
// };
exports.addToCart = async (customerId, items) => {
  console.log("in service ");
  const cart = await Cart.findOne({ customer: customerId });
  let subtotal = 0;

  if (cart) {
    console.log("cart exisits");
    for (const item of items) {
      const existingItemIndex = cart.items.findIndex(
        (cartItem) => cartItem.product.toString() === item.productId
      );
      console.log(existingItemIndex);
      if (existingItemIndex !== -1) {
        cart.items[existingItemIndex].quantity += item.quantity;
      } else {
        cart.items.push({
          product: item.productId,
          quantity: item.quantity,
          Price: item.price,
        });
      }
    }

    for (const item of cart.items) {
      const product = await Product.findById(item.product);
      subtotal += item.Price * item.quantity;
    }

    cart.subtotal = subtotal;
    cart.shippingcharges = 40;
    cart.totalAmount = subtotal + cart.shippingcharges;

    await cart.save();
  } else {
    console.log("entering else");
    const newCart = new Cart({
      customer: customerId,
      items: [],
      shippingcharges: 40,
    });

    for (const item of items) {
      const product = await Product.findById(item.productId);
      subtotal += product.Price * item.quantity;
      newCart.items.push({
        product: item.productId,
        quantity: item.quantity,
        Price: product.Price,
      });
    }

    newCart.subtotal = subtotal;
    newCart.totalAmount = newCart.shippingcharges;

    await newCart.save();
    console.log(newCart);
    return newCart;
  }

  return cart;
};

exports.getCart = async function (userid) {
  try {
    console.log("in service");
    const cart = await Cart.findOne({ customer: userid });
    console.log(cart);
    return cart;
  } catch (error) {
    throw {
      message: error.message,
    };
  }
};
