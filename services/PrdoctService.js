const Product = require("../models/ProductSchema");

exports.createProduct = async (
  Title,
  Description,
  Price,
  Availability,
  Category,
  owner
) => {
  try {
    console.log("in service product");
    const NewProduct = new Product(
      Title,
      Description,
      Price,
      Availability,
      Category,
      owner
    );
    await NewProduct.save();
    return NewProduct;
  } catch (error) {
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
    console.log("in service");
    const product = await Product.findOneAndUpdate(
      { _id: pid },
      { Title, Description, Price, Availability, Category },
      { new: true, runValidators: true }
    );
    return product;
  } catch (error) {
    throw { message: error.message };
  }
};

exports.deleteProduct = async (id) => {
  try {
    console.log("in service");
    const product = await Product.findOneAndDelete({ _id: id });
    return product;
  } catch (error) {
    throw { message: error.message };
  }
};
