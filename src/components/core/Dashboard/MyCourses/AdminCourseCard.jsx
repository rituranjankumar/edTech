import React, { useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { FaUsers, FaBookOpen } from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { MdOutlineDateRange } from "react-icons/md";
import ConfirmationModal from "../../../common/ConfirmationModal";
import RatingStars from "../../../common/RatingStars";
const AdminCourseCard = ({ course, deleteCourseHandler }) => {
  const courseName = course.Name || "Untitled Course";
  const studentsEnrolledCount = course.studentsEnrolled?.length || 0;
  const price = course.price || 0;
  const categoryName = course.category?.name || "Uncategorized";
  const courseThumbnail = course.thumbnail;
  const status = course.status || "Draft";
  const avgRating=course?.avgRating || 0
  const totalRating=course?.totalRatings || 0
  const createdAt = new Date(course.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const [confirmationModal, setConfirmationModal] = useState(null)
 
  const instructorName = `${course.instructor?.firstName || "Unknown"} ${course.instructor?.lastName || "Instructor"
    }`;
  const totalLectures = course.courseContent?.reduce((count, section) => {
    return count + (section.subSection?.length || 0);
  }, 0);

  return (
    <div className="bg-richblack-800 border border-richblack-700 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col gap-4 p-4 sm:p-5 lg:p-6 w-full">

      {/* Thumbnail */}
      <div className="w-full h-48 sm:h-52 rounded-lg overflow-hidden shadow-inner">
        {courseThumbnail ? (
          <img
            src={courseThumbnail}
            alt={courseName}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-richblack-700 flex items-center justify-center text-richblack-400 font-semibold">
            No Image
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-col justify-between gap-3">
        {/* Course Name */}
        <h2
          className="text-richblack-5 font-bold text-lg md:text-xl line-clamp-2 hover:text-red-400 transition-colors duration-300"
          title={courseName}
        >
          {courseName}
        </h2>

        {/* Instructor & Category */}
        <p className="text-richblack-200 text-sm">
          <span className="font-semibold text-richblack-400">By:</span> {instructorName}
        </p>
        <p className="text-richblack-200 text-sm mb-2">
          <span className="font-semibold text-richblack-400">Category:</span> {categoryName}
        </p>

        {/* Stats */}
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center text-sm bg-richblack-700/50 rounded-md px-2 py-1 shadow-sm">
            <FaUsers className="w-4 h-4 mr-1 text-pink-300" />
            <span className="font-bold text-richblack-50">{studentsEnrolledCount}</span>
            <span className="ml-1 text-richblack-300 hidden sm:inline">Students</span>
          </div>

          <div className="flex items-center text-sm bg-richblack-700/50 rounded-md px-2 py-1 shadow-sm">
            <FaBookOpen className="w-4 h-4 mr-1 text-pink-300" />
            <span className="font-bold text-richblack-50">{totalLectures}</span>
            <span className="ml-1 text-richblack-300 hidden sm:inline">Lectures</span>
          </div>

          <div className="flex items-center text-sm bg-richblack-700/50 rounded-md px-2 py-1 shadow-sm">
            <MdOutlineDateRange className="w-4 h-4 mr-1 text-pink-300" />
            <span className="text-richblack-300">{createdAt}</span>
          </div>

         <div className="flex flex-col gap-1 bg-richblack-700/50 rounded-md px-3 py-2 shadow-sm">
  
  {/* Average Rating */}
              <div className="flex items-center gap-2">
                <RatingStars Review_Count={avgRating} Star_Size={18} />
                <span className="text-sm font-semibold text-richblack-50">
                  {avgRating || "0.0"}
                </span>
              </div>

              {/* Total Ratings */}
              <p className="text-xs text-richblack-300">
                {totalRating > 0
                  ? `${totalRating} ${totalRating === 1 ? "Review" : "Reviews"}`
                  : "No reviews yet"}
              </p>
            </div>

        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-col items-start     justify-between gap-3 pt-3 border-t border-richblack-700">
        {/* Price & Status */}
        <div className="flex items-center   gap-3">
          <div className="flex items-center text-yellow-50 font-bold text-lg">
            <FaIndianRupeeSign className="w-5 h-5" />
            {price.toLocaleString()}
          </div>
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full self-end uppercase ${status === "Published"
                ? " text-yellow-400  "
                : "  text-red-300"
              }`}
          >
            {status}
          </span>
        </div>

        {/* Delete Button */}
        <button
          onClick={() => {
            // () => deleteCourseHandler(course._id)
            setConfirmationModal({
              text1: "Delete this course",
              text2: "Selected Course will be deleted",
              btn1Text: "Delete",
              btn2Text: "Cancel",
              btn1Handler: () =>deleteCourseHandler(course._id),
              btn2Handler: () => setConfirmationModal(null)
            })
          }}
          className="flex items-center justify-center self-start gap-2 bg-red-700/80 hover:bg-red-600 text-pink-50 font-semibold w-full sm:w-auto px-4 py-2 rounded-lg shadow-md transition-transform duration-200  "
        >
          <IoTrashOutline className="w-5 h-5" />
          Delete
        </button>
      </div>
      {confirmationModal ? (
        <ConfirmationModal modalData={confirmationModal} />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default AdminCourseCard;
