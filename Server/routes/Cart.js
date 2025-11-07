 

const express= require("express");
const {auth} =require("../middlewares/auth")
const {getCart,addCourseToCart,removeCourseFromCart,clearCart}=require("../controllers/Cart")


const router=express.Router();

router.get("/", auth, getCart);
router.post("/add", auth, addCourseToCart);
router.post("/remove", auth, removeCourseFromCart);
router.post("/clear", auth, clearCart);

module.exports =router