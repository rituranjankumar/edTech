import React from 'react'
import HighlightText from './HighlightText'
import know_your_progress  from "../../../assets/Images/Know_your_progress.png"
import compare_with_others from "../../../assets/Images/Compare_with_others.png"
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png"
import CTAButton from "../HomePage/Button"

const LearningLanguageSection = () => {
  return (
    <div className='mt-[80px] md:mt-[100px] lg:mt-[130px] mb-20 md:mb-28 lg:mb-32'>
  <div className='flex flex-col gap-3 md:gap-4 lg:gap-5 items-center'>

    <div className='text-2xl md:text-3xl lg:text-4xl font-semibold text-center px-4 md:px-0'>
      Your Swiss Knife for
      <HighlightText text={" learning any language"} />
    </div>

    <div className='text-center text-richblack-600 mx-auto text-sm md:text-base font-medium w-[90%] md:w-[80%] lg:w-[70%] px-2 md:px-0'>
      Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
    </div>

    <div className='flex flex-row items-center justify-center mt-3 md:mt-4 lg:mt-5 w-full overflow-hidden px-4'>
      <img 
        src={know_your_progress}
        alt="KNowYourProgressImage"
        className='object-contain w-1/3 -mr-12 md:-mr-24 lg:-mr-32'
      />
      <img 
        src={compare_with_others}
        alt="KNowYourProgressImage"
        className='object-contain w-1/3'
      />
      <img 
        src={plan_your_lesson}
        alt="KNowYourProgressImage"
        className=' object-cover w-1/3 -ml-12 md:-ml-24 lg:-ml-36'
      />
    </div>

    <div className='w-fit mt-3 md:mt-4 lg:mt-5'>
      <CTAButton active={true} linkto={"/signup"}>
        <div className='text-xs md:text-sm lg:text-base'>
          Learn more
        </div>
      </CTAButton>
    </div>

  </div>
</div>
  )
}

export default LearningLanguageSection
