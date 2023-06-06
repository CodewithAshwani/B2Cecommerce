const User = require("../models/userSchema");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const createNewUser = async function (
  name,
  email,
  password,
  role,
  phoneNumber
) {
  try {
    const newUser = new User({ name, email, phoneNumber, role, password });
    const result = await newUser.save();
    const userId = result._id;
    return userId;
  } catch (error) {
    throw { message: error.message };
  }
};

const sendotp = async (email, otp) => {
  try {
    await User.updateOne({ email }, { otp }, { upsert: true });
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
      debug: true,
    });

    let mailOptions = {
      from: process.env.Email,
      to: email,
      subject: "User Verification ",
      text: `your otp to activate your account is ${otp}`,
    };

    return transporter.sendMail(mailOptions, function (error) {
      if (error) {
        console.log(error);
      } else {
        console.log(`otp has been succesfully sended to ${email}`);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const verifyToken = async function (token) {
  console.log("In auth service");
  const getEmailByToken = await User.findOne({ token });
  if (!getEmailByToken) throw new Error("access denied !! Invalid Token");
  const result = await jwt.verify(token, process.env.SECRETKEY);
  if (result !== getEmailByToken.email) throw new Error("Invalid token");
  return result;
};

const updateToken = async function (email, Token) {
  console.log("In auth service");
  let result = await User.findOneAndUpdate({ email: email }, { token: Token });
  // console.log(result);
  return result;
};

const generateToken = async function (email) {
  try {
    const secretkety = process.env.SECRETKEY;
    const token = await jwt.sign(email, secretkety);
    return token;
  } catch (err) {
    throw err;
  }
};

const logout = async (token) => {
  console.log("logout service");
  const user = await User.findOne({ token: token });
  if (!user) {
    throw new Error("User not found , please login with credential for token");
  }
  const result = await User.findOneAndUpdate(
    { _id: user._id },
    { token: "" },
    { new: true }
  );

  return result;
};

module.exports = {
  updateToken,
  generateToken,
  verifyToken,
  createNewUser,
  sendotp,
  logout,
};
