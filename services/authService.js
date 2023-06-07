const User = require("../models/userSchema");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

const createNewUser = async function (name, email, password, role, phoneNumber) {
  try {
    const newUser = new User({
      name,
      email,
      phoneNumber,
      role,
      password
    });
    const result = await newUser.save();
    const userId = result._id;
    return userId;
  } catch (error) {
    throw {
      message: error.message
    };
  }
};

const sendotp = async (email, otp) => {
  try {
    await User.updateOne({
      email
    }, {
      otp
    }, { upsert: true });
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      },
      debug: true
    });

    let mailOptions = {
      from: process.env.Email,
      to: email,
      subject: "User Verification ",
      text: `your otp to activate your account is ${otp}`
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

const userLogin = async (email, inputPassword) => {
  console.log("In Auth login  ");
  const user = await User.findOne({
    email,
    isActive: true
  });
  console.log("user:  ", user);
  if (!user) {
    throw new Error("User not found");
  }
  const isCorrect = await bcrypt.compare(inputPassword, user.password);
  if (!isCorrect) {
    throw new Error("Invalid credentials");
  }
  const token = jwt.sign({
    _id: user._id,
    isActive: true
  }, process.env.SECRETKEY, {
    expiresIn: "1d"
  }

  );
  console.log("token " + token);
  await User.findOneAndUpdate({ _id: user._id }, { token: token });
  return token;
};

const verifyToken = async (Token) => {
  console.log("In Auth service to verify token ");
  try {
    const token = await jwt.verify(Token, process.env.SECRETKEY);
    const user = await User.findOne({ _id: token._id, isActive: true });
    if (!user) {
      throw new Error("User does not exist or your account is not activated.");
    } else if (user.token !== Token) {

      throw new Error("Access Denied. Please login with credentials.");
    }
    return user;
  } catch (error) {

    console.error("Error in verifyToken:", error);
    throw error;
  }
};



const logout = async (token) => {
  console.log("logout service");
  const user = await User.findOne({ token: token });
  if (!user) {
    throw new Error("User not found , please login with credential for token");
  }
  const result = await User.findOneAndUpdate({
    _id: user._id
  }, {
    token: ""
  }, { new: true });

  return result;
};

module.exports = {

  createNewUser,
  verifyToken,
  userLogin,
  sendotp,
  logout
};

