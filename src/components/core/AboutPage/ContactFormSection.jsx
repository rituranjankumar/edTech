import React from 'react'
import ContactUsForm from '../../ContactPage/ContactUsForm'

const ContactFormSection = () => {

  const submitHandler=(data)=>
  {
    console.log( "cutomer feedback in about page is ->",data)
  }


  return (
   <div className="w-full flex-col flex-1 max-w-maxContent mx-auto   px-0 xs:px-0 md:px-2">
  <h1 className="text-4xl text-wrap sm:text-5xl font-semibold text-center text-richblack-5">
    Get in Touch
  </h1>
  
  <p className="text-richblack-200 text-wrap text-center text-base sm:text-lg mt-4 mb-8 max-w-md">
    We'd love to hear from you. Please fill out the form below.
  </p>
  
  <div className="w-full  max-w-2xl">
    <ContactUsForm onSubmit={submitHandler} />
  </div>
</div>

  )
}

export default ContactFormSection
