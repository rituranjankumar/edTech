const express = require("express")
const router = express.Router()
const { auth, isInstructor, isAdmin } = require("../middlewares/auth")
const {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
  getEnrolledCourses,
  removeDisplayPicture,
   
  instructorDashboard,
  AdminDashboard
} = require("../controllers/Profile")
const { getPendingAccount, verifyInstructor } = require("../controllers/InstructorVerification")

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delete User Account
router.delete("/deleteProfile", auth, deleteAccount)


router.put("/updateProfile", auth, updateProfile)
router.get("/getUserDetails", auth, getAllUserDetails)
// Get Enrolled Courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)
router.put('/remove-display-picture', auth, removeDisplayPicture); 

router.get("/instructorDashboard",auth,isInstructor,instructorDashboard)
router.get("/adminDashboard",auth,isAdmin,AdminDashboard)


router.get("/pending-instructors",auth,isAdmin,getPendingAccount)
router.post("/verify-instructors",auth,isAdmin,verifyInstructor)
module.exports = router