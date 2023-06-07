const ProductServcie = require("../services/PrdoctService");
const helperService = require("../services/helperService");
exports.createProduct = async (req, res) => {
  try {
    const { Title, Description, Price, Availability, Category } = req.body;
    const owner = req.params.userid;
    console.log(owner);
    console.log("in product controller");
    const result = await ProductServcie.createProduct(
      Title,
      Description,
      Price,
      Availability,
      Category,
      owner
    );

    res.send(201, result);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const result = await ProductServcie.getAllProducts();
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    throw { message: error.message };
  }
};

exports.UpdateProduct = async (req, res) => {
  try {
    const { Title, Description, Price, Availability, Category } = req.body;
    const userid = req.params.userid;
    const productid = req.params.pid;

    ///verify user
    // await helperService.verifyUser(userid);
    ///update product
    const result = await ProductServcie.updateProduct(
      productid,
      Title,
      Description,
      Price,
      Availability,
      Category,
      userid
    );
    res.status(202).send(result);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const userid = req.params.userid;
    const pid = req.params.pid;
    console.log("in controller");

    console.log(await helperService.ProductExists(pid));
    const result = await ProductServcie.deleteProduct(userid, pid);
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
