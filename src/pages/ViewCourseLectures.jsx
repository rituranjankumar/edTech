import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice';
import VideoDetailsSidebar from "../components/core/viewCourse/VideoDetailsSidebar"
import VideoDetails from '../components/core/viewCourse/VideoDetails';
import CourseReviewModal from "../components/core/viewCourse/CourseReviewModal"
const ViewCourse = () => {

  const [reviewModal, setReviewModal] = useState(false);
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

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
      <div className="text-richblack-100 w-full h-full flex flex-col sm:flex-row min-h-[calc(100vh-3.5rem)] transition-all duration-300">

        {/* Sidebar */}
        <div
          className="
        w-full
        sm:w-[30%] 
        md:w-[25%] 
        lg:w-[25%] 
        xl:w-[30%] 
        sm:h-full 
         transition-all duration-300
      "
        >
          <VideoDetailsSidebar setReviewModal={setReviewModal} />
        </div>

        {/* Main Content */}
        <div
          className="
        w-full 
         
         
         
        min-h-[calc(100vh-3.5rem)]
      "
        >
          <div className="mx-auto transition-all duration-300 w-full py-4 px-4 sm:px-6">
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
