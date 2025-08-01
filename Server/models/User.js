const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
       type:String,
        required:true,
        trim:true 
    },
    email:{
        type:String,
        required:true,
        trim:true  
    },
    password:{
        type:String,
        required:true,
    },
    accountType:{
        type:String,
        required:true,
          enum:["Admin","Student","Instructor"],
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile",
        required:true,
    },
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
    }],
    token:{
        type:String,
    },
    resetPasswordExpires:{
        type:Date,
    },
    image:{
        type:String,
         
    },
    imagePublicId:{
        type:String,
         
    },
    courseProgress:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"CourseProgress"
    }],

    //for deletion of the user after a specific time
    deletionDate:{
        type:Date
    },
    
		active: {
			type: Boolean,
			default: true,
		},

        // approval for the instructor verified by the admin
		approved: {
			type: Boolean,
			default: false,
		},
   

     
},
{ timestamps: true })
module.exports=mongoose.model("User",userSchema);