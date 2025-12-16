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
// Index to speed up lookups/aggregations by course
ratingAndReview.index({ course: 1 });
module.exports = mongoose.model("RatingAndReview",ratingAndReview);