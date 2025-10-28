import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { fetchAdminCourses, getInstructorData } from '../../../../services/operations/courseDetailsAPI';
import { Link } from 'react-router-dom';
import InstructorChart from './AdminChart';
import { HiHandRaised } from "react-icons/hi2";

const Admin = () => {
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false);
  const [instructorData, setInstructorData] = useState([]);
  const [course, setCourse] = useState([]);
  const { user } = useSelector((state) => state.profile)

  const getCourseData = async () => {
    setLoading(true);
    try {
      const instructorApiData = await getInstructorData(token);
      const result = await fetchAdminCourses(token);

      if (instructorApiData.length > 0) setInstructorData(instructorApiData);
      if (result) setCourse(result);

    } catch (error) {
      console.error("Error fetching admin data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCourseData();
  }, [])

  const totalAmount = instructorData?.reduce((acc, curr) => acc + curr.totalAmountGenerated, 0)
  const totalStudents = instructorData?.reduce((acc, curr) => acc + curr.totalStudentsEnrolled, 0)

  // Custom message conditions
  const showStats = totalStudents > 0 && totalAmount > 0;

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start p-4 text-white">
      {loading ? (
        <div className='flex justify-center items-center w-full h-[80vh]'>
          <div className="w-12 h-12 border-4 border-t-yellow-400 border-b-yellow-400 border-l-gray-700 border-r-gray-700 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="w-full max-w-[1200px] flex flex-col gap-6">
          {/* Header */}
          <div className="mb-6 bg-richblack-800 w-fit flex flex-col gap-3 p-4 rounded">
            <div className='flex items-center justify-center gap-4'>
              <h1 className="text-2xl font-semibold">Hi {user?.firstName}</h1>
              <HiHandRaised className='text-2xl text-yellow-50'/>
            </div>
            <p className="text-sm text-gray-300">Let's start something new</p>
          </div>

          {/* Chart and Statistics */}
          {showStats ? (
            <div className="flex flex-col lg:flex-row gap-8">
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
          ) : (
            <div className="bg-richblack-800 p-6 rounded-lg text-center text-yellow-50 font-semibold">
              No students enrolled or no income generated yet.
            </div>
          )}

          {/* Your Courses Section */}
          <div className="mt-3">
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg font-semibold">Your Courses</p>
              <Link
                to="/dashboard/Admin-courses"
                className="text-yellow-300 transition-colors duration-200 ease-linear bg-richblack-700 px-3 py-2 rounded-md hover:bg-richblack-800 hover:underline text-sm"
              >
                View All
              </Link>
            </div>

            {course.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {course?.slice(0, 3)?.map((c, index) => (
                  <div key={index} className="bg-richblack-800 p-3 rounded-lg flex flex-col gap-4">
                    <img
                      src={c?.thumbnail}
                      className="w-fit h-fit rounded-md object-cover"
                      alt="course"
                    />
                    <div className="flex flex-col justify-between">
                      <p className="font-semibold text-sm line-clamp-2">{c?.Name}</p>
                      <div className="flex items-center text-xs text-gray-400 gap-2">
                        <p>{c?.studentsEnrolled?.length || 0} Students</p>
                        <p>|</p>
                        <p>Rs {c?.price || 0}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center">
                <p className="text-lg mb-2">No courses created yet</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Admin;
