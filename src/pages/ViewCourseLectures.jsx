import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice';
import VideoDetailsSidebar from "../components/core/viewCourse/VideoDetailsSidebar"
import VideoDetails from '../components/core/viewCourse/VideoDetails';
import { FiMenu, FiX } from 'react-icons/fi';
import CourseReviewModal from "../components/core/viewCourse/CourseReviewModal"
const ViewCourse = () => {

  const [reviewModal, setReviewModal] = useState(false);
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  useEffect(() => {
    const setCourseSpecificDetails = async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token);
      console.log(" in the viewcourse ", courseData)
      dispatch(setCourseSectionData(courseData?.data?.courseContent));
      dispatch(setEntireCourseData(courseData?.data));
      dispatch(setCompletedLectures(courseData.completedVideos));
      let lectures = 0;
      courseData?.data?.courseContent?.forEach((sec) => {
        lectures += sec.subSection.length
      })
      dispatch(setTotalNoOfLectures(lectures));
    }
    setCourseSpecificDetails();
  }, []);


  return (
     <div className="relative">
      {/* Mobile Toggle Button (visible only on small screens) */}
      <button
        onClick={toggleSidebar}
        className={`fixed z-50 sm:hidden top-4 left-4 p-2 rounded-md bg-richblack-700 text-white`}
      >
        {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      <div className="text-richblack-100 w-full h-full flex flex-col sm:flex-row min-h-[calc(100vh-3.5rem)] transition-all duration-300">

        {/* Sidebar - Hidden on mobile when closed */}
        <div
          className={`
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
            sm:translate-x-0
            fixed sm:relative
            z-40
            w-[30%] sm:w-[30%] md:w-[25%] lg:w-[25%] xl:w-[30%]
            h-[calc(100vh-3.5rem)] sm:h-full
            transition-all duration-300
            bg-richblack-800
          `}
        >
          <VideoDetailsSidebar setReviewModal={setReviewModal} />
        </div>

        {/* Main Content - Adjusts when sidebar is toggled */}
        <div
          className={`
            w-full 
            min-h-[calc(100vh-3.5rem)]
            ${!isSidebarOpen ? 'translate-x-0' : 'sm:translate-x-0'}
            transition-all duration-300
          `}
        >
          <div className="mx-auto w-full py-4 px-4 sm:px-6">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Modal */}
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </div>




  )
}

export default ViewCourse
