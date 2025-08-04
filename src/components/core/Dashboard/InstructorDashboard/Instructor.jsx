import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { getInstructorData } from '../../../../services/operations/courseDetailsAPI';
import { Link } from 'react-router-dom';
import InstructorChart from './InstructorChart';
import { HiHandRaised } from "react-icons/hi2";
const Instructor = () => {

  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false);
  const [instructorData, setInstructorData] = useState([]);
  const [course, setCourse] = useState([]);
  const { user } = useSelector((state) => state.profile)
  const getCourseData = async () => {
    const instructorApiData = await getInstructorData(token);
    const result = await fetchInstructorCourses(token);

    //  console.log("instructor courses ", result)
    //   console.log("instructor dashboard details ", instructorApiData)
    if (instructorApiData.length > 0) {
      setInstructorData(instructorApiData);
    }
    if (result) {
      setCourse(result);
    }
    setLoading(false);
  }

  //console.log("course data -> ", course);
  //console.log("dashboard data   -> ", instructorData);
  useEffect(() => {
   // console.log("instructor dashboard render ")
    getCourseData();
  }, [])

  const totalAmount = instructorData?.reduce((acc, curr) => {
    return acc += curr.totalAmountGenerated;
  }, 0)
  const totalStudents = instructorData?.reduce((acc, curr) => {
    return acc += curr.totalStudentsEnrolled;
  }, 0)
  return (
    <div className="text-white p-4 ">
      <div className="mb-6 bg-richblack-800 w-fit flex flex-col gap-3  p-4 rounded ">
        <div className='flex  items-center justify-center gap-4'>
          <h1 className="text-2xl font-semibold">Hi {user?.firstName}</h1>
        <HiHandRaised className='text-2xl text-yellow-50'/>
        </div>
        <p className="text-sm text-gray-300">Let's start something new</p>
      </div>

      {loading ? (
        <span className="loader"></span>
      ) : (
        <div className="flex flex-col gap-10">
          {course.length > 0 ? (
            <>
              {/* Chart and Statistics */}
              <div className="flex flex-col  lg:flex-row gap-8">
                <div className="lg:w-2/3 w-full border-2 p-2 border-richblack-800 rounded">
                  <InstructorChart courses={instructorData} />
                </div>

                <div className="lg:w-1/3 h-[50%] w-full bg-richblack-800 rounded-lg p-4 space-y-4">
                  <p className="text-lg font-semibold mb-2">Statistics</p>

                  <div className="flex justify-between border-b border-richblack-600 pb-2">
                    <p>Total Courses</p>
                    <p>{course.length}</p>
                  </div>

                  <div className="flex justify-between border-b border-richblack-600 pb-2">
                    <p>Total Students</p>
                    <p>{totalStudents}</p>
                  </div>

                  <div className="flex justify-between">
                    <p>Total Income</p>
                    <p>Rs {totalAmount}</p>
                  </div>
                </div>
              </div>

              {/* Your Courses Section */}
              <div className="mt-3 h-[30%]">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-lg font-semibold">Your Courses</p>
                  <Link
                    to="/dashboard/my-courses"
                    className="text-yellow-300 transition-colors duration-200 ease-linear bg-richblack-700 px-3 py-2 rounded-md hover:bg-richblack-800 hover:underline text-sm"
                  >
                    View All
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {course?.slice(0, 3)?.map((c, index) => (
                    <div
                      key={index}
                      className="bg-richblack-800 p-3 rounded-lg flex flex-col gap-4"
                    >
                      <img
                        src={c?.thumbnail}
                        className="w-fit h-fit rounded-md object-cover"
                        alt="course"
                      />
                      <div className="flex flex-col justify-between">
                        <p className="font-semibold text-sm line-clamp-2">{c?.Name}</p>
                        <div className="flex items-center text-xs text-gray-400 gap-2">
                          <p>{c?.studentsEnrolled?.length} Students</p>
                          <p>|</p>
                          <p>Rs {c?.price}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center">
              <p className="text-lg mb-2">You have not created any course</p>
              <Link
                to="/dashboard/add-course"
                className="text-yellow-300 hover:underline"
              >
                Create a course
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );

}

export default Instructor