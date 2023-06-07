const express = require("express");
const router = express.Router();

const {
  createUser,
  generateOTP,
  verifyOtpByMail,
  userLogin,
  changePassword,
  logout,
  verifyToken,
} = require("../controllers/authController");

router.route("/signUp").post(createUser);
router.route("/generateOtp").post(generateOTP);
router.route("/verifyOtp").post(verifyOtpByMail);
router.route("/login").post(userLogin);
router.route("/changePassword").post(verifyToken, changePassword);
router.route("/logout").post(logout);
module.exports = router;
