const CourseProgress = require("../models/CourseProgress");
const User = require("../models/User");

exports.updateCourseProgress = async (req, res) => {
  try {
    const { courseId, sectionId, subSectionId } = req.body;
    const userId = req.user.id;

    // 1. Check if the user is enrolled in the course
    const userEnrolled = await User.findOne({
      _id: userId,
      courses: { $in: [courseId] }
    });

    if (!userEnrolled) {
      return res.status(403).json({
        success: false,
        message: "User is not enrolled in this course",
      });
    }

    // 2. Check if CourseProgress document exists
    let courseProgress = await CourseProgress.findOne({
      userId,
      courseId: courseId
    });

    if (!courseProgress) {
      // Create a new one if it doesn't exist
      courseProgress = await CourseProgress.create({
        userId,
        courseId: courseId,
        completedVideos: [subSectionId],
      });
    } else {
      // Check if the video is already marked as completed
      if (!courseProgress.completedVideos.includes(subSectionId)) {
       // console.log("vjnkjvkjbvajbfawjfa fahbdfabefajkwf")
        courseProgress.completedVideos.push(subSectionId);
        await courseProgress.save();
      }
    }

    return res.status(200).json({
      success: true,
      message: "Course progress updated successfully",
      data: courseProgress.completedVideos,
    });

  } catch (error) {
    console.error("Error updating course progress:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
