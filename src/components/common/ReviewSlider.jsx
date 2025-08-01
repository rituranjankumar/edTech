import React, { useEffect, useState } from 'react'
import { Navigation, Pagination, Scrollbar, A11y, FreeMode, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import RatingStars from './RatingStars';
import { ratingsEndpoints } from '../../services/apis';
import { apiConnector } from '../../services/apiconnector';
import { FaStar } from 'react-icons/fa';

const ReviewSlider = () => {

    const [reviews, setReviews] = useState([]);

    const fetchReviews = async () => {
        const response = await apiConnector("GET", ratingsEndpoints.REVIEWS_DETAILS_API);

        if (response?.data?.data) {
            setReviews(response?.data?.data);
        }
    }

    console.log("reviews in the home page ", reviews);

    useEffect(() => {
        fetchReviews();
    }, [])

    if(reviews.length===0)
    {
        return (
            <div className='flex items-center justify-center p-5'>
                <p className='text-xl text-white'>No reviews found</p>
            </div>
        )
    }
    return (
        <div className='text-white mt-5 px-2 sm:px-4'>
  <div className='h-[190px] max-w-maxContent mx-auto'>
    <Swiper
      slidesPerView={1.2}
      breakpoints={{
        640: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
      }}
      spaceBetween={16}
      loop={true}
      freeMode={true}
      autoplay={{
        delay: 2500,
      }}
      modules={[FreeMode, Pagination, Autoplay]}
      className='w-full'
    >
      {
        reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className='bg-richblack-800 p-3 sm:p-4 rounded-md shadow-md h-full flex flex-col gap-2'>
              <div className='flex items-center gap-2 sm:gap-3'>
                <img
                  src={review?.user?.image}
                  alt='Profile Pic'
                  className='h-8 w-8 sm:h-9 sm:w-9 object-cover rounded-full'
                />
                <div className='text-xs sm:text-sm font-semibold'>
                  {review?.user?.firstName} {review?.user?.lastName}
                </div>
              </div>
              <p className='text-yellow-50 text-xs font-medium'>{review?.course?.Name}</p>
              <p className='text-richblack-5 text-xs sm:text-sm line-clamp-3'>{review?.review}</p>
              <div className='flex items-center gap-1 sm:gap-2'>
                <span className='text-yellow-100 font-bold text-xs sm:text-sm'>
                  {review?.rating.toFixed(1)}
                </span>
                <RatingStars Review_Count={review?.rating} Star_Size={20} />
              </div>
            </div>
          </SwiperSlide>
        ))
      }
    </Swiper>
  </div>
</div>

    )
}

export default ReviewSlider;
