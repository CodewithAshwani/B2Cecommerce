const orderservice = require("../services/orderService");

const placeOrder = async function (req, res) {
  try {
    console.log("in controller");
    const userId = req.params.userid;
    const { Address } = req.body;
    console.log(userId, Address);
    const result = await orderservice.createOrder(userId, Address);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};

const getOrder = async function (req, res) {
  try {
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};
module.exports = { placeOrder, getOrder };
