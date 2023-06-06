const helperService = require("../services/helperService");
const cartService = require("../services/cart_service");

exports.verifyUserRole = async function (req, res, next) {
  try {
    const uid = req.params.userid;
    console.log("in controller");
    const user = await helperService.verifyUser(uid);

    if (!(user[0].role == "Consumer"))
      throw {
        message: error.message,
      };
    next();
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

exports.addToCart = async function (req, res) {
  try {
    const userId = req.params.userid;
    const { productId, quantity } = req.body;
    console.log(userId, productId, quantity);
    const cart = await cartService.addToCart(userId, productId, quantity);
    res.status(200).json({ message: "Product added to cart successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCart = async function (req, res) {
  try {
    const userid = req.params.userid;
    const result = await cartService.getCart(userid);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
