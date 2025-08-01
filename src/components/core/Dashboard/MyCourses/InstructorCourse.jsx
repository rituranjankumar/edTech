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
       console.log(response);
      setCourses(response);

    } catch (error) {
      toast.error(error.response);
      console.log("error in instructor course getter ->", error.message)
    }
  }
  useEffect(() => {
    getCourses();
  }, [])

  const deleteCourseHandler=async (courseId)=>
  {
     console.log("delete course ",courseId);
      await deleteCourse({courseId:courseId},token)

      getCourses();
  }
  return (
  <div className='w-full'> {/* Changed from w-12/12 to w-full */}
  <div className='flex flex-col sm:flex-row mb-6 sm:mb-8 justify-between items-start sm:items-center gap-4 sm:gap-0'>
    <h1 className='text-richblack-100 font-bold text-lg sm:text-xl'>My Courses</h1>
    <IconBtn
      onClick={() => navigate("/dashboard/add-course")}
      text="Add Course"
      className='bg-yellow-50 flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded text-sm sm:text-base'
    >
      <IoMdAddCircle size={18} className="sm:w-5" />
    </IconBtn>
  </div>

  {courses.length > 0 ? (
    <div>
      {/* Header Row */}
      <div className="grid grid-cols-12 font-semibold text-richblack-200 border-b border-gray-600 pb-2 text-xs sm:text-sm">
        <p className=" col-span-4   sm:col-span-4 md:col-span-7   sm:visible">Course name</p>
        <p className=" col-span-5  sm:col-span-3  md:col-span-3 sm:visible">Duration</p>
        <p className=" invisible sm:col-span-2 md:col-span-1 sm:visible">Price</p>
        <p className=" col-span-2  sm:col-span-1 md:col-span-1 sm:visible">Actions</p>
      </div>

      {/* Courses List */}
      <div className='flex flex-col gap-3 sm:gap-4 mt-3 sm:mt-4'>
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
    <div className='text-richblack-100 text-center py-8 text-sm sm:text-base'>
      No courses created by the instructor
    </div>
  )}
</div>
  )
}

export default InstructorCourse