const mongoose = require("mongoose");
const courseProgress = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true 
    },
    completedVideos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubSection"
    }]

}, { timestamps: true });

// Ensure one entry per user per course
courseProgress.index({ userId:1, courseId:1}, { unique: true });
module.exports = mongoose.model("CourseProgress", courseProgress);