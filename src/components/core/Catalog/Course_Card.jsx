import React, { useEffect, useState } from 'react'
import RatingStars from '../../common/RatingStars'
import GetAvgRating from '../../../utils/avgRating'
import { Link } from 'react-router-dom'

const Course_Card = ({ course, Height }) => {

    //console.log("courses in the new tab ",course);
  const [avgReviewCount, setAvgReviewCount] = useState(0)

  useEffect(() => {
    const count = GetAvgRating(course.ratingAndReviews)
    setAvgReviewCount(count)
   // console.log("course",course);
  }, [course])

  return (
    <div className="bg-richblack-800   rounded-lg shadow-sm hover:shadow-richblack-100 transition-all duration-300">
      <Link to={`/courses/${course._id}`}>
        <div>
          {/* Thumbnail */}
          <div className="overflow-hidden rounded-t-lg">
            <img
              src={course?.thumbnail}
              alt="course thumbnail"
              className={`${Height} w-full object-cover rounded-t-lg`}
            />
          </div>

          {/* Content */}
          <div className="p-4 space-y-2">
            <h3 className="text-lg font-semibold text-white">
              {course?.Name}
            </h3>
            <p className="text-sm text-richblack-300">
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-x-3 text-yellow-100 text-sm">
              <span>{avgReviewCount || 0}</span>
              <RatingStars Review_Count={avgReviewCount} Star_Size={16} />
              <span className="text-richblack-400 text-xs">
                {course?.ratingAndReviews?.length} Ratings
              </span>
            </div>

            {/* Price */}
            <p className="text-yellow-100 font-medium text-base">
              ₹ {course?.price}
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Course_Card
