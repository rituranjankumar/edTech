import React from 'react'

import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timelineImage from "../../../assets/Images/TimelineImage.png"

const timeline = [
    {
        Logo: Logo1,
        heading: "Leadership",
        Description: "Guiding teams with vision, integrity, and accountability to drive collective success.",
    },
    {
        Logo: Logo2,
        heading: "Responsibility",
        Description: "Upholding our duties with reliability and commitment across every task and goal.",
    },
    {
        Logo: Logo3,
        heading: "Flexibility",
        Description: "Adapting swiftly to change and fostering innovation through a dynamic mindset.",
    },
    {
        Logo: Logo4,
        heading: "Solve the problem",
        Description: "Approaching challenges with critical thinking and delivering effective, lasting solutions.",
    },
];


const TimelineSection = () => {
  return (
   <div className="relative">
  <div className='flex flex-col lg:flex-row gap-8 lg:gap-15 items-center'>

    {/* Timeline Section */}
    <div className="w-full lg:w-[45%] flex flex-col gap-3 md:gap-5 px-4 lg:px-0">
      {timeline.map((element, index) => (
        <div className="flex flex-row gap-4 md:gap-6 items-start" key={index}>
          {/* Left Section: Image + Dotted Line */}
          <div className="relative flex flex-col items-center">
            {/* Image Container */}
            <div className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] bg-white flex items-center justify-center border border-gray-300 rounded-full">
              <img src={element.Logo} className="w-[20px] h-[20px] md:w-[30px] md:h-[30px]" />
            </div>

            {/* Dotted Line (Only if it's NOT the last item) */}
            {index !== timeline.length - 1 && (
              <div className="w-[2px] h-12 md:h-16 border-l-2 border-dotted border-gray-400"></div>
            )}
          </div>

          {/* Right Section: Text Content */}
          <div>
            <h2 className="font-semibold text-base md:text-[18px]">{element.heading}</h2>
            <p className="text-sm md:text-base">{element.Description}</p>
          </div>
        </div>
      ))}
    </div>

    {/* Image Section */}
    <div className='relative w-full lg:w-auto shadow-blue-200 mt-8 lg:mt-0'>
      <img 
        src={timelineImage}
        alt="timelineImage"
        className='shadow-white object-cover w-full h-auto max-w-[600px] mx-auto'
      />

      {/* Stats Overlay */}
      <div className='absolute bg-caribbeangreen-700 flex flex-col sm:flex-row text-white uppercase py-4 sm:py-7
                      left-[50%] translate-x-[-50%] translate-y-[-50%] w-[90%] sm:w-auto'>
        <div className='flex flex-row gap-3 sm:gap-5 items-center border-b sm:border-r border-caribbeangreen-300 px-4 sm:px-7 pb-3 sm:pb-0'>
          <p className='text-2xl sm:text-3xl font-bold'>10</p>
          <p className='text-caribbeangreen-300 text-xs sm:text-sm'>Years of Experience</p>
        </div>

        <div className='flex gap-3 sm:gap-5 items-center px-4 sm:px-7 pt-3 sm:pt-0'>
          <p className='text-2xl sm:text-3xl font-bold'>250</p>
          <p className='text-caribbeangreen-300 text-xs sm:text-sm'>Type of Courses</p>
        </div>
      </div>
    </div>

  </div>
</div>
  )
}

export default TimelineSection
