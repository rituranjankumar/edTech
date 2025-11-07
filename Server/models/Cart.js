const mongoose=require("mongoose")

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true //  one cart per user
  },

  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course"
    }
  ],

  totalItems: {
    type: Number,
    default: 0
  },

  totalPrice: {
    type: Number,
    default: 0
  }
},{timestamps:true});

module.exports =mongoose.model("Cart", cartSchema);
