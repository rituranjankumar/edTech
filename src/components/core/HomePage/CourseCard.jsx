import React from 'react'
import { MdPeopleAlt } from "react-icons/md";
import { MdOutlineBalance } from "react-icons/md";
{/**key={index}
                    cardData = {element}
                    currentCard = {currentCard}
                    setCurrentCard = {setCurrentCard} */}
const CourseCard = ({cardData,currentCard,setCurrentCard}) => {

  return (
    <div className={`w-full xs:w-72 sm:w-80  
    ${currentCard === cardData.heading 
    ? "bg-white shadow-yellow-300 shadow-md border-r-4 sm:border-r-8 border-b-4 sm:border-b-8 border-yellow-300"
    : "bg-richblack-800 text-richblack-5"
    } flex flex-col gap-3 sm:gap-5 shadow-lg rounded-xl sm:rounded-2xl p-3 sm:p-4`}>
      
    <div>
        <h2 className="text-lg sm:text-xl font-semibold">
            {cardData.heading}
        </h2>
    </div>
    
    <p className={`text-xs sm:text-sm ${
        currentCard === cardData.heading ? "text-gray-600" : "text-richblack-300"
    } mt-1 sm:mt-2`}>
        {cardData.description}
    </p>

    <div className='flex flex-row justify-between items-center border-t border-dashed pt-2 sm:pt-3'>
        <div className='flex flex-row items-center p-1 sm:p-2 gap-1 sm:gap-2'>
            <MdPeopleAlt className="text-gray-700 text-sm sm:text-base"/>
            <p className="text-xs sm:text-sm font-medium text-gray-700">
                {cardData.level}
            </p>
        </div>

        <div className='flex flex-row items-center gap-1 sm:gap-2 p-1 sm:p-2'>
            <MdOutlineBalance className="text-gray-700 text-sm sm:text-base"/>
            <p className="text-xs sm:text-sm font-medium text-gray-700">
                {cardData.lessionNumber} Lessons
            </p>
        </div>
    </div>
</div>
  )
}

export default CourseCard


