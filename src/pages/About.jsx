import React from 'react'
import HighlightText from "../components/core/HomePage/HighlightText"
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import Quote from '../components/core/AboutPage/Quote'
import FoundingStory from "../assets/Images/FoundingStory.png"
import StatsComponent from '../components/core/AboutPage/Stats'
import LearningGrid from '../components/core/AboutPage/LearningGrid'
import ContactFormSection from '../components/core/AboutPage/ContactFormSection'
import Footer from '../components/common/Footer'
import ReviewSlider from '../components/common/ReviewSlider'

const About = () => {
    return (
      <div className='mx-auto flex flex-col justify-center items-center mt-[50px] md:mt-[80px] lg:mt-[100px] text-white px-4 sm:px-6 lg:px-0'>
  {/* Section 1 */}
  <section className='flex relative flex-col justify-center items-center w-full'>
    <div className='w-full'>
      <header className='flex mx-auto flex-col gap-2 md:gap-3 pb-8 md:pb-12 items-center text-xl sm:text-2xl lg:text-[36px] justify-center w-full lg:w-[800px]'>
        <h1 className='leading-7 md:leading-10 font-inter text-xl sm:text-2xl lg:text-[36px] text-center'>Driving Innovation in Online Education for a</h1>
        <HighlightText text={"Brighter Future"} />
        <p className='text-sm md:text-[16px] text-richblack-300 text-center w-full md:w-[90%] lg:w-full'>
          Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
        </p>
      </header>
      <div className='flex items-center pb-8 md:pb-12 gap-x-2 md:gap-x-3 mx-auto overflow-x-hidden w-full justify-center'>
        <img src={BannerImage1} alt='image' className='w-1/3 md:w-auto h-auto max-w-[300px]' />
        <img src={BannerImage2} alt='image' className='w-1/3 md:w-auto h-auto max-w-[300px]' />
        <img src={BannerImage3} alt='image' className='w-1/3 md:w-auto h-auto max-w-[300px]' />
      </div>
    </div>
  </section>

  {/* Section 2 */}
  <section className='w-full'>
    <div className='w-11/12 max-w-maxContent text-richblack-15 flex justify-center items-center text-center p-6 md:p-10 gap-[10px]'>
      <Quote />
    </div>
  </section>

  {/* Section 3 */}
  <section className='w-11/12 max-w-maxContent'>
    <div className='flex flex-col justify-center items-center gap-5 p-4 md:p-10 text-richblack-200'>
      {/* Founding story div */}
      <div className='flex flex-col lg:flex-row items-center gap-8 justify-between w-full'>
        {/* Left box */}
        <div className='flex flex-col gap-4 w-full lg:w-[50%]'>
          <h1 className="bg-gradient-to-r w-fit bg-clip-text text-transparent bg-blend-color from-[#833AB4] via-[#FD1D1D] to-[#FCB045] font-inter font-semibold text-2xl sm:text-3xl lg:text-4xl leading-normal lg:leading-[44px] tracking-[-0.02em]">
            Our Founding Story
          </h1>
          <p className='w-full lg:w-[470px] text-richblack-10'>
            Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
          </p>
          <p className='w-full lg:w-[470px] text-richblack-10'>
            As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
          </p>
        </div>
        {/* Right box */}
        <div className='w-full lg:w-[50%] mt-6 lg:mt-0'>
          <img className='w-full h-auto' src={FoundingStory} alt='Founding Story' />
        </div>
      </div>

      {/* Vision and mission div */}
      <div className='flex flex-col lg:flex-row items-center justify-between w-full gap-8 mt-8'>
        {/* Left Box */}
        <div className='flex flex-col gap-4 w-full lg:w-[470px] p-4 md:p-10 bg-richblack-800 rounded-lg'>
          <h1 className="bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-transparent font-inter font-semibold text-2xl sm:text-3xl lg:text-4xl leading-normal lg:leading-[44px] tracking-[-0.02em] w-fit">
            Our Vision
          </h1>
          <p className='text-richblack-10'>
            With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
          </p>
        </div>

        {/* Right Box */}
        <div className='flex flex-col gap-4 w-full lg:w-[470px] p-4 md:p-10 bg-richblack-800 rounded-lg'>
          <h1 className='text-yellow-500 font-inter font-semibold text-2xl sm:text-3xl lg:text-4xl leading-normal lg:leading-[44px] tracking-[-0.02em]'>
            Our Mission
          </h1>
          <p className="text-richblack-10">
            Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
          </p>
        </div>
      </div>
    </div>
  </section>

  {/* Section 4 */}
  <StatsComponent />

  {/* Section 5 */}
  <section className='mx-auto mt-[50px] md:mt-[80px] lg:mt-[100px] flex flex-col items-center justify-between gap-5 mb-[70px] md:mb-[100px] lg:mb-[140px] w-full px-4 sm:px-6 lg:px-0'>
    <LearningGrid />
    <ContactFormSection />
  </section>

  <section className='w-full px-4 sm:px-6 lg:px-0'>
    <div className='text-center text-xl md:text-2xl font-semibold mb-6'>
      Reviews from other learners
    </div>
    <ReviewSlider /> 
  </section>

  <div className='w-full'>
    <Footer/>
  </div>
</div>
    )
}

export default About
