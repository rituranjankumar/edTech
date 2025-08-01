const express=require("express");
const router=express.Router();
const {ContactUsController}=require("../controllers/ContactUs")
const { auth } = require("../middlewares/auth");

router.post("/reach/contact",auth,ContactUsController);

module.exports=router;