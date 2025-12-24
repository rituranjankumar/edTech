
const User=require("../models/User");
const mailSender=require("../utils/mailSender");
const crypto=require("crypto");
const validator = require("validator");
const bcrypt=require("bcrypt")
//reset PasswordToken
exports.resetPasswordToken=async(req,res)=>
{
try{
    const {email}=req.body;
    //email validation and existing user
      if (!validator.isEmail(email)) {
               return res.status(400).json({
                   success: false,
                   message: "Invalid email format.",
               });
           }
           const user=await User.findOne({email:email});

           if(!user)
           {
            return res.status(400).json({
                success: false,
                message: "email not registered.",
            });
           }
    //generate token
    const token=crypto.randomUUID();

    //update user by adding token and expireation time
    const updatedDetails=await User.findOneAndUpdate({email:email},
        {
            token:token,
            resetPasswordExpires:Date.now()+5*60*1000
        },
        {new:true}
    )

    console.log("details for updating password ",updatedDetails)
    //create url
    const url=`http://localhost:3000/update-password/${token}`;

    //send mail containing the url
    await mailSender(email,"Password reset link",`password reset link ${url}`)
    
    //return response
    return res.status(200).json({
        success:true,
        message:"password reset generated and send to email",
        data:url,
    })
}
catch(error)
{
    return res.status(500).json({
        success:false,
        error:error.message,
        message:"something went wrong while generating reset password link"
    })
}

}

//reset Password
exports.resetPassword=async(req,res)=>
{
  try{
      //data fetch
    const {password,confirmPassword,token}=req.body;//token is inserted in body in front end

    //validation

    if(password!==confirmPassword)
    {
        return res.json({
            success:false,
            message:"Password is not matching"
        })
    }
    //use token to fetch user details form database
    const userDetails=await User.findOne({token});
    //if entry not found->invalid token 
    if(!userDetails)
    {
        return res.json({
            success:false,
            message:"token is invalid  "
        })
    }
    //  token time expired
    if(userDetails.resetPasswordExpires<Date.now())
    {
        return res.json({
            success:false,
            message:"token expired, please regenerate the token"
        })
    }
    //hash password
    const hashedPassword=await bcrypt.hash(password,10);
    //update password
   const newDetails= await User.findOneAndUpdate({token:token},
        {
            password:hashedPassword
        },
        {new:true}
    )

    console.log("pasword is updated -> ", newDetails);
    //return response
    return res.status(200).json({
        success:true,
        message:"Password reset successful",
        newDetails
    })
  }
  catch(error)
  {
    return res.json({
        success:false,
        message:" something went wrong while reseting password"
    })
  }
}