import React, { useState } from 'react'
import { CartCard } from './CartCard';
import { useSelector } from 'react-redux';

const RenderCartCourses = () => {
  const { cart } = useSelector((state) => state.cart); // fixed from state.auth
  const [rating, setRating] = useState(null);

  return (
    <div className='text-white w-full flex flex-col gap-4'> 
      {cart.map((course, index) => (
        <div key={index}>
          <CartCard course={course} index={index} />
        </div>
      ))}
    </div>
  )
}

export default RenderCartCourses;
