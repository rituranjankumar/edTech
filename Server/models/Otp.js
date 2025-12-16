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
// Fire-and-forget: send email asynchronously without blocking DB save
otp.pre("save", function(next) {
   sendVerificationEmail(this.email, this.otp).then(()=>
   {
      console.log("otp send successfull",this.otp)
   }).catch((error) => {
      console.log("error in sending verifiction otp -> ", error);
   });
   next();
})
module.exports = mongoose.model("Otp",otp);