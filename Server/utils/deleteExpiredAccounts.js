 const cron = require("node-cron");
const User = require("../models/User");
const Course = require("../models/Course");
const Profile = require("../models/Profile");

function deleteExpiredAccount()
{
    cron.schedule("0 0 * * *", async () => {  // Run at midnight daily
        try {
            // Find all users who are eligible for deletion (deletionDate is due)
            const usersToDelete = await User.find({ deletionDate: { $lte: new Date() } });
    
            // Process each user who needs to be deleted
            for (const user of usersToDelete) {
                const userId = user._id;
                const profileId = user.additionalDetails;  // ID of the user's profile
                const enrolledCourses = user.courses || []; // Get the list of courses the user is enrolled in
    
                // Remove user from all enrolled courses
                for (const courseId of enrolledCourses) {
                    await Course.findByIdAndUpdate(courseId, {
                        $pull: { enrolledStudents: userId }, // Remove user from course's enrolledStudents array
                    });
                }
    
                // Delete the user's profile and account
                await Profile.findByIdAndDelete(profileId); // Delete the profile
                await User.findByIdAndDelete(userId); // Delete the user
    
                console.log(`Deleted user: ${userId}`); // Log the deletion
            }
        } catch (error) {
            console.error("Error deleting scheduled accounts:", error); // Log error if something goes wrong
        }
    });
}

module.exports = deleteExpiredAccount;