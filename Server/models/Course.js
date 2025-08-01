const mongoose=require("mongoose");
const courseSchema=new mongoose.Schema({
    Name:{
        type:String,
        required:true,
        trim:true
    },
    courseDescription:{
       type:String, 
        trim:true 
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"  
    },
    whatYouWillLearn:{
        type:String,
 
    },
    courseContent:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Section",
        required:true,
    }],
    ratingAndReviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"RatingAndReview",
        
    }],
    price: {
        type:Number,
    },
    thumbnail:{
        type:String,
       // required:true,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    studentsEnrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        //required:true
    }],
    tag:{
        type:[String]
    },
    status:{
        type:String,
        enum:["Draft","Published"],
         default: "Draft"
    },
    instructions:{
        type:[String],
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model("Course",courseSchema);