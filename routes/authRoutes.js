const express = require("express");
const router = express.Router();

const {
  createUser,
  generateOTP,
  verifyOtpByMail,
  userLogin,
  UserloginViaToken,
} = require("../controllers/authController");

router.route("/signUp").post(createUser);
router.route("/generateOtp").post(generateOTP);
router.route("/verifyOtp").post(verifyOtpByMail);
router.route("/login").post(userLogin);
router.route("/login/token").post(UserloginViaToken);

module.exports = router;
