const mongoose=require("mongoose");
const subSection=new mongoose.Schema({
    title:{
        type:String,
        
    },
    timeDuration:{
         type:  Number,
         required:true,
         min:0,
        
    },
    description:{
        type:String,
    },
    videoUrl:{
        type:String
    },
     
});
module.exports = mongoose.model("SubSection",subSection);