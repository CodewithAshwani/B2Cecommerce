const ProductServcie = require("../services/PrdoctService");

exports.createProduct = async (req, res) => {
  try {
    const { Title, Description, Price, Availabilty, Category } = req.body;
    const owner = req.params.id;
    console.log("in product controller");
    const result = await ProductServcie.createProduct({
      Title,
      Description,
      Price,
      Availabilty,
      Category,
      owner,
    });

    res.send(201, result);
  } catch (error) {
    throw { message: error.message };
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const result = await ProductServcie.getAllProducts();
    return result;
  } catch (error) {
    throw { message: error.message };
  }
};

exports.UpdateProduct = async (req, res) => {
  try {
    const { Title, Description, Price, Availability, Category } = req.body;
    const pid = req.params.id;

    await ProductServcie.updateProduct(
      pid,
      Title,
      Description,
      Price,
      Availability,
      Category
    );
    res.status(200).send("Product Update successfully");
  } catch (error) {
    throw { message: error.message };
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const pid = req.params.id;
    const result = await ProductServcie.deleteProduct(pid);
    res.status(201).send("Product delketed succesfully");
  } catch (error) {
    throw { message: error.message };
  }
};
