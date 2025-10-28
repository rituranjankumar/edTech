const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");
const Profile = require("../models/Profile");
const User = require("../models/User");
const cloudinary = require("cloudinary").v2;
const { uploadImageToCloudinary } = require("../utils/imageUploader");
// we need not to create the profile as we have already created in user controller while signup
//we only need to update the profile 

//update the profile
exports.updateProfile = async (req, res) => {
    try {
        //get data

        // console.log("Incoming req.body: ", req.body);
        // console.log("User ID: ", req.user.id);

        const { gender, contactNumber,countrycode="", dateOfBirth = "", about = "", DisplayName } = req.body;
        //user id from req user._id
        const id = req.user.id;
        //validate 

        const nameParts = DisplayName.trim().split(" ");
        const firstName = nameParts[0];
        const lastName = nameParts.length > 1 ? nameParts[1] : "";


        // console.log("first name -> ",firstName);
        // console.log("last name -> ",lastName);


        if (  !gender || !id) {
            return res.status(400).json({
                success: false,
                message: "Some fields are required"
            })
        }

        // console.log("date of birth ",dateOfBirth);


        const dobFormat = (dateOfBirth) => {
            if (!dateOfBirth) return "";
            const [yyyy, mm, dd] = dateOfBirth.split("-");
            return `${dd}/${mm}/${yyyy}`;
        }

        let formattedDOB = dateOfBirth ? dobFormat(dateOfBirth) : "";


        // Validate contact number format (assuming 10-digit format)
        if(contactNumber)
        {
              if (!/^\d{10}$/.test(contactNumber)) {
            return res.status(400).json({
                success: false,
                message: "Invalid contact number format",
            });
        }
        }
      
        //find profile
        let userProfile = await User.findByIdAndUpdate(id,
            {
                firstName: firstName,
                lastName: lastName
            },
            { new: true }
        )

        if (!userProfile) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const profileId = userProfile.additionalDetails;

        if (!profileId) {
            return res.status(404).json({
                success: false,
                message: "Profile not found",
            });
        }
        //update profile
        let updatedProfile = await Profile.findByIdAndUpdate(profileId,
            {
                gender: gender,
                dateOfBirth: formattedDOB,
                about: about,
                contactNumber: contactNumber,
                countrycode:countrycode,
            },
            { new: true }
        );
        //return res

        userProfile = await userProfile.populate({
            path: "additionalDetails"
        });


        console.log("User Profile after populate:", userProfile);

        return res.status(200).json({
            success: true,
            message: "Profile Updated Successfully",
            userProfile,
            updatedProfile
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while updating the profile",
            error: error.message
        });
    }
}

//delete profile schedule

exports.deleteAccount = async (req, res) => {
    try {
        //get user id
        const userId = req.user.id;

        //validation
        const userDetails = await User.findById(userId);

        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const profileId = userDetails.additionalDetails;

        if (!profileId) {
            return res.status(404).json({
                success: false,
                message: "Profile not found",
            });
        }

        //schedule the date for 1 days
        const deletionDate = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000); // 1 day


        userDetails.deletionDate = deletionDate;
        await userDetails.save();

        //return response
        return res.status(200).json({
            success: true,
            updatedUser: userDetails,
            message: `Account deletion scheduled for ${deletionDate.toString()}`
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while deleting the profile",
            error: error.message
        });
    }
}

//get user details

exports.getAllUserDetails = async (req, res) => {
    try {
        const userId = req.user.id;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        // get details

        const userDetails = await User.findOne({ _id: userId }).populate("additionalDetails");


        //return res

        return res.status(200).json({
            success: true,
            message: "User data fetched succcessfully",
            userDetails
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while fetching all the user details",
            error: error.message
        })
    }
}



exports.updateDisplayPicture = async (req, res) => {
    try {
        //  console.log("FILES: ", req.files);
        //console.log("HEADERS:", req.headers);
        console.log("BODY:", req.body);
        console.log("FILES:", req.files);
        if (!req.files || !req.files.displayPicture) {
            return res.status(400).json({
                success: false,
                message: "no file found"
            })
        }
        const displayPicture = req.files.displayPicture
        const userId = req.user.id
        const image = await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        )
        console.log("url of uploaded profile picture ", image.secure_url);
        const updatedProfile = await User.findByIdAndUpdate(
            { _id: userId },
            {
                image: image.secure_url,
                imagePublicId: image.public_id
            },

            { new: true }
        )
        res.send({
            success: true,
            message: `Image Updated successfully`,
            data: updatedProfile,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "file is not uploaded",
            error: error.message,
        })
    }
};



exports.removeDisplayPicture = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);

        if (!user) return res.status(404).json({ message: "User not found" });

        if (user.imagePublicId) {
            await cloudinary.uploader.destroy(user.imagePublicId);
        }


        // Clear image from user profile
        user.image = null;
        user.imagePublicId = null;
        await user.save();

        res.status(200).json(
            {
                success: true,
                message: "image removed successfully",
                data: user,

            }
        ); // send updated user back
    } catch (error) {
        console.error("Error removing display picture:", error);
        res.status(500).json({ message: "Failed to remove display picture", error: error.message });
    }
};


exports.getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id
        let userDetails = await User.findOne({
            _id: userId,
        }).populate({
                path: "courses",
                populate: {
                    path: "courseContent",
                    populate: { path: "subSection" } // Nested populate
                }
            })
            .populate({
                path: "courses",
                populate: {
                    path: "ratingAndReviews",
                    populate: { path: "user" } // Nested populate
                }
            })
            .exec();


        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find user with id: ${userId}`,
            })
        }

        //calculate the course porgress percentage
            userDetails=userDetails.toObject();
        for(var i=0;i<userDetails.courses.length;i++)
        {
            let subSectionLength=0;
            for(var j=0;j<userDetails.courses[i].courseContent.length;j++)
            {
                subSectionLength +=userDetails.courses[i].courseContent[j].subSection.length;

            }

            let courseProgresCount=await CourseProgress.findOne({
                courseId:userDetails.courses[i]._id,
                userId:userId
            })

            const completedCount = courseProgresCount?.completedVideos?.length || 0;
            
            if(subSectionLength===0)
            {
                userDetails.courses[i].progressPercentage=100;

            }
            else{
                const multiplier=Math.pow(10,2);
                userDetails.courses[i].progressPercentage=Math.round((completedCount/subSectionLength)*100*multiplier)/multiplier
            }
        }


        return res.status(200).json({
            success: true,
            data: userDetails.courses,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

exports.AdminDashboard=async(req,res)=>
{
    try{

        
        const InstructorId=req.user.id;
          const courseDetails=await Course.find() 
          
          const courseData=courseDetails.map((course)=>
        {
            const totalStudentsEnrolled=course.studentsEnrolled.length;
            const totalAmountGenerated=totalStudentsEnrolled * course.price; 

            // create a object with the data 

            const courseDataWithStats={
                _id:course._id,
                courseName:course.Name,
                courseDescription:course.courseDescription,
                totalAmountGenerated:totalAmountGenerated,
                totalStudentsEnrolled:totalStudentsEnrolled
            }

            return courseDataWithStats;
        })

        res.status(200).json({
            success:true,
            courses:courseData
        })
    }catch(error)
    {
        console.error(error);
        res.status(500).json({
            success:false,
            message:"Error in fetchinf instructor dashboard details",
            error:error
        })
    }
}
