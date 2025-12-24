// Import the required modules
const express = require("express")
const router = express.Router()

// Import the required controllers and middleware functions
const {
  login,
  signUp,
  sendOtp,
  PasswordChange,
  createAdmin,
} = require("../controllers/Auth");
const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/ResetPassword")

//console.log({ login, signUp, sendOtp, PasswordChange, resetPasswordToken, resetPassword });

const { auth, isAdmin } = require("../middlewares/auth")

// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Route for user login
router.post("/login", login)

// Route for user signup
router.post("/signup",signUp)

// Route for sending OTP to the user's email
router.post("/sendotp", sendOtp)

// Route for Changing the password
router.post("/changepassword", auth, PasswordChange)

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)

// create admini
router.post("/create-admin",auth,isAdmin,createAdmin);
// Export the router for use in the main application
module.exports = router