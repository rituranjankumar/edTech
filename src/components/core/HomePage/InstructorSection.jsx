import React from 'react'
import Instructor from "../../../assets/Images/Instructor.png"
import HighlightText from './HighlightText'
import CTAButton from "../HomePage/Button"
import { FaArrowRight } from 'react-icons/fa'

const InstructorSection = () => {
  return (
    <div className='mt-10 sm:mt-14 md:mt-16'>
  <div className='flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-20 items-center'>

    {/* Image Section */}
    <div className='w-full lg:w-[50%] px-4 sm:px-0'>
      <img
        src={Instructor}
        alt="Instructor"
        className='shadow-white w-full max-w-[500px] mx-auto lg:mx-0'
      />
    </div>

    {/* Content Section */}
    <div className='w-full lg:w-[50%] flex flex-col gap-6 md:gap-8 lg:gap-10 px-4 sm:px-0'>
      <div className='text-2xl sm:text-3xl lg:text-4xl font-semibold w-full lg:w-[50%]'>
        Become an
        <HighlightText text={"Instructor"} />
      </div>

      <p className='font-medium text-sm sm:text-[15px] lg:text-[16px] w-full lg:w-[80%] text-richblack-300'>
        Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
      </p>

      <div className='w-full lg:w-fit'>
        <CTAButton active={true} linkto={"/signup"}>
          <div className='flex flex-row gap-1 sm:gap-2 items-center justify-center text-xs sm:text-sm md:text-base'>
            Start Learning Today
            <FaArrowRight className='text-xs sm:text-sm' />
          </div>
        </CTAButton>
      </div>
    </div>

  </div>
</div>
  )
}

export default InstructorSection
