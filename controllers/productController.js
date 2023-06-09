const ProductServcie = require("../services/PrdoctService");
const helperService = require("../services/helperService");
exports.createProduct = async (req, res) => {
  try {
    const { Title, Description, Price, Availability, Category } = req.body;
    const owner = req.loggedInUser;
    console.log(owner);
    console.log("in product controller");
    const result = await ProductServcie.createProduct(
      Title,
      Description,
      Price,
      Availability,
      Category,
      owner._id
    );

    res.send(201, result);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    if (req.loggedInUser) {
      const result = await ProductServcie.getAllProducts();
      res.status(200).send(result);
    } else {
      res.status(400).send("user is not logged In ");
    }
  } catch (error) {
    console.log(error);
    throw { message: error.message };
  }
};

exports.UpdateProduct = async (req, res) => {
  try {
    const { productid, Title, Description, Price, Availability, Category } =
      req.body;
    const userid = req.loggedInUser;

    const result = await ProductServcie.updateProduct(
      productid,
      Title,
      Description,
      Price,
      Availability,
      Category,
      userid._id
    );
    res.status(202).send(result);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    console.log("in product controller");
    const pid = req.params.pid;
    const userid = req.loggedInUser;

    await helperService.ProductExists(pid);
    const result = await ProductServcie.deleteProduct(userid._id, pid);
    res.status(201).send(result);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};
