const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const Course = require("../models/Course");
require("dotenv").config();
const { uploadImageToCloudinary } = require("../utils/imageUploader");
//create subsection
exports.createSubSection = async (req, res) => {
    try {
        // fetch data from req body 
        const { sectionId, title, timeDuration, description } = req.body;
        console.log("adding subsection in the backend time duration ", req.body);
        console.log("time duration ",timeDuration)
        // video from file
           
        const video = req.files?.lectureVideo;
        console.log("subsection video ", video);
        //validate
        if (!sectionId || !title || !video) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        //upload video t0 cloudinary ->secure url of video
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

        //create subsection
        const subSectionDetails = await SubSection.create({
            title: title,
              timeDuration:timeDuration?timeDuration:"0" ,
            description: description,
            videoUrl: uploadDetails.secure_url,
        });

        //insert in to section

        const updatedSection = await Section.findByIdAndUpdate(sectionId, {
            $push: { subSection: subSectionDetails._id },

        }, { new: true }).populate("subSection").exec();

        const updatedCourse = await Course.findOne({
             courseContent: sectionId ,
            
        }).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        }).exec();
        //return reponse
        return res.status(201).json({
            success: true,
            message: "SubSection created successfully",
            updatedCourse
        });

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: " error in creating subsecton",
            error: error.message
        });
    }
}

//update subsection
exports.updateSubSection = async (req, res) => {
    try {
        // fetch data from req body 
        const { subSectionId, title, description, timeDuration } = req.body;

     console.log("update subsection in the backend time duration ",timeDuration)
        // video from file
        const video = req.files?.lectureVideo;

        console.log("subsection ", {
            subSectionId, title, description, video
        })
        //validate
        // if(!subSectionId || !title    || !video)
        // {
        //     return res.status(400).json({
        //         success:false,
        //         message:"All fields are required"
        //     });
        // }
        //check if subsection exists or not
        const subSection = await SubSection.findById(subSectionId);
        if (!subSection) {
            return res.status(404).json({
                success: false,
                message: " subsection not found",

            });
        }
        //upload video t0 cloudinary ->secure url of video



        //create subsection
       

       
        if (video) {
            const newUploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
            subSection.videoUrl = newUploadDetails.secure_url;
        }
        if (title) {
            subSection.title = title;
        }
        if (description) {
            subSection.description = description;
        }
        if (timeDuration) {
            subSection.timeDuration = timeDuration;
        }


        subSection.save();
        const updatedSection = await Section.findOne({
            subSection: { $in: [subSectionId] }
        })
        const updatedCourse = await Course.findOne({
            courseContent: { $in: [updatedSection._id] },
        }).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        }).exec();



        //return reponse
        return res.status(200).json({
            success: true,
            message: "SubSection edited successfully",
            data: updatedCourse
        });

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: " error in editing subsecton",
            error: error.message
        });
    }

}

//delete subsection
exports.deleteSubSection = async (req, res) => {
    try {
        const { subSectionId, sectionId } = req.body;

        // Validation
        if (!subSectionId || !sectionId) {
            return res.status(400).json({
                success: false,
                message: "SubSection ID and Section ID are required",
            });
        }

        // Find and delete the SubSection
        //check for subsection if it exists or not
        const deletedSubSection = await SubSection.findById(subSectionId);

        if (!deletedSubSection) {
            return res.status(404).json({
                success: false,
                message: "SubSection not found",
            });
        }
        await SubSection.findByIdAndDelete(subSectionId);

        // Remove the reference from Section
        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            { $pull: { subSection: subSectionId } },
            { new: true }
        ).populate("subSection");


        const updatedCourse = await Course.findOne({
            courseContent: { $in: [updatedSection._id] },
        }).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        }).exec();
        return res.status(200).json({
            success: true,
            message: "SubSection deleted successfully",
            data: updatedCourse,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error deleting SubSection",
            error: error.message,
        });
    }
};
