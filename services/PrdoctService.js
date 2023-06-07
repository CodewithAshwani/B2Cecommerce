const Product = require("../models/ProductSchema");
const User = require("../models/userSchema");
exports.createProduct = async (
  Title,
  Description,
  Price,
  Availability,
  Category,
  owner
) => {
  try {
    console.log("in service product", owner);
    const userRole = await User.findOne({ _id: owner });
    console.log(userRole.role);
    if (userRole.role == "Consumer")
      return { message: "user with consumer role cannot create product" };
    const NewProduct = new Product({
      Title,
      Description,
      Price,
      Availability,
      Category,
      owner,
    });
    await NewProduct.save();
    return NewProduct;
  } catch (error) {
    console.log(error);
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
  Category,
  userId
) => {
  try {
    console.log("in service");
    const user = await User.findOne({ _id: userId });
    console.log(user.role);
    if (user.role == "Consumer")
      return {
        message:
          "user exists , but Consumer is not authorized to do this action",
      };
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

exports.deleteProduct = async (userid, id) => {
  try {
    console.log("in service");
    const user = await User.findOne({ _id: userid });
    console.log(user.role);
    if (user.role == "Consumer")
      return {
        message:
          "user exists , but Consumer is not authorized to do this action",
      };
    const product = await Product.findOneAndDelete({ _id: id });
    return product;
  } catch (error) {
    throw { message: error.message };
  }
};
