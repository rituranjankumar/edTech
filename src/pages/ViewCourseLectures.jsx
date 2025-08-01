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
    const {courseId} = useParams();
    const {token} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();

    useEffect(()=> {
        const setCourseSpecificDetails = async() => {
              const courseData = await getFullDetailsOfCourse(courseId, token);
              console.log(" in the viewcourse ",courseData)
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
    },[]);


  return (
  <div className="relative">
  <div className='text-richblack-100 w-full h-full flex flex-col md:flex-row min-h-[calc(100vh-3.5rem)]'>
    {/* Sidebar     */}
    <div className='w-full md:w-[30%] lg:w-[25%] h-full md:fixed md:left-0 md:top-[3.5rem] md:bottom-0'>
      <VideoDetailsSidebar setReviewModal={setReviewModal} />
    </div>

    {/* Main Content   */}
    <div className='w-full md:w-[70%] lg:w-[75%] md:ml-[30%] lg:ml-[25%] min-h-[calc(100vh-3.5rem)] overflow-auto'>
      <div className='mx-auto w-full py-4 px-4 sm:px-6'>
        <Outlet />
      </div>
    </div>
  </div>
  
  {/* Modal   */}
  {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
</div>

  )
}

export default ViewCourse
