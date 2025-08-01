import React from 'react'
import { MdPeopleAlt } from "react-icons/md";
import { MdOutlineBalance } from "react-icons/md";
{/**key={index}
                    cardData = {element}
                    currentCard = {currentCard}
                    setCurrentCard = {setCurrentCard} */}
const CourseCard = ({cardData,currentCard,setCurrentCard}) => {

  return (
    <div className={`w-80  
    ${currentCard === cardData.heading 
    ? "bg-white shadow-yellow-300 shadow-md border-r-8 border-b-8 border-yellow-300"
    :"bg-richblack-800 text-richblack-5"
    } flex flex-col gap-5  shadow-lg rounded-2xl p-4 shadow-md`}>
      <div>
        <h2 className="text-xl font-semibold"> {cardData.heading}</h2>
      </div>
      <p className="text-sm text-gray-600 mt-2">
         {cardData.description}
      </p>

      <div className='flex flex-row justify-between items-center border-t border-dashed'>
        <div className='flex flex-row items-center p-2 gap-2  '>
           <MdPeopleAlt className="text-gray-700 "/>
             <p className=" text-sm font-medium  text-gray-700">{cardData.level}</p>
            
        </div>

        <div className='flex flex-row items-center gap-2 p-2 '>
            <MdOutlineBalance className="text-gray-700 "/>
             <p className=" text-sm font-medium text-gray-700">{cardData.lessionNumber} Lessons</p>
            
        </div>
      </div>
    </div>
  )
}

export default CourseCard


