import React from 'react'
import CTAButton from "../HomePage/Button"
import HighlightText from './HighlightText'
import {FaArrowRight} from "react-icons/fa"
import { TypeAnimation } from 'react-type-animation'

const CodeBlocks = ({
    position, heading, subheading, ctabtn1, ctabtn2, codeblock, backgroudGradient, codeColor
}) => {
  return (
    <div className={`flex ${position} flex-col lg:flex-row my-10 sm:my-14 lg:my-20 justify-between gap-6 sm:gap-8 lg:gap-10`}>
      
    {/* Section 1 - Content */}
    <div className='w-full lg:w-[50%] flex flex-col gap-5 sm:gap-6 lg:gap-8'>
        {heading}
        <div className='text-richblack-300 text-sm sm:text-base font-bold'>
            {subheading}
        </div>

        <div className='flex flex-col xs:flex-row gap-3 sm:gap-5 lg:gap-7 mt-5 sm:mt-6 lg:mt-7'>
            <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                <div className='flex gap-1 sm:gap-2 items-center text-xs sm:text-sm lg:text-base'>
                    {ctabtn1.btnText}
                    <FaArrowRight className="text-xs sm:text-sm"/>
                </div>
            </CTAButton>

            <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>  
                <span className='text-xs sm:text-sm lg:text-base'>
                    {ctabtn2.btnText}
                </span>
            </CTAButton>
        </div>
    </div>

    {/* Section 2 - Code Block */}
    <div className='w-full h-fit relative flex flex-row text-[10px] sm:text-xs lg:text-sm py-3 sm:py-4 lg:py-4 lg:w-[500px] border-t-2 border-l-2 border-richblack-400 rounded-2xl mt-8 sm:mt-10 lg:mt-0'> 
        {/* Background gradient */}
        <div className="absolute top-[-8px] sm:top-[-10px] left-[-10px] sm:left-[-12px] inset-0 bg-gradient-to-br from-blue-400 to-richblack-500 blur-xl sm:blur-2xl opacity-30 rounded-full"></div>
        
        {/* Line numbers */}
        <div className='text-center flex flex-col w-[12%] sm:w-[10%] text-richblack-400 font-inter font-bold text-xs sm:text-sm'>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
        </div>

        {/* Code content */}
        <div className="relative w-[88%] sm:w-[90%] flex flex-col gap-1 sm:gap-2 font-bold font-mono pr-2 text-yellow-300 rounded-lg overflow-hidden">
            <TypeAnimation
                sequence={[codeblock, 2000, ""]}
                repeat={Infinity}
                cursor={true}
                style={{
                    whiteSpace: "pre-line",
                    display: "block",
                    fontSize: "inherit"
                }}
                omitDeletionAnimation={true}
            />
        </div>
    </div>
</div>
  )
}

export default CodeBlocks
