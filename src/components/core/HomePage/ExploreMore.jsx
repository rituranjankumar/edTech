import React from 'react'
import  {HomePageExplore} from "../../../data/homepage-explore"
import HighlightText from './HighlightText';
import { useState } from 'react';
import CourseCard from './CourseCard';

const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skill paths",
    "Career paths",
];

const ExploreMore = () => {

    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading)

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }

   // console.log("current tab -> ",currentTab);

   // console.log("current course -> ",courses);
   // console.log("current card -> ",currentCard);

  return (
   <div className=" ">
  {/* Header Section */}
  <div className='text-2xl sm:text-3xl lg:text-4xl font-semibold text-center'>
    Unlock the 
    <HighlightText text={"Power of Code"} />
  </div>

  <p className='text-center text-richblack-300 text-sm sm:text-[16px] mt-2 sm:mt-3'>
    Learn to build anything you can imagine
  </p>  

  {/* Tabs Navigation */}
  <div className=' mt-4 sm:mt-5 hidden sm:flex  sm:flex-row md:flex-row rounded-full bg-richblack-800 mb-4 sm:mb-5 border-richblack-100 px-1 py-1 w-full sm:w-auto sm:max-w-max mx-auto overflow-x-auto sm:overflow-visible'>
    {
      tabsName.map((element, index) => {
        return (
          <div
            className={`text-sm sm:text-[16px] flex flex-row items-center justify-center gap-1 sm:gap-2 
            ${currentTab === element 
              ? "bg-richblack-900 text-richblack-5 font-medium"
              : "text-richblack-200"} 
            rounded-full transition-all duration-200 cursor-pointer
            hover:bg-richblack-900 hover:text-richblack-5 px-3 sm:px-7 py-1 sm:py-2 min-w-max`}
            key={index}
            onClick={() => setMyCards(element)}
          >
            {element}
          </div>
        )
      })
    }
  </div>

  {/* Spacer */}
  <div className='h-[50px] sm:h-[100px] lg:h-[150px]'></div>  

  {/* Course Cards Group */}
  <div className='bg-white rounded-xl sm:flex-col md:flex-row lg:flex-row xl:flex-row flex-wrap sm:left-[-30px]   bottom-[-80px] sm:bottom-[-120px] text-richblack-900 p-2 sm:p-4 flex flex-col xs:flex-row gap-3 sm:gap-5 lg:gap-10 justify-between w-full overflow-x-auto'>
    {
      courses?.map((element, index) => {
        return (
          <CourseCard 
            key={index}
            cardData={element}
            currentCard={currentCard}
            setCurrentCard={setCurrentCard}
          />
        )
      })
    }
  </div>
</div>
  )
}

export default ExploreMore
