const { error } = require("console");
const User = require("../models/userSchema");

exports.createNewUser = async function (
  name,
  email,
  password,
  phoneNumber,
  role
) {
  try {
    const newUser = new User(name, email, phoneNumber, role, password);
    const result = await newUser.save();
    const userId = result._id;
    return userId;
  } catch (error) {
    throw { message: error.message };
  }
};
