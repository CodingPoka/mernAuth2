

const express=require("express");
const { register, login, logout, verifyEmail, sendVerifyOtp, sendResetOtp, resetPassword, getProfile } = require("../controller/authController");
const { registerValidation, loginValidation } = require("../validation/authValidation");
const { checkValidation } = require("../validation/runValidation");
const { userAuth } = require("../validation/tokenValidation");


const authRouter=express.Router();


//register route
authRouter.post("/register", registerValidation, checkValidation, register);


//login route

authRouter.post("/login",  login);

//logout route

authRouter.post("/logout", userAuth, logout);

//send verificatin otp

authRouter.post("/sendVerificationOtp", userAuth,sendVerifyOtp);

//verifyEmail Controller

authRouter.post("/verifyEmail", userAuth, verifyEmail);

//profile

authRouter.get("/profile", userAuth, getProfile);

//send-reset-otp

authRouter.post("/sendResetOtp", sendResetOtp);

//reset-password

authRouter.post("/resetPassword", resetPassword);

module.exports=authRouter;


