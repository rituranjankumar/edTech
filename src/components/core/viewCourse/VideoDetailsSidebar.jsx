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
            <div className="flex h-[calc(100vh-3.5rem)] w-full flex-col md:w-[320px] border-r-[1px] border-r-richblack-700 bg-richblack-800">
                {/* Buttons and Heading */}
                <div className="mx-4 flex flex-col items-start justify-between gap-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
                    {/* Navigation Buttons */}
                    <div className="flex w-full items-center justify-between gap-2">
                        <div
                            onClick={() => navigate("/dashboard/enrolled-courses")}
                            className="flex h-[35px] w-[80px] cursor-pointer items-center justify-center gap-2 rounded-lg bg-richblack-600 text-center text-sm font-medium hover:bg-richblack-500"
                        >
                            <FaBackward />
                            Back
                        </div>
                        <IconBtn
                            text="Add Review"
                            onClick={() => setReviewModal(true)}
                            customClasses="ml-auto"
                            className="bg-yellow-400 px-1 py-0.5 rounded-md text-richblack-50 hover:bg-yellow-500"
                        />
                    </div>

                    {/* Course Title */}
                    <div className="flex flex-col">
                        <p className="text-lg font-semibold">{courseEntireData?.courseName}</p>
                        <p className="text-sm text-richblack-400">
                            {completedLectures?.length} / {totalNoOfLectures} lectures completed
                        </p>
                    </div>
                </div>

                {/* Sections and SubSections */}
                <div className="h-[calc(100vh-5rem)] overflow-y-auto">
                    {courseSectionData.map((course, index) => (
                        <div
                            key={index}
                            className="mt-2 cursor-pointer text-sm text-richblack-5"
                            onClick={() =>
                                activeStatus ? setActiveStatus("") : setActiveStatus(course?._id)
                            }
                        >
                            {/* Section */}
                            <div className="flex flex-col rounded-lg bg-richblack-700 px-5 py-4">
                                <div className="flex items-center justify-between">
                                    {course?.sectionName}
                                    <div className="text-xl">
                                        {activeStatus === course?._id ? (
                                            <IoIosArrowDropdown />
                                        ) : (
                                            <IoIosArrowDropup />
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* SubSections */}
                            <div className="transition-all duration-500 ease-in-out">
                                {activeStatus === course?._id && (
                                    <div className="mt-1">
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
                                                className={`flex cursor-pointer gap-5 rounded px-3 py-2 ${videoBarActive === topic._id
                                                        ? "bg-yellow-200 text-richblack-900"
                                                        : "bg-richblack-900 text-white hover:bg-richblack-800"
                                                    }`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={completedLectures.includes(topic?._id)}
                                                    onChange={() => { }}
                                                    className="h-4 w-4 rounded border-richblack-300 text-yellow-100 focus:ring-yellow-100"
                                                />
                                                <span>{topic.title}</span>
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