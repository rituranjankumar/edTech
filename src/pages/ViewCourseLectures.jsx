import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice';
import VideoDetailsSidebar from "../components/core/viewCourse/VideoDetailsSidebar"
import VideoDetails from '../components/core/viewCourse/VideoDetails';
import { FiMenu, FiX } from 'react-icons/fi';
 
import useOnClickOutside from '../hooks/useOnClickOutside';
import CourseReviewModal from "../components/core/viewCourse/CourseReviewModal"
const ViewCourse = () => {

  const [reviewModal, setReviewModal] = useState(false);
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
const refToggle=useRef(null);
useOnClickOutside(refToggle, () => setIsSidebarOpen(false))

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  useEffect(() => {
    const setCourseSpecificDetails = async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token);
     // console.log(" in the viewcourse ", courseData)
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
      {/* Mobile Toggle Button  */}
   {/* Open Button - only shows when sidebar is closed */}
{!isSidebarOpen && (
  <button
    onClick={(e) => {
      e.stopPropagation();
      setIsSidebarOpen(true);
    }}
    className="fixed z-[999] sm:hidden top-4 left-2 p-2 rounded-md bg-richblack-700 text-white"
  >
    <FiMenu size={24} />
  </button>
)}

{/* Close Button - only shows when sidebar is open */}
{isSidebarOpen && (
  <button
    onClick={(e) => {
      e.stopPropagation();
      setIsSidebarOpen(false);
    }}
    className="fixed z-[999] sm:hidden top-4 left-2 p-2 rounded-md bg-richblack-700 text-white"
  >
    <FiX size={24} />
  </button>
)}

      <div className="text-richblack-100 w-full h-full flex flex-col sm:flex-row min-h-[calc(100vh-3.5rem)] transition-all duration-300">

        {/* Sidebar - Hidden on mobile when closed */}
        <div
        ref={refToggle}
          className={`
            ${isSidebarOpen ? 'translate-x-0 pt-7 min-w-[120px]' : '-translate-x-[300%] '} 
            sm:translate-x-0
            fixed sm:relative
            
            z-50  
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
          <div className="mx-auto   w-full py-4 px-4 sm:px-6">
            <Outlet />
                
          </div>
        </div>
      </div>

       
   

      {/* Modal */}
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </div>




  )
}

export default ViewCourse
