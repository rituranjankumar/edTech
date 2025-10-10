 const cron = require("node-cron");
const User = require("../models/User");
const Course = require("../models/Course");
const Profile = require("../models/Profile");
const RatingAndReview = require("../models/RatingAndReview");

function deleteExpiredAccount()
{
    cron.schedule("0 0 * * *", async () => {  // Run at midnight daily
        try {

            console.log("Cron started, checking expired accounts...");
            // Find all users who are eligible for deletion (deletionDate is due)
            const usersToDelete = await User.find({ deletionDate: { $lte: new Date() } });
    
            console.log("Found users:", usersToDelete.length);

            // Process each user who needs to be deleted
            for (const user of usersToDelete) {
                const userId = user._id;
                const profileId = user.additionalDetails;  // ID of the user's profile
                // const enrolledCourses = user.courses || []; // Get the list of courses the user is enrolled in
    
                // // Remove user from all enrolled courses
                // // for (const courseId of enrolledCourses) {
                // //     await Course.findByIdAndUpdate(courseId, {
                // //         $pull: { enrolledStudents: userId }, // Remove user from course's enrolledStudents array
                // //     });
                // // }

                // // 1️ Remove user from all enrolled courses

                //     await Course.updateMany(
                //     { _id: { $in: enrolledCourses } },
                //     { $pull: { enrolledStudents: userId } }
                //     );

    

                //     // delete the reviews
                     
                //    const deletedReviews= await RatingAndReview.find({
                //         user:userId
                //     })
                //         const reviewIds = deletedReviews.map(review => review._id);

                //     // remove the deleteRevies from the course
                    
                //     // for(const review of deletedReviews)
                //     // {
                //     //     await Course.findByIdAndUpdate(review.course,{
                //     //         $pull:{ratingAndReviews:review._id}
                //     //     })
                //     // }


                //     await Course.updateMany(
                //         { ratingAndReviews: {$in : reviewIds}},
                //         {
                //             $pull : {ratingAndReviews : {$in :reviewIds}}
                //         }
                //     )
                //     await RatingAndReview.deleteMany({_id:{$in :reviewIds}});
                    
                    // also delete the course progress

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