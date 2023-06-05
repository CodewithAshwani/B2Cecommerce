const Product = require("../models/ProductSchema");

exports.createProduct = async (
  Title,
  Description,
  Price,
  Availabilty,
  Category,
  owner
) => {
  try {
    console.log("in service product");
    const NewProduct = new Product(
      Title,
      Description,
      Price,
      Availabilty,
      Category,
      owner
    );

    await NewProduct.save();
    console.log("newproduct is done here");
    return NewProduct;
  } catch (error) {
    // console.log(error);
    throw { message: error.message };
  }
};

exports.getAllProducts = async () => {
  try {
    const Products = await Product.find({});
    return Products;
  } catch (error) {
    throw { message: error.message };
  }
};

exports.updateProduct = async (
  pid,
  Title,
  Description,
  Price,
  Availability,
  Category
) => {
  try {
    const Product = await Product.findOneAndUpdate(
      { _id: pid },
      { Title, Description, Price, Availability, Category }
    );
    return Product;
  } catch (error) {
    throw { message: error.message };
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const Product = await Product.findOneAndDelete({ _id: req.params.id });
    return Product;
  } catch (error) {
    throw { message: error.message };
  }
};
