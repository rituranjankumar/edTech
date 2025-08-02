import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';
import { IoIosArrowDropdown } from "react-icons/io";
import { IoIosArrowDropup } from "react-icons/io";
import { FaBackward } from "react-icons/fa";
import { CiLight } from 'react-icons/ci';
const VideoDetailsSidebar = ({ setReviewModal }) => {

    const [activeStatus, setActiveStatus] = useState(null);
    const [videoBarActive, setVideoBarActive] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const { sectionId, subSectionId } = useParams();
    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures,
    } = useSelector((state) => state.viewCourse);


    //  console.log(" vidv uiisivd completer lectures data ",courseEntireData)
    // console.log(" vidv uiisivd completer lectures id ",completedLectures)
    useEffect(() => {
        const setActiveFlags = () => {
            if (!courseSectionData.length)
                return;
            const currentSectionIndex = courseSectionData.findIndex(
                (data) => data._id === sectionId
            )
            //if not found sections
            if (currentSectionIndex === -1) return;


            const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
                (data) => data._id === subSectionId
            ) ?? 0;
            const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;
            // Only update if different from current state
            setActiveStatus(prev => courseSectionData[currentSectionIndex]?._id !== prev ?
                courseSectionData[currentSectionIndex]?._id : prev);

            setVideoBarActive(prev => activeSubSectionId !== prev ? activeSubSectionId : prev);

            console.log("curr section ", activeStatus);
            console.log("curr vid", videoBarActive)
        }
        setActiveFlags();
    }, [courseSectionData, courseEntireData, location.pathname,])

    return (
        <>
     <div className="flex h-[calc(100vh-3.5rem)] w-full flex-col   border-r border-r-richblack-700 bg-richblack-800">
  {/* Buttons and Heading */}
  <div className="mx-3 sm:mx-4 flex flex-col items-start justify-between gap-3 sm:gap-4 border-b border-richblack-600 py-4 sm:py-5">
    {/* Navigation Buttons */}
    <div className="sm:flex  flex-col sm:flex-row  gap-2  sm:w-full sm:items-center sm:justify-between sm:gap-1">
      <button
        onClick={() => navigate("/dashboard/enrolled-courses")}
        className="flex h-8 mb-2 transition-all duration-300  sm:h-9 items-center gap-1 sm:gap-2 rounded-lg bg-richblack-600 px-3 sm:px-4 text-xs sm:text-sm font-medium text-richblack-25 hover:bg-richblack-500  "
      >
        <FaBackward size={14} />
        <span>Back</span>
      </button>
      <button
        onClick={() => setReviewModal(true)}
        className="ml-auto flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-richblack-900 text-xs sm:text-sm font-medium px-3 py-1.5 rounded-md transition-colors"
      >
        <span>Add Review</span>
      </button>
    </div>

    {/* Course Title */}
    <div className="flex flex-col mt-2 sm:mt-3">
      <p className="text-base sm:text-lg font-semibold text-richblack-5">
        {courseEntireData?.courseName}
      </p>
      <p className="text-xs sm:text-sm text-richblack-400 mt-1">
        {completedLectures?.length} / {totalNoOfLectures} lectures completed
      </p>
    </div>
  </div>

  {/* Sections and SubSections */}
  <div className="h-[calc(100vh-5rem)] overflow-y-auto px-2 sm:px-3">
    {courseSectionData.map((course, index) => (
      <div
        key={index}
        className="mt-1 sm:mt-2 cursor-pointer"
        onClick={() =>
          activeStatus ? setActiveStatus("") : setActiveStatus(course?._id)
        }
      >
        {/* Section Header */}
        <div className="flex items-center justify-between rounded-lg bg-richblack-700 px-3 sm:px-4 py-3 text-richblack-5">
          <span className="text-xs sm:text-sm font-medium">
            {course?.sectionName}
          </span>
          <span className="text-lg sm:text-xl">
            {activeStatus === course?._id ? (
              <IoIosArrowDropdown />
            ) : (
              <IoIosArrowDropup />
            )}
          </span>
        </div>

        {/* SubSections - Animated Dropdown */}
        <div className="transition-all duration-300 ease-in-out overflow-hidden">
          {activeStatus === course?._id && (
            <div className="mt-1 space-y-1">
              {course?.subSection?.map((topic, subIndex) => (
                <div
                  key={subIndex}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(
                      `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                    );
                    setVideoBarActive(topic?._id);
                  }}
                  className={`flex items-center gap-3 sm:gap-4 rounded px-3 py-2 cursor-pointer ${
                    videoBarActive === topic._id
                      ? "bg-yellow-200 text-richblack-900"
                      : "bg-richblack-900 text-richblack-5 hover:bg-richblack-800"
                  } transition-colors`}
                >
                  <input
                    type="checkbox"
                    checked={completedLectures.includes(topic?._id)}
                    onChange={() => {}}
                    className="h-3 w-3 sm:h-4 sm:w-4 rounded border-richblack-300 bg-richblack-700 text-yellow-400 focus:ring-yellow-400"
                  />
                  <span className="text-xs sm:text-sm truncate">{topic.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    ))}
  </div>
</div>

        </>
    )
}

export default VideoDetailsSidebar