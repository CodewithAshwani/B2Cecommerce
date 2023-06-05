const authService = require("../services/authService");

exports.createUser = async function (req, res) {
  try {
    console.log("In Auth controller");
    const { name, email, password, role, phoneNumber } = req.body;
    let id = await authService.createNewUser({
      name,
      email,
      password,
      role,
      phoneNumber,
    });
    res.status(201).send({
      message:
        "Please verify your email or phoneNumber to activate your Account ",
      id,
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
