const Course = require("../models/Course");
const Category = require("../models/category")
const User = require("../models/User")
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const CourseProgress = require("../models/CourseProgress")
const RatingAndReview = require("../models/RatingAndReview");
//create course handler function




exports.createCourse = async (req, res) => {
    try {
        let {
            courseName,
            tag,
            status,
            courseDescription,
            whatYouWillLearn,
            instructions,
            price,
            category,
        } = req.body;

        const thumbnail = req?.files?.thumbnailImage;

        // Validate required fields
        if (
            !courseName ||
            !courseDescription ||
            !whatYouWillLearn ||
            !price ||
            !category ||
            !thumbnail ||
            !tag
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are mandatory",
            });
        }

        // Default status to "Draft" if not provided
        if (!status || status === undefined) {
            status = "Draft";
        }

        // Validate instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        if (!instructorDetails) {
            return res.status(404).json({
                success: false,
                message: "Instructor not found",
            });
        }

        // Validate category
        const categoryDetails = await Category.findById(category);
     //   console.log("category details in adding course ", categoryDetails);
        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }
console.log(" BEFORE -> Image uploaded to Cloudinary:" );
        // Upload thumbnail to Cloudinary
        const thumbnailImage = await uploadImageToCloudinary(
            thumbnail,
            process.env.FOLDER_NAME
        );
        console.log("Image uploaded to Cloudinary:", thumbnailImage.secure_url);

        // Create new course
        const newCourse = await Course.create({
            Name: courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn,
            price,
            tag,
            status,
            category: categoryDetails._id,
            thumbnail: thumbnailImage.secure_url,
            instructions: instructions ? JSON.parse(instructions) : "",
        });

        console.log("instructinons", newCourse.instructions)
        // Populate necessary fields
        const populatedCourse = await Course.findById(newCourse._id)
            .populate("instructor")
            .populate("category")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .populate({
                path: "ratingAndReviews",
                populate: {
                    path: "user",
                },
            })
            .populate("studentsEnrolled")
            .exec();

        // Add course to instructor profile
        await User.findByIdAndUpdate(
            instructorDetails._id,
            {
                $push: { courses: newCourse._id },
            },
            { new: true }
        );

        // Add course to category
        await Category.findByIdAndUpdate(
            categoryDetails._id,
            {
                $push: { course: newCourse._id },
            },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Course created successfully",
            newCourse: populatedCourse,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while creating the course",
            error: error,
        });
    }
};


//get all courses handler function

exports.getAllCourses = async (req, res) => {
    try {
        const allCourses = await Course.find({},
            {
                courseName: true,
                price: true,
                thumbnaill: true,
                instructor: true,
                ratingAndReviews: true,
                studentsEnrolled: true

            }
        ).pupolate({
            path: "instructor",
            populate: {
                path: "additionalDetails"
            }
        })
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .populate(
                {
                    path: "ratingAndReviews",
                    populate: {
                        path: "user",
                    }
                }
            )
            .populate("category")
            .populate("studentsEnrolled");
        return res.status(200).json({
            success: true,
            message: "Data for all courses fetched successfully",
            data: allCourses
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "something went wrong while fetching the  course data",
            error: error.message
        })
    }
}

//getCourse Details

// for the category course details without token and login 
exports.getCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.body;

        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "Course id not found",
            });
        }

        //get course 

        const courseDetails = await Course.findById(courseId).populate({
            path: "instructor",
            populate: {
                path: "additionalDetails"
            }
        })
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .populate(
                {
                    path: "ratingAndReviews",
                    populate: {
                        path: "user",
                    }
                }
            )
            .populate("category")
            .populate("studentsEnrolled");


        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: "Course details not found",
            });
        }
        // find total course duration

        const totalDuration = courseDetails.courseContent.reduce((total, sec) => {
            const sectionDuration = sec.subSection.reduce((subTotal, sub) => {
                return subTotal + (sub.timeDuration || 0);
            }, 0);
            console.log("time durationis ", sectionDuration)
            return total + sectionDuration;
        }, 0);
        console.log("total duration of the course is ", totalDuration)



        return res.status(200).json({
            success: true,
            message: "Course details fetched successfully",
            data: courseDetails,
            totalDuration: totalDuration,

        })
    }
    catch (error) {
        console.log("error in getting course details->", error)
        return res.status(500).json({

            success: false,
            message: "Error in fetching the course details",
            error: error.message
        })
    }
}


exports.getFullCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.user.id;
        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "Course id not found",
            });
        }

        //get course 

        const courseDetails = await Course.findById(courseId).populate({
            path: "instructor",
            populate: {
                path: "additionalDetails"
            }
        })
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .populate(
                {
                    path: "ratingAndReviews",
                    populate: {
                        path: "user",
                    }
                }
            )
            .populate("category")
            .populate("studentsEnrolled");


        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: "Course details not found",
            });
        }
        // find total course duration

        const totalDuration = courseDetails.courseContent.reduce((total, sec) => {
            const sectionDuration = sec.subSection.reduce((subTotal, sub) => {
                return subTotal + (sub.timeDuration || 0);
            }, 0);

            return total + sectionDuration;
        }, 0);
        console.log("total duration of the course is ", totalDuration)

        let courseProgressCount = await CourseProgress.findOne({
            courseId: courseId,
            userId: userId,
        })

        console.log("courseProgressCount : ", courseProgressCount)
        return res.status(200).json({
            success: true,
            message: "Course details fetched successfully",
            data: courseDetails,
            totalDuration: totalDuration,
            completedVideos: courseProgressCount?.completedVideos
                ? courseProgressCount?.completedVideos
                : [],
        })
    }
    catch (error) {
        console.log("error in getting course details->", error)
        return res.status(500).json({

            success: false,
            message: "Error in fetching the course details",
            error: error.message
        })
    }
}


exports.getInstructorCourses = async (req, res) => {
    try {
        const instructorId = req.user.id;
        const courses = await Course.find({ instructor: instructorId })
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .populate(
                {
                    path: "ratingAndReviews",
                    populate: {
                        path: "user",
                    }
                }
            )
            .populate("category")
            .populate("studentsEnrolled");

        return res.status(200).json({
            success: true,
            message: "Courses created by instructor fetched successfully",
            data: courses
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching instructor courses",
            error: error.message
        });
    }
}

exports.getAdminCourses = async (req, res) => {
    try {
         
        const courses = await Course.find()
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .populate(
                {
                    path: "ratingAndReviews",
                    populate: {
                        path: "user",
                    }
                }
            )
            .populate("category")
            .populate("studentsEnrolled").
            populate("instructor");

        return res.status(200).json({
            success: true,
            message: "Courses created by instructor fetched successfully",
            data: courses
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching instructor courses",
            error: error.message
        });
    }
}

exports.editCourse = async (req, res) => {
    try {
        const {
            courseId,
            courseName,
            tag,
            status,
            courseDescription,
            whatYouWillLearn,
            instructions,
            price,
            category
        } = req.body;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        // Optional: if thumbnail is updated
        let thumbnailImage;
        if (req.files && req.files.thumbnailImage) {
            thumbnailImage = await uploadImageToCloudinary(
                req.files.thumbnailImage,
                process.env.FOLDER_NAME
            );
            console.log("coourse updated thumbnail ", thumbnailImage.secure_url)
            course.thumbnail = thumbnailImage.secure_url;
        }

        // Update only if field is present
        if (courseName) course.Name = courseName;
        if (tag) course.tag = tag;
        if (status) course.status = status;
        if (courseDescription) course.courseDescription = courseDescription;
        if (whatYouWillLearn) course.whatYouWillLearn = whatYouWillLearn;
        if (instructions) course.instructions = JSON.parse(instructions);
        if (price) course.price = price;
        if (category) course.category = category;

        await course.save();
        console.log("instructinons in update", course.instructions)
        // Populate and return
        const updatedCourse = await Course.findById(courseId)
            .populate("instructor")
            .populate("category")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .populate({
                path: "ratingAndReviews",
                populate: {
                    path: "user",
                },
            })
            .populate("studentsEnrolled")
            .exec();

        return res.status(200).json({
            success: true,
            message: "Course updated successfully",
            data: updatedCourse,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error updating course",
            error: error.message,
        });
    }
};

exports.deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.body;

        const course = await Course.findById({ _id: courseId });
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        // 1. Remove course from instructor's course list 
        const instructorId = course.instructor;
        const instructor = await User.findByIdAndUpdate(
            { _id: instructorId },
            { $pull: { courses: courseId } },
            { new: true },
        )

        console.log("instructor details ", instructor);
        // 2. Remove course from category
        const categoryId = course.category;
        await Category.findByIdAndUpdate(
            categoryId,
            { $pull: { course: courseId } },
            { new: true }
        );

        //TODO : unroll students from the course 
        // 3. Unroll students and remove course from their profile
        const studentIds = course.studentsEnrolled;
        if (studentIds && studentIds.length > 0) {
            await User.updateMany(
                { _id: { $in: studentIds } },
                { $pull: { courses: courseId } }
            );
        }

        // 4. Delete course progress for this course
        await CourseProgress.deleteMany({ courseId });

        // 5. Delete all ratings and reviews for the course
        await RatingAndReview.deleteMany({ course: courseId });

        //delete the sections and subsections
        const courseSections = course.courseContent;
        for (const sectionId of courseSections) {
            const section = await Section.findById(sectionId);
            if (section) {
                const subSections = section.subSection;
                if (subSections) {
                    for (const subSectionId of subSections) {
                        await SubSection.findByIdAndDelete(subSectionId);
                    }
                }

            }

            await Section.findByIdAndDelete(sectionId);
        }

        //delete the reviews
        // and the  course progress

        //delete the course
        await Course.findByIdAndDelete({ _id: courseId });

        return res.status(200).json({
            success: true,
            message: "Course deleted successfully"
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }


}
