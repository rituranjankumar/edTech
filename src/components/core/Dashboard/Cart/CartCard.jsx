import React, { useEffect, useState } from 'react'
import { apiConnector } from '../../../../services/apiconnector'
import { ratingsEndpoints } from '../../../../services/apis'
import ReactStars from "react-rating-stars-component";
import { GiNinjaStar } from "react-icons/gi"
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCartAPI } from '../../../../services/operations/CartApi';
import RatingStars from '../../../common/RatingStars';


export const CartCard = ({ course, index }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth)
  const [rating, setRating] = useState(null);

  const fetchAverageRating = async () => {
    try {
      const response = await apiConnector(
        "POST",
        ratingsEndpoints.AVERAGE_REVIEW_API,
        { courseId: course._id }
      );

      if (response?.data?.averageRating?.averageRating) {
        setRating(response.data.averageRating.averageRating.toFixed(1));
      } else if (typeof response?.data?.averageRating === 'number') {
        setRating(response.data.averageRating.toFixed(1));
      }
    } catch (error) {
      console.log("Error fetching average rating:", error?.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchAverageRating();
  }, [course._id]);

  return (
    <div className='flex flex-col  w-[90%] sm:flex-row justify-between    items-start sm:items-center bg-richblack-800 p-4 rounded-lg shadow-md   gap-4'>

      <div className="flex gap-4 items-start sm:items-center w-full lg:w-[75%] md:w-[80%]">
        <img src={course?.thumbnail} alt="course thumbnail" className="w-24 h-24 object-cover rounded-md border border-richblack-600" />
        <div className="flex flex-col  gap-1 text-richblack-100">
          <p className="text-lg font-semibold">{course?.Name}</p>
          <p className="text-sm text-richblack-400">{course.category.name}</p>
          <div className="text-sm text-richblack-300 mt-1">
            <p>Average Rating: {rating !== null ? rating : 'Loading...'}</p>
            <div className="flex items-center gap-2 mt-1">
              {/* <ReactStars
                  count={5}
                  value={parseFloat(rating) || 0}
                  size={20}
                  isHalf={true}
                  edit={false}
                  activeColor="#FFD700"
                  color="#3d3d3d"
                  emptyIcon={<GiNinjaStar />}
                  fullIcon={<GiNinjaStar />}
                  halfIcon={<GiNinjaStar />}
                /> */}
              <RatingStars Review_Count={parseFloat(rating) || 0} Star_Size={20} />

              <span className="text-sm text-richblack-50">{course?.ratingAndReviews?.length} Ratings</span>
            </div>
          </div>
        </div>
      </div>


      <div className="flex lg:w-[25%] flex-col items-end justify-between gap-2 sm:w-[30%]">
        <button
          onClick={() => dispatch(removeFromCartAPI(course._id, token))}
          className="flex items-center gap-1 text-red-400 hover:text-red-600 transition-colors duration-200 text-sm"
        >
          <RiDeleteBin6Line size={18} />
          <span>Remove</span>
        </button>
        <p className="text-lg font-bold text-green-400">₹{course?.price}</p>
      </div>
    </div>
  )
}
