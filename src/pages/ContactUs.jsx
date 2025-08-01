import React from 'react'
import { IoMdChatbubbles } from "react-icons/io";
import { FaGlobeAfrica } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import Footer from "../components/common/Footer"
import ContactUsForm from '../components/ContactPage/ContactUsForm'
const ContactUs = () => {


 const contactUsHandler=(data)=>
  {
       
      console.log("contact us form submitted ",data)
  }
  return (
    <div className=' flex-col justify-center items-start  gap-20 '>
     
     <div className='  flex justify-evenly items-start p-14 gap-20'>

       <div className='flex flex-col gap-5 p-10 rounded-lg min-w-fit bg-richblack-700'>

        <div className='flex gap-4 items-start'> 
          <div className='text-richblack-50'>
            <IoMdChatbubbles />
          </div>
          <div className='text-richblack-50 flex -translate-y-1 flex-col items-start '>

            <h2>Chat with us</h2>
            <p className='text-xs text-richblack-100'>Our friendly team is here to help.</p>
            <p  className='text-xs text-richblack-100'>@mail address</p>
          </div>
        </div>


        <div className='flex gap-4 items-start'> 
          <div className='text-richblack-50'>
          <FaGlobeAfrica />
          </div>
          <div className='text-richblack-50 flex -translate-y-1 flex-col items-start '>

            <h2>Visit us</h2>
            <p className='text-xs text-richblack-100'>Come and say hello at our office HQ.</p>
            <p  className='text-xs text-richblack-100'>Here is the location/ address</p>
          </div>
        </div>

       <div className='flex gap-4 items-start '> 
          <div className='text-richblack-50'>
            <IoIosCall />
          </div>
          <div className='text-richblack-50 flex -translate-y-1 flex-col items-start'>

            <h2>Call us</h2>
            <p className='text-xs text-richblack-100'>Mon - Fri From 8am to 5pm</p>
            <p  className='text-xs text-richblack-100'>+123 456 7890</p>
          </div>
        </div>

      </div>


      <div className='flex flex-col gap-3 text-richblack-50  '>
        <h1 className='text-4xl font-bold'>Got The idea? we have got the skills</h1>
        <h1 className='text-4xl font-bold'>Lets team up</h1>
        <p className='text-richblack-200'>Tell us more about yourself and what  you're got in mind</p>
        <div   >
          <ContactUsForm onSubmit={contactUsHandler}></ContactUsForm>
        </div>
      </div>

     </div>


      <div className='flex items-center text-white justify-center p-5'>

        <h1 className='text-3xl'>Reviews from courses </h1>
      </div>

      <div className='min-w-full'>
        <Footer/>
      </div>
    </div>
  )
}

export default ContactUs