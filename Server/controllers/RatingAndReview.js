const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const User = require("../models/User");
const { default: mongoose } = require("mongoose");

// create rating
exports.createRating = async (req, res) => {
    try {
        //fetchh data
        const { rating, review, courseId } = req.body;
        //get userid courseid 
        const userId = req.user.id;
        //check if user is enrolled or not
        const courseDetails = await Course.findOne({
            _id: courseId,
            studentsEnrolled: {
                $elemMatch: { $eq: userId },
            }
        });
        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: "Student is not enrolled in the course"
            });
        }
        //check user already revied the course
        const alreadyReviewed = await RatingAndReview.findOne({
            user: userId,
            course: courseId,
        });
        if (alreadyReviewed) {
            return res.status(403).json({
                success: false,
                message: "course is already reviewed by the user"
            });
        }
        //create the rating and review
        const ratingReview = await RatingAndReview.create({
            user: userId,
            course: courseId,
            rating: rating,
            review: review
        })
        //add the rating to course
        const updatedCourse = await Course.findByIdAndUpdate({
            _id: courseId
        },
            {
                $push: { ratingAndReviews: ratingReview._id },
            },
            { new: true });
        //return response
        console.log("updated course after addding the review is -> ", updatedCourse)
        return res.status(200).json({
            success: true,
            message: "Rating created successfully",
            data: ratingReview
        })
    }
    catch (error) {
        console.log("error in creating the rating-> ", error);
        return res.status(500).json({
            success: false,
            message: "Error in creating the rating"
        })
    }
}

//get average rating

exports.getAverageRating = async (req, res) => {
    try {
        const { courseId } = req.body;
        //calculate the average rating 
        const result = await RatingAndReview.aggregate([
            // Match the reviews for the specific course by courseId
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId), // Convert courseId to ObjectId
                },
            },
            // Group the matched reviews and calculate the average rating
            {
                $group: {
                    _id: null, // No grouping by any field; treat all reviews as one group
                    averageRating: { $avg: "$rating" }, // Calculate average of the "rating" field
                },
            },
        ]);
        //return rating
        if (result.length > 0) {
            return res.status(200).json({
                success: true,
                message: "Average rating created successfully ",
                averageRating: result[0],
            })
        }

        // if no rating/review exists
        return res.status(200).json({
            success: true,
            message: "Average rating  is 0, no rating till now ",
            averageRating: 0,
        })



    }
    catch (error) {
        console.log("error in creating the average rating-> ", error);
        return res.status(500).json({
            success: false,
            message: "Error in creating the average rating"
        })
    }
}


//get all rating document entirely

exports.getAllRating = async (req, res) => {
    try {
        // Fetch all ratings, sorted by rating in descending order
        const allRatings = await RatingAndReview.find({})
            .sort({ rating: 'desc' }) // Sort ratings in descending order
            .populate({
                path: 'user', // Populate user details
                select: 'firstName lastName email image', // Select only required fields
            })
            .populate({
                path: 'course',  
                select: 'courseName', 
            })
            .exec();

        // If no ratings are found
        if (!allRatings || allRatings.length === 0) {
            return res.status(200).json({success:true,data:allRatings, message: 'No ratings found' });
        }

        // Send the ratings as a response
        res.status(200).json( 
            {
                success:true,
                message:"all ratings fetched successfully",
                data:allRatings
            }
        );
    } catch (error) {
         
        console.error(error);
        res.status(500).json({ message: 'Server error',
             error: error.message 
            });
    }
}