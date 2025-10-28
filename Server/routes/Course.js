const express=require("express");
const router=express.Router();


// Import the Controllers

// Course Controllers Import
const {
    createCourse,
    getAllCourses,
    getCourseDetails,
    getInstructorCourses,
    editCourse,
    deleteCourse,
    getFullCourseDetails,
    getAdminCourses
  } = require("../controllers/Course")
  
  
  // Categories Controllers Import
  const {
    showAllCategories,
    createCategory,
    categoryPageDetails,
  } = require("../controllers/Category")
  
  // Sections Controllers Import
  const {
    createSection,
    updateSection,
    deleteSection,
  } = require("../controllers/Section")
  
  // Sub-Sections Controllers Import
  const {
    createSubSection,
    updateSubSection,
    deleteSubSection,
  } = require("../controllers/SubSection")
  
  // Rating Controllers Import
  const {
    createRating,
    getAverageRating,
    getAllRating,
  } = require("../controllers/RatingAndReview")
  
  // Importing Middlewares
  const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")
  
  const {updateCourseProgress}=require("../controllers/CourseProgress")

  //routes

  // Courses can Only be Created by Instructors
  router.post("/createCourse",auth,isInstructor,createCourse);
router.post("/editCourse",auth,isInstructor,editCourse);
  ////Add a Section to a Course
router.post("/addSection", auth, isInstructor, createSection)

// Update a Section
router.post("/updateSection", auth, isInstructor, updateSection)

// Delete a Section
router.post("/deleteSection", auth, isInstructor, deleteSection)

// Edit Sub Section
router.post("/updateSubSection", auth, isInstructor, updateSubSection)

// Delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection)

// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubSection)

// Get all Registered Courses
router.get("/getAllCourses", getAllCourses)

// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails)
router.post("/getFullCourseDetails",auth,isStudent,getFullCourseDetails)
// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here
router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/showAllCategories", showAllCategories)
router.post("/getCategoryPageDetails", categoryPageDetails)

 //rating and reviews
router.post("/createRating", auth, isStudent, createRating)
router.post("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRating)


//instructor course
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)
router.get("/getAdminCourses",auth,isAdmin,getAdminCourses);
router.delete("/deleteCourse",auth,isInstructor,deleteCourse);


//courseprogress
router.post("/updateCourseProgress",auth,isStudent,updateCourseProgress);
module.exports = router