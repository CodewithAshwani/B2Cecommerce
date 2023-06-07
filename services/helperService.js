const User = require("../models/userSchema");
const Product = require("../models/ProductSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const makeUserActive = async function (email) {
  console.log("In helper service");
  const user = await getUserfromEmail(email);
  let result = await User.findOneAndUpdate(
    { email: user.email },
    { isActive: true }
  );
  return result;
};

const getUserfromEmail = async function (email) {
  try {
    let result = await User.findOne({ email: email });
    if (!result) throw new Error("Invalid Email!!!!!!!");
    console.log("email is verified");
    return result;
  } catch (error) {
    throw error;
  }
};

const verifyOtp = async function (email, otp) {
  try {
    const user = await getUserfromEmail(email);
    console.log(user);
    if (!(user.otp == otp)) throw new Error("invalid otp");
    console.log("otp is verified");
    return user;
  } catch (err) {
    throw err;
  }
};

const generateToken = async function (email) {
  try {
    const secretkety = process.env.SECRETKEY;
    const token = await jwt.sign(email, secretkety);
    console.log(token);
    return token;
  } catch (err) {
    throw err;
  }
};

const updateToken = async function (email1, Token) {
  console.log("In auth service");
  let result = await User.findOneAndUpdate({ email: email1 }, { token: Token });

  return result;
};

const verifyPassword = async function (password, userPassword) {
  const checkPassword = await bcrypt.compare(password, userPassword);
  if (!checkPassword) throw new Error("Invalid credentials");
  return checkPassword;
};

const verifyUser = async function (id) {
  try {
    console.log("in service helper ");
    const user = await User.find({ _id: id });
    if (!user) throw { message: error.message };
    return user;
  } catch (error) {
    throw { message: error.message };
  }
};

const ProductExists = async function (id) {
  try {
    const product = await Product.find({ _id: id });
    console.log(product);
    if (typeof product == "null") return "Prdocut doesnot exists ";
    return "Product exists";
  } catch (error) {
    throw { message: error.message };
  }
};

module.exports = {
  updateToken,
  generateToken,
  verifyOtp,
  makeUserActive,
  getUserfromEmail,
  verifyPassword,
  verifyUser,
  ProductExists,
};
