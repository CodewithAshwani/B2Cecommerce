const helperService = require("../services/helperService");
const cartService = require("../services/cart_service");

exports.verifyUserRole = async function (req, res, next) {
  try {
    const uid = req.loggedInUser;
    console.log("in controller");
    const user = await helperService.verifyUser(uid._id);
    console.log(user.role)
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
  try {
    const userId = req.loggedInUser;
    const { productId, quantity } = req.body;
    console.log(userId, productId, quantity);
    const result = await cartService.addToCart(userId._id, productId, quantity);
    res
      .status(200)
      .send({ message: "Product added to cart successfully", result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCart = async function (req, res) {
  try {
    const userId = req.loggedInUser;
    console.log("in controller");
    const result = await cartService.getCart(userId._id);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    throw { message: error.message };
  }
};
