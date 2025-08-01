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
    <div className='w-12/12 '>
      <div className='flex mb-8 justify-between'>
        <h1 className='text-richblack-100 font-bold text-xl'> my Courses</h1>
        <IconBtn
          onClick={() => {
            navigate("/dashboard/add-course")
          }}
          text="Add Course"
          className='bg-yellow-50 flex items-center gap-2 px-2 rounded py-1.5 '

        > <IoMdAddCircle /></IconBtn>


      </div>


      {courses.length>0 ?
        (<div>
          <div className="grid grid-cols-12 font-semibold text-richblack-200 border-b border-gray-600 pb-2">
            <p className="col-span-7">Course name</p>
            <p className="col-span-2">Duration</p>
            <p className="col-span-2">price </p>
            <p className='col-span-2'>Actions</p>
          </div>

          <div className='flex flex-col gap-4'>
            {courses.map((course, index) =>
            (
              <InstructorCourseCard key={index} deleteCourseHandler={deleteCourseHandler} course={course} index={index} />
            )
            )}
          </div>
        </div>) :
        (<div className='text-white'> No Course is created by the instructior</div>)
      }

    </div>
  )
}

export default InstructorCourse