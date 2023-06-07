const authService = require("../services/authService");
const helperService = require("../services/helperService");

exports.createUser = async function (req, res) {
  try {
    console.log("in auth controller dee s");
    const {
      name,
      email,
      password,
      role,
      phoneNumber
    } = req.body;
    let userId = await authService.createNewUser(name, email, password, role, phoneNumber);
    console.log(userId);
    res.status(201).send({ message: "Please generate otp to verify your email to activate your Account ", userId });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

exports.generateOTP = async function (req, res) {
  try {
    let { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await authService.sendotp(email, otp);
    res.status(200).send(`otp sended successfully to ${email}`);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

exports.verifyOtpByMail = async function (req, res) {
  try {
    const { email, otp } = req.body;
    const user = await helperService.getUserfromEmail(email);
    console.log("user got ", user);
    if (user.isActive) {
      return res.status(200).send({ message: "your account is already active no need to verify!! Login via email and password" });
    }
    await helperService.verifyOtp(email, otp);
    await helperService.makeUserActive(email);
    res.status(200).send({ message: "your account has been Activated succesfully please login with your credentials to get your token" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};


exports.userLogin = async function (req, res) {
  try {
    const { email, password: inputPassword } = req.body;
    const token = await authService.userLogin(email, inputPassword);
    return res.status(200).send({ message: "User logged in successfully", token });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};


exports.verifyToken = async (req, res, next) => {
  try {
    const Token = req.headers.authorization.split(" ")[1];
    if (!Token)
      throw new Error({ message: "Access Denied , please login with credential to genrate token " });

    const user = await authService.verifyToken(Token);
    req.loggedInUser = user;
    next();
  } catch (error) {
    console.log("error in user post ", error);
    res.status(400).send({ message: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    await authService.logout(token);
    res.status(200).send({ message: "user Logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = req.loggedInUser;
    const result = await authService.changePassword(user, oldPassword, newPassword);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};
