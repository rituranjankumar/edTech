const express = require('express');
const app = express();
 
 
const cors = require("cors");



// Load environment variables


require("dotenv").config();

//cookie parser for parse the data form cookie
const cookieParser=require("cookie-parser");

// Middleware and routes setup
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 4000;
 app.use(cors({
    origin: "http://localhost:3000",      // Allow all origins; consider restricting this for production.
    credentials: true  
}));

//middleware for cloudinary
const fileUpload=require("express-fileupload");
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/",
}))
//cloudinary connect
const {cloudinaryConnect } = require("./config/cloudinary");
cloudinaryConnect();



// this code helps to drop the old index for courseprogress 

// const CourseProgress = require("./models/CourseProgress"); // adjust path if needed

// async function dropOldCourseProgressIndex() {
//   try {
//     const indexes = await CourseProgress.collection.indexes();
//     const oldIndex = indexes.find(index => index.name === "userId_1_courseID_1");

//     if (oldIndex) {
//       await CourseProgress.collection.dropIndex("userId_1_courseID_1");
//       console.log(" Dropped old index: userId_1_courseID_1");
//     } else {
//       console.log(" Old index not found. No need to drop.");
//     }
//   } catch (err) {
//     console.error(" Failed to drop old index:", err.message);
//   }
// }
// dropOldCourseProgressIndex();

//import user routes
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const ContactUsRoute=require("./routes/ContactUsRoute");
//mount routes
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1",ContactUsRoute);
//db connect
const  {dbConnect} = require("./config/database");
dbConnect();









// Import the cron job
//Cron job runs daily at midnight: Checks for users with passed deletion dates.
const deleteExpiredAccount=require("./utils/deleteExpiredAccounts");
//console.log(deleteExpiredAccount);
try {
	deleteExpiredAccount();
  } catch (error) {
	console.error("Cron job failed to start:", error);
  }
  


//def route

app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

// Start server
app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})

 




