import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../../../slices/cartSlice';
import { FaShareAlt } from "react-icons/fa";
import toast from 'react-hot-toast';

const CourseDetailsCard = ({ course, handleBuyCourse }) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleAddToCart = () => {
    if(user && (user.accountType==="Instructor" || user.accountType==="Admin"))
    {
        toast.error(`you are an  ${user.accountType} you cannot buy a course`)
        return;
    }
    if(!token)
    {
        toast.warning("Moving to login page")
        navigate("/login");
        return ; 
    }
    dispatch(addToCart(course))
    navigate("/dashboard/cart")
  }
  let parsedInstructions = [];
          try {
       //    console.log("before",course.instructions)
            if (typeof course.instructions === "string") {
              parsedInstructions = JSON.parse(course.instructions);
            } else if (Array.isArray(course.instructions)) {
              parsedInstructions = course.instructions;
              
            }
          } catch (err) {
            console.error("Invalid instructions format", err);
            parsedInstructions = [];
            }
     //console.log("after",parsedInstructions)
  const dispatch = useDispatch();
  const ShareHandle = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Url copied successfully")
  }

  return (
    <div className='flex lg:w-fit lg:min-w-[400px] flex-col gap-6 p-4 md:p-6 rounded-xl bg-richblack-800 shadow-md w-full max-w-md mx-auto md:mx-0'>
      <img
        className='max-h-[300px] min-h-[180px] w-full object-cover rounded-xl'
        src={course.thumbnail}
        alt='Course Thumbnail'
      />

      <div className='text-2xl font-semibold text-yellow-50'>Rs. {course.price}</div>

      <div className='flex flex-col items-center justify-center gap-y-4 w-full'>

        <button
          className='bg-yellow-300 px-4 py-3 w-full rounded-md text-richblack-800 font-semibold hover:bg-yellow-400 transition-all duration-200'
          onClick={
            user && course?.studentsEnrolled.some(student => student?._id === user._id)
              ? () => navigate("/dashboard/enrolled-courses")
              : () => handleBuyCourse()
          }
        >
          {user && course && course?.studentsEnrolled.some(student => student?._id === user._id) ? "Go to Course" : "Buy Now"}
        </button>

        {
         user && !course?.studentsEnrolled.some(student => student?._id === user._id) && (user.accountType!=="Instructor" && user.accountType!=="Admin") && 
          <button
            className='bg-richblack-700 px-4 py-3 w-full rounded-md text-richblack-100 hover:bg-richblack-600 transition-all duration-200'
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        }

        <div className='w-full bg-richblack-900 p-4 rounded-md mt-4'>
          <p className='text-sm text-richblack-300 mb-1'>30 days money back guarantee</p>
          <p className='text-richblack-200 font-semibold mb-2'>This course includes:</p>
          <div className='flex flex-col gap-y-2 text-sm'>
            {parsedInstructions.map((item, i) => (
              <p key={i} className='text-richblack-50'>
                {`${i + 1}. ${item}`}
              </p>
            ))}
          </div>

          <button
            className='flex items-center justify-center mx-auto gap-2 mt-4   px-3 py-2.5 rounded-lg hover:bg-richblack-800 transition-all duration-200'
            onClick={ShareHandle}>
            <FaShareAlt color='yellow' />
            <p className='text-yellow-200 font-medium'>Share</p>
          </button>
        </div>

      </div>
    </div>
  )
}

export default CourseDetailsCard
