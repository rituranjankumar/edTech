import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { markLectureAsComplete } from '../../../services/operations/courseDetailsAPI';
import { updateCompletedLectures } from '../../../slices/viewCourseSlice';
import { Player, ControlBar, LoadingSpinner, ReplayControl, PlaybackRateMenuButton, ForwardControl } from 'video-react';
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

import { AiFillPlayCircle } from "react-icons/ai"
import IconBtn from '../../common/IconBtn';
import { CiGlass } from 'react-icons/ci';

const VideoDetails = () => {

  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const playerRef = useRef();
  const { token } = useSelector((state) => state.auth);
  const { courseSectionData, courseEntireData, completedLectures } = useSelector((state) => state.viewCourse);

  const [videoData, setVideoData] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const setVideoSpecificDetails = async () => {
      if (!courseSectionData.length)
        return;
      if (!courseId && !sectionId && !subSectionId) {
        navigate("/dashboard/enrolled-courses");
      }
      else {
        //let's assume k all 3 fields are present

        console.log("courseSection data ", courseSectionData);
        const filteredData = courseSectionData?.filter(
          (course) => course._id === sectionId
        )
        console.log("filtered data ", filteredData);
        if (!filteredData.length || !filteredData[0]?.subSection?.length) {
          console.warn("No matching section or subSection found");
          setVideoData(null);
          return;
        }


        const filteredVideoData = filteredData?.[0]?.subSection?.filter(
          (data) => data._id === subSectionId
        )
        if (!filteredVideoData.length) {
          console.warn("Subsection not found in this section");
          setVideoData(null);
          return;
        }

        setVideoData(filteredVideoData?.[0]);
        setVideoEnded(false);

      }
    }
    setVideoSpecificDetails();

  }, [courseSectionData, courseEntireData, location.pathname])

  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
      (data) => data._id === subSectionId
    )
    if (currentSectionIndex === 0 && currentSubSectionIndex === 0) {
      return true;
    }
    else {
      return false;
    }
  }

  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
      (data) => data._id === subSectionId
    )

    if (currentSectionIndex === courseSectionData.length - 1 &&
      currentSubSectionIndex === noOfSubSections - 1) {
      return true;
    }
    else {
      return false;
    }


  }

  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
      (data) => data._id === subSectionId
    )

    if (currentSubSectionIndex !== noOfSubSections - 1) {
      //same section ki next video me jao
      const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex + 1]._id;
      //next video pr jao
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
    }
    else {
      //different section ki first video
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
      const nextSubSectionId = courseSectionData[currentSectionIndex + 1].subSection[0]._id;
      ///iss voide par jao 
      navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)
    }
  }

  const goToPrevVideo = () => {

    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
      (data) => data._id === subSectionId
    )

    if (currentSubSectionIndex != 0) {
      //same section , prev video
      const prevSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex - 1]._id;
      //iss video par chalge jao
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`)
    }
    else {
      //different section , last video
      const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
      const prevSubSectionLength = courseSectionData[currentSectionIndex - 1].subSection.length;
      const prevSubSectionId = courseSectionData[currentSectionIndex - 1].subSection[prevSubSectionLength - 1]._id;
      //iss video par chalge jao
      navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`)

    }


  }

  const handleLectureCompletion = async () => {

    ///dummy code, baad me we will replace it witht the actual call
    setLoading(true);
    //PENDING - > Course Progress PENDING
    const res = await markLectureAsComplete({ courseId: courseId, sectionId: sectionId, subSectionId: subSectionId }, token);
    //state update
    if (res) {
      dispatch(updateCompletedLectures(subSectionId));
    }
    setLoading(false);

  }
  return (
    <div className='w-full flex flex-col min-h-screen px-2 sm:px-4 md:px-6'>
      {
        !videoData || !videoData.videoUrl ? (
          <div className='w-full flex items-center justify-center text-xl sm:text-2xl font-bold text-center'>
            No Data Found
          </div>
        ) : (
          <div className='w-full aspect-video relative max-w-full'>
            <Player
              ref={playerRef}
              aspectRatio="16:9"
              playsInline
              autoPlay={true}
              onEnded={() => {
                console.log("video ended")
                setVideoEnded(true)
              }}
              src={videoData?.videoUrl}
            >
              <ControlBar className="text-sm sm:text-base">
                <LoadingSpinner />
                <ReplayControl seconds={10} order={2.1} />
                <ForwardControl seconds={10} order={3.1} />
                <PlaybackRateMenuButton rates={[2, 1.5, 1.25, 1, 0.75, 0.5]} />
              </ControlBar>
            </Player>

            {videoEnded && (
              <div className='bg-opacity-50 p-4 bg-richblack-700 backdrop-blur-sm z-50 absolute w-full h-full gap-4 text-white flex inset-0 flex-col items-center justify-center'>
                {!completedLectures.includes(subSectionId) && (
                  <IconBtn
                    disabled={loading}
                    onClick={handleLectureCompletion}
                    text={!loading ? "Mark As Completed" : "Loading..."}
                    className='bg-yellow-50 rounded px-3 py-2 text-richblack-800 hover:bg-yellow-100 text-sm sm:text-base'
                  />
                )}

                <IconBtn
                  className='text-base sm:text-lg bg-yellow-50 rounded px-3 py-2 text-richblack-800 hover:bg-yellow-100'
                  disabled={loading}
                  onClick={() => {
                    if (playerRef?.current) {
                      console.log("video restarted")
                      playerRef.current?.seek(0);
                       playerRef.current?.play();
                      setVideoEnded(false);
                    }
                  }}
                  text="Rewatch"
                />

                <div className='flex items-center gap-2 flex-wrap justify-center'>
                  {!isFirstVideo() && (
                    <button
                      disabled={loading}
                      onClick={goToPrevVideo}
                      className='bg-yellow-50 flex justify-between items-center gap-1 rounded px-3 py-2 text-richblack-800 hover:bg-yellow-100 text-sm sm:text-base'
                    >
                      <FaArrowLeft />
                      Prev
                    </button>
                  )}
                  {!isLastVideo() && (
                    <button
                      disabled={loading}
                      onClick={goToNextVideo}
                      className='bg-yellow-50 rounded px-3 py-2 flex justify-between gap-1 items-center text-richblack-800 hover:bg-yellow-100 text-sm sm:text-base'
                    >
                      <FaArrowRight />
                      Next
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )
      }

      <div className="bg-richblack-700 p-4 mt-4 text-sm sm:text-base">
        <h1 className="text-white text-lg font-semibold break-words">
          Video Title: {videoData?.title}
        </h1>
        <p className="text-richblack-50 mt-2 break-words">
          Video Description: {videoData?.description}
        </p>
      </div>
    </div>

  )
}

export default VideoDetails
