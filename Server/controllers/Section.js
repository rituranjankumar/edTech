const Section = require("../models/Section");
const Course = require("../models/Course");
const mongoose=require("mongoose")
exports.createSection = async (req, res) => {
    try {
        //data fetch
        const { sectionName, courseId } = req.body;
        //data validate
        if (!courseId || !sectionName) {
            return res.status(400).json({
                success: false,
                message: " missing properties in section",
                error: error.message
            });
        }
        //create section
        const newSection = await Section.create({
            sectionName: sectionName,

        })
        //update course with section object id
        const updatedcourseDetails = await Course.findByIdAndUpdate(courseId,
            {
                $push: { courseContent: newSection._id }
            },
            { new: true }
        ).select("-courseDescription -instructor -whatYouWillLearn").populate({
            path:"courseContent",
            populate:{
                path:"subSection",
            },
        }).exec();

        //return response

        return res.status(200).json({
            success: true,
            message: "Section created successfully ",
            updatedcourseDetails
        });

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "something went wrong while creating the section ,please try again later",
            error: error.message
        });
    }
}

//update a section

exports.updateSection = async (req, res) => {
    try {
        //data fetch
        const { sectionName, sectionId } = req.body;

        //data validation
        if (!sectionName || !sectionId) {
            return res.status(400).json({
                success: false,
                message: " missing properties in updating section",
                error: error.message
            });
        }
        //data upadte
        const section = await Section.findByIdAndUpdate(sectionId, {
            sectionName: sectionName,
            new: true
        })
        //no need to update it into course because the section id is already present in the course 

        const updatedCourse= await  Course.findOne({
            courseContent:{$in:[sectionId]},
        }).select("-courseDescription -instructor -whatYouWillLearn").populate({
            path:"courseContent",
            populate:{
                path:"subSection",
            },
        }).exec();
        return res.status(200).json({
            success: true,
            message: " Section updated sucessfully",
            data:updatedCourse
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "something went wrong while updating the section ,please try again later",
            error: error.message
        });
    }
}

exports.deleteSection = async (req, res) => {
    try {
        //fetch id form req parameter from frontend
        let { sectionId } = req.body;

        //validate

        if (!sectionId) {
            return res.status(400).json({
                success: false,
                message: "details missing for deleting the section",
                
            });
        }
          sectionId = new mongoose.Types.ObjectId(sectionId);
        await Section.findByIdAndDelete(sectionId);

        // also delete from the course
        //we will set at the time of testing is it necessary ??
        
        const updatedCourse = await Course.findOneAndUpdate(
            { courseContent: sectionId },
             { $pull: { courseContent: sectionId } } ,
              { new: true }
        ).select("-courseDescription -instructor -whatYouWillLearn").populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

         if (!updatedCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found while updating",
      });
    }
        return res.status(200).json({
            success: true,
            message: "Section deleted successfully",
            data:updatedCourse

        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "something went wrong while deleting   the section ,please try again later",
            error: error.message
        });
    }
}