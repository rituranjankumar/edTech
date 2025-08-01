import React from 'react'
import { useNavigate } from 'react-router-dom'


const Error = () => {
  const navigate=useNavigate();
  return (
    <div className='flex flex-col justify-center items-center min-h-screen bg-richblack-900 gap-4 p-4 text-center'>
      <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold text-red-500'>
        404
      </h1>
      <p className='text-lg sm:text-xl md:text-2xl text-richblack-50'>
        Page Not Found
      </p>
      <p className='text-sm sm:text-base text-richblack-200 max-w-md'>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <button 
        className='mt-6 px-6 py-2 bg-yellow-50 text-richblack-900 rounded-lg font-medium hover:bg-yellow-100 transition-colors duration-200'
        onClick={() =>  navigate(-1)}
      >
        Go Back
      </button>
    </div>
  )
}

export default Error