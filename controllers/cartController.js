const helperService = require("../services/helperService");
const cartService = require("../services/cart_service");

exports.verifyUserRole = async function (req, res, next) {
  try {
    const uid = req.loggedInUser;
    console.log("in controller");
    const user = await helperService.verifyUser(uid._id);
    console.log(user.role);
    if (!(user.role == "Consumer"))
      throw {
        message: error.message,
      };
    next();
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

exports.addProductToCart = async function (req, res) {
  console.log("in controller Product");
  const { products } = req.body;
  const customerId = req.loggedInUser;
  try {
    const cart = await cartService.addToCart(customerId, products);
    res.status(200).send(cart);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Failed to add the products to the cart." });
  }
};

exports.getCart = async function (req, res) {
  try {
    const userId = req.loggedInUser;
    console.log("in controller");
    const result = await cartService.getCart(userId._id);
    res
      .status(200)
      .send(
        `SubTotal = ${result.subtotal} ShippingCharges = ${result.shippingcharges}TotalPayableAmount = ${result.totalAmount}`
      );
  } catch (error) {
    console.log(error);
    throw { message: error.message };
  }
};
