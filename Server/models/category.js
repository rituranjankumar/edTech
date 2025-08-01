const mongoose=require("mongoose");
const category=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description: {
        type:String,
        
    },
    //one category can be in mutiple courses
    course:[
        {
       type:mongoose.Schema.Types.ObjectId,
       ref:"Course"
    }
    ]
     
});
module.exports = mongoose.model("Category",category);