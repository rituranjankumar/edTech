import React from 'react'
import ContactUsForm from '../../ContactPage/ContactUsForm'

const ContactFormSection = () => {

  const submitHandler=(data)=>
  {
    console.log( "cutomer feedback in about page is ->",data)
  }


  return (
    <div className='mx-auto flex flex-col items-center justify-center'>
      <h1 className='text-5xl'>
        Get in Touch
      </h1>
      <p className='text-richblack-200 leading-4 my-6 '>
        We'd love to here for you, Please fill out this form.
      </p>
      <div>
        <ContactUsForm onSubmit={submitHandler} />
      </div>
    </div>
  )
}

export default ContactFormSection
