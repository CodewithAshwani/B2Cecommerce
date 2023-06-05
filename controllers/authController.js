const authService = require("../services/authService");
const helperService = require("../services/helperService");
exports.createUser = async function (req, res) {
  try {
    console.log("in auth controller");
    const { name, email, password, role, phoneNumber } = req.body;
    let userId = await authService.createNewUser({
      name,
      email,
      password,
      role,
      phoneNumber,
    });
    res.status(201).send({
      message:
        "Please verify your email or phoneNumber to activate your Account ",
      userId,
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

exports.generateOTP = async function (req, res) {
  try {
    let { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    email = "vaibhavtezan@gmail.com";
    await authService.sendotp({ email, otp });
    res.status(200).send({ message: error.message });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

exports.verifyOtpByMail = async function (req, res) {
  try {
    const { email, otp } = req.body;
    const user = await helperService.getUserByEmail(email);
    console.log("user got ", user);
    if (user.isActive) {
      return res.status(200).send({
        message:
          "already active no need to verify!! Login via email and password",
      });
    }
    await helperService.verifyOtp(email, otp);
    await helperService.makeUserActive(email);
    return res.status(200).send({
      message:
        "your account has been Activated succesfully please login with your credentials to get your token",
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

exports.userLogin = async function (req, res) {
  try {
    const { email, password } = req.body;
    const user = await helpers.getUserByEmail(email);
    if (!user) throw new Error("User does not exist");
    await helperService.verifyPassword(`${password}`, user.password);
    const Token = await helperService.generateToken(email);
    await helperService.updateToken(user.email, Token);
    if (!user.isActive) {
      return res.status(200).send({
        msg: "You are Inactive !!! please Verify your Account using email or phone through otp",
      });
    }
    return res
      .status(200)
      .send({ message: "User logged in successfully", Token });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

exports.UserloginViaToken = async function (req, res) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    await helperService.verifyToken(token);
    return res.status(200).send({ message: "User Logged in Successfully" });
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};
