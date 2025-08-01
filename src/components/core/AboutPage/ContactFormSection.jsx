import React from 'react'
import ContactUsForm from '../../ContactPage/ContactUsForm'

const ContactFormSection = () => {

  const submitHandler=(data)=>
  {
    console.log( "cutomer feedback in about page is ->",data)
  }


  return (
   <div className="w-full min-h-screen flex flex-col items-center justify-center px-4 sm:px-0">
  <h1 className="text-4xl sm:text-5xl font-semibold text-center text-richblack-5">
    Get in Touch
  </h1>
  
  <p className="text-richblack-200 text-center text-base sm:text-lg mt-4 mb-8 max-w-md">
    We'd love to hear from you. Please fill out the form below.
  </p>
  
  <div className="w-full max-w-2xl">
    <ContactUsForm onSubmit={submitHandler} />
  </div>
</div>

  )
}

export default ContactFormSection
