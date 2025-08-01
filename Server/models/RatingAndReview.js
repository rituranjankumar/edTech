const mongoose=require("mongoose");
const ratingAndReview=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
       // required:true,
        ref:"User",
        req:true
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        req:true
    },
    rating: {
        type:Number,
        required:true
    },
    review:{
       type:String,
       trim:true 
    }
     
});
module.exports = mongoose.model("RatingAndReview",ratingAndReview);