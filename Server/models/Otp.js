const mongoose=require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");
const otp=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
 otp:{
    type:Number,
    required:true
 },
 skipEmail: {
    type: Boolean,
    default: false,
  },
 createdAt:{
    type:Date,
    default:Date.now(),
    expires:5*60
 }
     
});
//function to send mail
async function sendVerificationEmail(email,otp)
{
   try{
   const mailResponse=await mailSender(email,"Verification Email from Edtech",emailTemplate(otp));

   console.log("email send successfully ",otp);
   }
   catch(error)
   {
      console.log("error in sending verifiction otp -> ",error);
   } 
}
// pre middleware for otp verification
// Only send email here when `skipEmail` is false. Controllers can set
// `skipEmail: true` to send and persist from the controller (so errors
// can be surfaced to the client) without double-sending.
otp.pre("save", function(next) {
   if (this.skipEmail) return next();
   // fire-and-forget so save isn't blocked
   sendVerificationEmail(this.email, this.otp).catch((error) => {
      console.log("error in sending verifiction otp -> ", error);
   });
   next();
})
module.exports = mongoose.model("Otp",otp);