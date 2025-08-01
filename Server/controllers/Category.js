const Category=require("../models/category");
const Course=require("../models/Course")
const mongoose=require("mongoose");
//create Category handler function


exports.createCategory=async (req,res)=>
{
    try{
            const {name,description}=req.body;

            //validation 
            if(!name || !description)
            {
                return res.status(400).json({
                    success:false,
                    message:"All fields are required"
                })
            }
            const cat=await Category.findOne({
              name:name,
               
            })
            if(cat)
            {
              return res.status(400).json({
                success:false,
                message:"Category already exists"
              })
            }
            //create db entry
            const categoryData=await Category.create({
                name:name,
                description:description
            });

            return res.status(200).json({
                success:true,
                message:"Category created Successfully",
                categoryData
            })
    }
    catch(error)
    {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//get Category handler function

exports.showAllCategories=async (req,res)=>
{
    try{

        const allCategories=await Category.find({},{name:true,description:true})

        return res.status(200).json({
            success:true,
            message: "All Category returned successfully",
            allCategories
        })
    }
    catch(error)
    {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


//category page details
exports.categoryPageDetails=async(req,res)=>
{
    try{
            //get category id
            const {categoryId}=req.body;

            //get all courses for a category
            const selectedCategoryCourses=await Category.findById(categoryId).populate({
      path: "course",
      match:{status:"Published"},
      populate: [
        { path: "instructor" },
        { path: "ratingAndReviews" },
      ],
    })

            //validation
            if(!selectedCategoryCourses)
            {
                return res.status(404).json({
                    success:false,
                    message:"course not found according to the category",
                });
            }
            //get courses for different categories
            const differentCategoryCourses=await Category.find({_id:{$ne:categoryId}
            
            }).populate({
      path: "course",
        match:{status:"Published"},
      populate: [
        { path: "instructor" },
        { path: "ratingAndReviews" },
      ],
    }).exec();
            //get top selling courses
    let topCoursesRaw = await Course.aggregate([
  // Stage 1: Match courses by category and status
  {
    $match: {
      category: new mongoose.Types.ObjectId(categoryId), //  filter by category
      status: "Published", //  optional, filter published only
    }
  },

  // Stage 2: Add number of students enrolled
  {
    $addFields: {
      noOfStudents: { $size: "$studentsEnrolled" },
    }
  },

  // Stage 3: Sort by number of students
  {
    $sort: { noOfStudents: -1 }
  },

  // Stage 4: Limit to top 10
  {
    $limit: 10
  }
])


 // Fetch full course data with population
    const topSellingCourse = await Course.find({
      _id: { $in: topCoursesRaw.map(course => course._id) },
       
    }).populate([
      { path: "instructor" },
      { path: "ratingAndReviews" },
    ])
 
            //return response
            // console.log("category courses-> ",selectedCategoryCourses);
            // console.log("other   courses-> ",differentCategoryCourses);
            // console.log("top selling courses-> ",topSellingCourse);
            return res.status(200).json({
                success:true,
                message:"courses fetched successfully based on categories",
                data:{
                    selectedCategoryCourses,
                    differentCategoryCourses,
                    topSellingCourse
                }
            })
    }
    catch(error)
    {
        return res.status(500).json({
            success:false,
            message:"error in fetching courses based on categories",
            error:error.message,
        })
    }
}