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
  <div>
  <div className='text-richblack-100 relative w-screen h-full flex flex-wrap min-h-[calc(100vh-3.5rem)]'>
    <div className='w-full md:w-[30%] lg:w-[25%] h-full'>
      <VideoDetailsSidebar setReviewModal={setReviewModal} />
    </div>
    <div className='w-full md:w-[70%] lg:w-[75%] min-h-[calc(100vh-3.5rem)] overflow-auto'>
      <div className='mx-auto w-full py-4'>
        <Outlet />
      </div>
    </div>
  </div>
  {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
</div>

  )
}

export default ViewCourse
