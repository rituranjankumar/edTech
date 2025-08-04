import React, { useEffect, useState } from 'react'
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI'
import InstructorCourseCard from './InstructorCourseCard'
import toast from 'react-hot-toast';
import { useNavigate } from "react-router";
import { IoMdAddCircle } from "react-icons/io";
import {deleteCourse} from "../../../../services/operations/courseDetailsAPI"
import { useSelector } from 'react-redux';
import IconBtn from '../../../common/IconBtn';
 
const InstructorCourse = () => {

  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const getCourses = async () => {
    try {
      const headers = {
        authorization: `Bearer ${token}`
      }
      const response = await fetchInstructorCourses(token);
      //  console.log(response);
      setCourses(response);

    } catch (error) {
      toast.error(error.response);
     // console.log("error in instructor course getter ->", error.message)
    }
  }
  useEffect(() => {
    getCourses();
  }, [])

  const deleteCourseHandler=async (courseId)=>
  {
    // console.log("delete course ",courseId);
      await deleteCourse({courseId:courseId},token)

      getCourses();
  }
  return (
 <div className='w-full'>
  {/* Header Section */}
  <div className='flex flex-col sm:flex-row mb-4 md:mb-6 lg:mb-8 justify-between items-start sm:items-center gap-3 sm:gap-4 md:gap-0'>
    <h1 className='text-richblack-100 font-bold text-base sm:text-lg md:text-xl lg:text-2xl'>My Courses</h1>
    <IconBtn
      onClick={() => navigate("/dashboard/add-course")}
      text="Add Course"
      className='bg-yellow-50 flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded text-xs sm:text-sm md:text-base'
    >
      <IoMdAddCircle className="w-4 sm:w-5 md:w-6" />
    </IconBtn>
  </div>

  {courses.length > 0 ? (
    <div>
      {/* Header Row */}
      <div className="hidden md:grid grid-cols-12 font-semibold text-richblack-200 border-b border-gray-600 pb-2 text-xs sm:text-sm md:text-base">
        <p className="col-span-4 md:col-span-6 lg:col-span-7">Course name</p>
        <p className="col-span-3 md:col-span-3 lg:col-span-2">Duration</p>
        <p className="col-span-2 md:col-span-2 lg:col-span-1">Price</p>
        <p className="col-span-3 md:col-span-1 lg:col-span-2">Actions</p>
      </div>

      

      {/* Courses List */}
      <div className='flex flex-col gap-2 sm:gap-3 md:gap-4 mt-2 sm:mt-3 md:mt-4'>
        {courses.map((course, index) => (
          <InstructorCourseCard 
            key={index} 
            deleteCourseHandler={deleteCourseHandler} 
            course={course} 
            index={index} 
          />
        ))}
      </div>
    </div>
  ) : (
    <div className='text-richblack-100 text-center py-6 sm:py-8 md:py-10 text-sm sm:text-base md:text-lg'>
      No courses created by the instructor
    </div>
  )}
</div>
  )
}

export default InstructorCourse