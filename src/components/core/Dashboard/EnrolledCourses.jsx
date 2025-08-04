import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../../services/operations/authAPI';
import ProgressBar from "@ramonak/react-progress-bar";
import {useNavigate} from "react-router-dom"
import { formatSecondsToHMS } from '../../../utils/TimeDurationFormatter';
const EnrolledCourses = () => {

  const navigate=useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const { courseSectionData, courseEntireData, completedLectures,totalNoOfLectures } = useSelector((state) => state.viewCourse);
 



  const getEnrolledCourses = async () => {
    try {
      const response = await getUserEnrolledCourses(token);
      setEnrolledCourses(response);
    } catch (error) {
      console.log("unable to fetch enrolled courses")
    }
  }


  
  const findDuration=(course)=>
  {
    const timeDuration = course?.courseContent.reduce((total, sec) => {
                const sectionDuration = sec.subSection.reduce((subTotal, sub) => {
                    return subTotal + (sub.timeDuration || 0);
                }, 0);
               
                return total + sectionDuration;
                }, 0);
 
                return formatSecondsToHMS(timeDuration);
  }
      


  
 // console.log("enrolled courses",enrolledCourses)
  useEffect(() => {
    getEnrolledCourses();

    
  }, [])

  return (
<div className='text-white p-6 bg-richblack-900 rounded-lg'>
  <h1 className="text-2xl font-bold mb-4">Enrolled Courses</h1>

  {
    !enrolledCourses ? (
      <div className='loader h-10 w-10 border-4 border-t-white border-gray-300 rounded-full animate-spin'></div>
    ) :
    !enrolledCourses.length ? (
      <p className="text-gray-400">You are not enrolled in any course</p>
    ) : (
      <div className="space-y-4">
        {/* Header - hidden on mobile */}
        <div className="hidden sm:grid grid-cols-12 font-semibold text-gray-300 border-b border-richblack-700 pb-2">
          <p className="col-span-6">Course name</p>
          <p className="col-span-3">Duration</p>
          <p className="col-span-3">Progress</p>
        </div>

        {enrolledCourses.map((course, index) => (
          <div 
            key={index}
            onClick={() => {
              console.log(course?._id)
              console.log(course.courseContent?.[0]?.subSection?.[0]._id)
              console.log(course.courseContent[0]?._id)
              navigate(`/view-course/${course?._id}/section/${course.courseContent[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]._id}`)
            }}
            className="cursor-pointer bg-richblack-800 p-4 rounded-lg border border-richblack-700 hover:border-yellow-500 hover:bg-richblack-700 transition-all duration-200"
          >
            
            <div className="sm:hidden flex flex-col gap-4">
             
              <img 
                src={course.thumbnail} 
                alt="thumbnail" 
                className="w-full h-40 object-cover rounded-lg mb-3" 
              />
              
              {/* Course info */}
              <div>
                <p className="font-medium text-lg text-richblack-5">{course.Name}</p>
                <p className="text-sm text-richblack-300 mt-1">{course.courseDescription}</p>
              </div>
              
              {/* Duration */}
              <div className="text-sm text-richblack-100">
                <span className="font-semibold text-richblack-300">Duration: </span>
                {findDuration(course)}
              </div>
              
              {/* Progress */}
              <div className="mt-2">
                <p className="text-sm mb-1 text-richblack-100">
                  <span className="font-semibold text-richblack-300">Progress: </span>
                  {Math.floor(course?.progressPercentage) || 0}%
                </p>
                <ProgressBar
                  completed={course?.progressPercentage || 0}
                  height='8px'
                  isLabelVisible={false}
                  baseBgColor="#1f2937"
                  bgColor="#10b981"
                />
              </div>
            </div>

            {/* Desktop layout   */}
            <div className="hidden sm:grid grid-cols-12 gap-4 items-center">
              <div className="col-span-6 flex gap-4 items-center">
                <img src={course.thumbnail} alt="thumbnail" className="w-20 h-20 object-cover rounded" />
                <div>
                  <p className="font-medium text-lg text-richblack-5">{course.Name}</p>
                  <p className="text-sm text-richblack-300">{course.courseDescription}</p>
                </div>
              </div>

              <div className="col-span-3 text-sm text-richblack-100">
                {findDuration(course)}
              </div>

              <div className="col-span-3">
                <p className="text-sm mb-1 text-richblack-100">
                  {Math.floor(course?.progressPercentage) || 0}%
                </p>
                <ProgressBar
                  completed={course?.progressPercentage || 0}
                  height='8px'
                  isLabelVisible={false}
                  baseBgColor="#1f2937"
                  bgColor="#10b981"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
</div>
  )
}

export default EnrolledCourses
