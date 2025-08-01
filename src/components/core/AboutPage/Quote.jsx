import React from 'react'
import HighlightText from '../HomePage/HighlightText'

const Quote = () => {
  return (
   <div className="font-inter font-semibold text-xl xs:text-2xl sm:text-3xl lg:text-4xl leading-[1.2] xs:leading-[1.3] sm:leading-[1.4] lg:leading-[52px] tracking-[-0.02em] text-center px-4 sm:px-6 lg:px-0">
  We are passionate about revolutionizing the way we learn. Our innovative platform
  <HighlightText text={"combines technology"} />
  <span className="text-brown-500 font-bold"> expertise</span>, and community to create an
  <span className="text-brown-500"> unparalleled educational experience.</span>
</div>
  )
}

export default Quote
