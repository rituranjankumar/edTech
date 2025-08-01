import React, { useState } from 'react'
import { MdIncompleteCircle } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import ConfirmationModal from '../../../common/ConfirmationModal';
 import {useNavigate} from "react-router"
 import { DateFormatter } from '../../../../utils/DateFormatter';
 import { formatSecondsToHMS } from '../../../../utils/TimeDurationFormatter';
import { setCourse, setEditCourse } from '../../../../slices/courseSlice';
const InstructorCourseCard = ({ course, index, deleteCourseHandler }) => {

  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const [modalData, setModatData] = useState(null);
//  const {editCourse}=useSelector((state)=>state.course);
  const courseDeleteHandler =async (courseId) => {
   setLoading(true);
   await   deleteCourseHandler(courseId);
   setModatData(null);
   setLoading(false);
  }

      const totalDuration = course.courseContent.reduce((total, sec) => {
                const sectionDuration = sec.subSection.reduce((subTotal, sub) => {
                    return subTotal + (sub.timeDuration || 0);
                }, 0);
               
                return total + sectionDuration;
                }, 0);
                 
                 console.log("time duration of the course is  ", totalDuration)
  const editHandler=()=>
  {
    dispatch(setEditCourse(true));
    dispatch(setCourse(course));
    navigate("/dashboard/add-course");
  }
  return (
    <div key={index} className='text-richblack-50 grid grid-cols-12   gap-3 sm:gap-4 border-b border-richblack-700 py-3 sm:py-4'>

  {/* Thumbnail */}
  <div className='col-span-12 sm:col-span-3'>
    <img 
      src={course.thumbnail} 
      loading='lazy' 
      alt="course thumbnail" 
      className='w-full sm:w-[220px] h-[120px] sm:h-[150px] rounded-lg shadow-md object-cover' 
    />
  </div>

  {/* Course Info */}
  <div className='col-span-12 sm:col-span-4 flex flex-col justify-evenly space-y-1'>
    <p className='text-base sm:text-lg font-semibold'>{course.Name} :</p>
    <p className='text-xs sm:text-sm text-richblack-300 line-clamp-2'>
      {course.courseDescription}
    </p>
    <p className='text-xs text-richblack-400'>
      Created: {DateFormatter(course.createdAt)}
    </p>

    <div className={`flex items-center bg-richblack-600 w-fit px-1 py-0.5 sm:px-[4px] sm:py-[3px] rounded-md gap-1 sm:gap-2 text-xs sm:text-sm font-medium ${course.status === "Published" ? "text-yellow-50" : "text-red-100"}`}>
      {course.status === "Published" ? 
        <FaCheckCircle size={14} className="sm:w-auto" /> : 
        <MdIncompleteCircle size={14} className="sm:w-auto" />
      }
      <p>{course.status}</p>
    </div>
  </div>

  {/* Duration */}
  <div className='col-span-6 sm:col-span-2 flex items-center text-xs sm:text-sm font-medium'>
    {formatSecondsToHMS(totalDuration)}
  </div>

  {/* Price */}
  <div className='col-span-6 sm:col-span-1 flex items-center text-xs sm:text-sm font-semibold'>
    ₹{course.price}
  </div>

  {/* Action Buttons */}
  <div className='col-span-12 sm:col-span-2 flex items-center justify-end sm:justify-start gap-2 sm:gap-3'>
    <button
      onClick={editHandler}
      disabled={loading}
      className='text-blue-500 hover:text-blue-700 transition'
      aria-label="Edit course"
    >
      <CiEdit size={18} className="sm:w-5" />
    </button>
    <button
      disabled={loading}
      onClick={() => {
        setModatData({
          text1: "Do you want to delete this course",
          text: "All the course data will be deleted",
          btn1Text: "Delete",
          btn2Text: "Cancel",
          btn1Handler: !loading ? () => {
            courseDeleteHandler(course._id);
          } : () => {},
          btn2Handler: !loading ? () => {
            setModatData(null);
          } : () => {},
        })
      }}
      className='text-pink-500 hover:text-pink-700 transition'
      aria-label="Delete course"
    >
      <MdDelete size={18} className="sm:w-5" />
    </button>
  </div>

  {modalData && <ConfirmationModal modalData={modalData} />}

</div>
  )
}

export default InstructorCourseCard
