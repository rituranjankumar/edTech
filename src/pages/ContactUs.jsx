import React from 'react'
import { IoMdChatbubbles } from "react-icons/io";
import { FaGlobeAfrica } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import Footer from "../components/common/Footer"
import ContactUsForm from '../components/ContactPage/ContactUsForm'
import ReviewSlider from '../components/common/ReviewSlider';
const ContactUs = () => {


 const contactUsHandler=(data)=>
  {
       
      console.log("contact us form submitted ",data)
  }
  return (
    <div className='flex flex-col justify-center items-start gap-10 md:gap-20 px-4 sm:px-6 lg:px-0'>
  <div className='flex flex-col lg:flex-row justify-center lg:justify-evenly items-start gap-10 p-6 sm:p-10 lg:p-14 w-full'>
    {/* Contact Info Box */}
    <div className='flex flex-col gap-5 p-6 sm:p-8 lg:p-10 rounded-lg w-full lg:min-w-fit bg-richblack-700'>
      <div className='flex gap-4 items-start'>
        <div className='text-richblack-50 text-lg sm:text-xl'>
          <IoMdChatbubbles />
        </div>
        <div className='text-richblack-50 flex flex-col items-start'>
          <h2 className='text-sm sm:text-base font-medium'>Chat with us</h2>
          <p className='text-xs text-richblack-100'>Our friendly team is here to help.</p>
          <p className='text-xs text-richblack-100'>@mail address</p>
        </div>
      </div>

      <div className='flex gap-4 items-start'>
        <div className='text-richblack-50 text-lg sm:text-xl'>
          <FaGlobeAfrica />
        </div>
        <div className='text-richblack-50 flex flex-col items-start'>
          <h2 className='text-sm sm:text-base font-medium'>Visit us</h2>
          <p className='text-xs text-richblack-100'>Come and say hello at our office HQ.</p>
          <p className='text-xs text-richblack-100'>Here is the location/ address</p>
        </div>
      </div>

      <div className='flex gap-4 items-start'>
        <div className='text-richblack-50 text-lg sm:text-xl'>
          <IoIosCall />
        </div>
        <div className='text-richblack-50 flex flex-col items-start'>
          <h2 className='text-sm sm:text-base font-medium'>Call us</h2>
          <p className='text-xs text-richblack-100'>Mon - Fri From 8am to 5pm</p>
          <p className='text-xs text-richblack-100'>+123 456 7890</p>
        </div>
      </div>
    </div>

    {/* Contact Form Section */}
    <div className='flex flex-col gap-3 text-richblack-50 w-full lg:w-auto'>
      <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold'>Got The idea? we have got the skills</h1>
      <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold'>Lets team up</h1>
      <p className='text-richblack-200 text-sm sm:text-base'>
        Tell us more about yourself and what you're got in mind
      </p>
      <div className='w-full'>
        <ContactUsForm onSubmit={contactUsHandler} />
      </div>
    </div>
  </div>

  {/* Reviews Section */}
  <div className='flex flex-col items-center text-white justify-center p-4 sm:p-5 w-full'>
    <h1 className='text-xl sm:text-2xl lg:text-3xl'>Reviews from courses</h1>
    <ReviewSlider/>
  </div>

  {/* Footer */}
  <div className='w-full'>
    <Footer />
  </div>
</div>
  )
}

export default ContactUs