const helperService = require("../services/helperService");
const cartService = require("../services/cart_service");

exports.verifyUserRole = async function (req, res) {
  try {
    const uid = req.params.userid;
    console.log("in controller");
    const user = await helperService.verifyUser(uid);
    if (!(user.role == "Consumer"))
      throw {
        message: error.message,
      };
    res.status(200).send("user found successfully");
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
