


//require bcrypt
const bcrypt=require("bcrypt");
//require jwt
const jwt=require("jsonwebtoken");
const userModel = require("../models/userModel");
const transporter = require("../config/nodeMailer");
const saltRounds=10;
require("dotenv").config();




//register controller
exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists with this email!"
            });
        }
  
         /*
          // Sending welcome mail first
        const mailOption = {
            from: process.env.SENDER_EMAIL, // The sender email
            to: email, // The user's email
            subject: "Welcome To Algorith Avengers", // Subject of the email
            text: `Welcome to Algorith Avengers ${name}. <br/> Your account has been created with email ID : ${email}` // Email body
        };

        // Send email using transporter
        await transporter.sendMail(mailOption);

        


         */

        // Now proceed to save the user
        const hashPassword = await bcrypt.hash(password, saltRounds); // Hash the password
       

        // Create user object
        const user = new userModel({
            name,
            email,
            password : hashPassword
        });

        // Save the user in the database
        await user.save();

        /*
          // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        // Set the token in a cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        */

        

        // Send successful response
        return res.status(200).json({
            success: true,
            message: "User Registered Successfully!"
        });

    } catch (error) {
        // Send error response if something goes wrong
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


//login controller

exports.login= async(req,res)=>{
    try{
        const {email,password}=req.body;
       
        //email exist or not
        const user= await userModel.findOne({email});
     
        if(!user){
            return res.status(400).json({
                message:false,
                message:"Incorrect Email Address"
            })
        };

        //password correct or not

        const isMatch= await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"Wrong Password"
            })
        }

        //if all correct then generate jwt token

        const token=jwt.sign({id:user._id}, process.env.JWT_SECRET, {
            expiresIn:"7d"
        })

        res.cookie("token",token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        })

        //return response that login successfull

        return res.status(200).json({
            success:true,
            message:"Login Successfull"
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//logout controller

exports.logout= async(req,res)=>{
   try{

    res.clearCookie("token",{
        httpOnly:true,
        secure: process.env.NODE_ENV ==="production",
        sameSite: process.env.NODE_ENV === "production"? "none":"strict"
    });

    //return logout response
    return res.status(200).json({
        success:true,
        message:"Logout Successfull"
    });

   }catch(error){
    return res.status(500).json({
        success:false,
        message:error.message
    })
   }

}


//send verification otp to email controller

exports.sendVerifyOtp= async(req,res,next)=>{
    try{

        const {userid}=req.body;
        const user= await userModel.findById(userid);

        //checking accoutn is verified or not

        if(user.isAccountVerified){
           return res.status(400).json({
            success:false,
            message:"Account already verified"
           })
        }

        //create random otp

        const otp=String(Math.floor(Math.random()*900000)+10000);

        //send otp vai email
        const mailOption={
            from: process.env.SENDER_EMAIL,
            to:user.email,
            subject:"Account Verification OTP",
            text:`Your otp is ${otp} <br>. Verify your account using this OTP,`
           }
          
           await transporter.sendMail(mailOption);

           //save otp in database
           user.verifyOtp=otp;
           user.verifyOtpExpireAt=Date.now()+7*60*60*1000;

           await user.save();

           //return  otp is successfully send to email

           return res.status(200).json({
            success:true,
            message:"Verification OTP Sent on Email"
           })

        
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//verify account using otp contrller

exports.verifyEmail= async(req,res)=>{
    try{
        const {userid,otp}=req.body;
        
        //if user id not found
        if(!userid){
            return res.status(404).json({
                success:false,
                message:"User id not found"
            })
          
        }

        //if otp not found

        if(!otp){
            return res.status(404).json({
                success:false,
                message:"Otp Required"
            })
          
        }

        const user= await userModel.findById(userid);
        
        if(!user){
            return res.json({
                success:false,
                message:"User not found"
            })
        }

        //chekc otp
        if(user.verifyOtp === "" || user.verifyOtp !==otp){
            return res.json({
                success:false,
                message:"Invalid OTP"
            })
        }

        //otp expired 

        if(user.verifyOtpExpireAt < Date.now()){
            return res.json({
                success:false,
                message:"OTP Expired"
            })
        }

        //account is verified and we have to reset verifyotp expiredate

        user.isAccountVerified=true;
        user.verifyOtp="";
        user.verifyOtpExpireAt=0;

        await user.save();

    //return response eamil is verified successfully

    return res.status(200).json({
        success:true,
        message:"Email Verified Successfully"
    })

    }catch(error){

        return res.status(500).json({
            success:false,
            message:error.message
        })

    }
}


//send  reset otp to email

exports.sendResetOtp= async(req,res)=>{
    

    try{

        const {email}=req.body;

        if(!email){
        return res.json({
            success:false,
            message:"Email is required"
        })
    }

        const user=await userModel.findOne({email});

        if(!user){
            return res.json({
                success:false,
                message:"Wrong Eamil"
            })
        }

        //create random otp

        const otp=String(Math.floor(Math.random()*900000)+100000);

        user.resetOtp=otp;
        user.resetOtpExpireAt=Date.now()+24*60*60*1000;
        

        const mailOption={
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject:"Password Reset Otp",
            text:`Your otp for reseting your password is ${otp} <br>. Use this otp to proceed with reseting your password,`
        }

      await transporter.sendMail(mailOption);
        
      await user.save();

      return res.status(200).json({
        success:true,
        message:"OTP sent to your email"
      })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

// Reset user password and verify otp


exports.resetPassword= async(req,res)=>{
  
    try{
        const {email,otp,newPassword}=req.body;

        if(!email || !otp || !newPassword){
            return res.json({
                success:false,
                message:"Email otp and new password required"
            })
        }

        const user=await userModel.findOne({email});

        if(!user){
            return res.json({
                success:false,
                message:"Wrong Email"
            })
        }

        if(user.resetOtp === "" || user.resetOtp !== otp){
            return res.json({
                success:false,
                message:"Invalid Otp"
            })
        }

        if(user.resetOtpExpireAt < Date.now()){
            return res.json({
                success:false,
                message:"OTP Expired"
            })
        }

        const hashedPassword= await bcrypt.hash(newPassword,10);

        user.password=hashedPassword;
        user.resetOtp="",
        user.resetOtpExpireAt=0;
       
        await user.save();

        return res.status(200).json({
            success:true,
            message:"Password has been reset successfully"
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//profile controller

exports.getProfile= async(req,res)=>{

    try{
        const {userid}=req.body;

        const user= await userModel.findById(userid);

        if(!user){
            return res.json({
                success:false,
                message:"User not found"
            })
        }

        return res.status(200).json({
            success:true,
            name:user.name,
            email:user.email
        })


    }catch(error){

        return res.status(500).json({
            success:false,
            message:error.message
        })

    }
}