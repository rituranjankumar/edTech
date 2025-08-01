import React, { useEffect, useState } from 'react'
import { toast } from "react-hot-toast"
import { useForm } from "react-hook-form"
import { countrycode } from "../../data/countrycode"
import Button from '../core/HomePage/Button'
import { apiConnector } from '../../services/apiconnector'
import { contactusEndpoint } from '../../services/apis'
import { useSelector } from 'react-redux'
const ContactUsForm = ({ onSubmit }) => {

    const token = useSelector((state) => {
        return state.auth.token
    })

    console.log("contact token -> ", token)

    const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm();
    const [loading, setLoading] = useState(false);


    const submitHandler = async (data) => {
        console.log("message data -> ", data)
       // data.token=token;
        //sending the data to parent (contact section)
        onSubmit(data);

        try {
            setLoading(true);
            const headers = {
                Authorization: `Bearer ${token}`
            };
            const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data, headers);
            console.log("logging response in contsct us -> ", response)

            setLoading(false)
            toast.success("message send")
        }
        catch (error) {
            toast.error("message not send")
            console.log("error in contact us form ", error)
        }



    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            // reset({
            //     email:"",
            //     firstname:"",
            //     lastname:"",
            //     message:"",
            //     phoneNumber:"",

            // })
        }
    }, [isSubmitSuccessful])
    return (
       <form className='w-full max-w-maxContent mx-auto px-2 sm:px-4' onSubmit={handleSubmit(submitHandler)}>
  {/* First & Last Name */}
  <div className='flex flex-col sm:flex-row w-full gap-4 sm:gap-10 items-stretch mt-2'>
    <div className='flex flex-col w-full sm:w-1/2 gap-2'>
      <label className='text-richblack-200' htmlFor='firstname'>First Name</label>
      <input
        type='text'
        id='firstname'
        placeholder='Enter your first name'
        className="p-3 border border-richblack-200 rounded bg-richblack-700 text-white placeholder-richblack-400 focus:ring-2 focus:ring-richblack-300 focus:outline-none"
        {...register("firstname", { required: "first name is required " })}
      />
      {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname.message}</p>}
    </div>

    <div className='flex flex-col w-full sm:w-1/2 gap-2'>
      <label className='text-richblack-200' htmlFor='lastname'>Last Name</label>
      <input
        type='text'
        id='lastname'
        placeholder='Enter your last name'
        className="p-3 border border-richblack-200 rounded bg-richblack-700 text-white placeholder-richblack-400 focus:ring-2 focus:ring-richblack-300 focus:outline-none"
        {...register("lastname", { required: "last name is required " })}
      />
      {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname.message}</p>}
    </div>
  </div>

  {/* Email */}
  <div className='w-full mt-4 flex flex-col gap-2'>
    <label className='text-richblack-200' htmlFor='email'>Email</label>
    <input
      type='email'
      id='email'
      placeholder='Enter your email address'
      className="p-3 border border-richblack-200 rounded bg-richblack-700 text-white placeholder-richblack-400 focus:ring-2 focus:ring-richblack-300 focus:outline-none"
      {...register("email", {
        required: "email address is required",
        pattern: {
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message: "Invalid email format"
        }
      })}
    />
    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
  </div>

  {/* Phone Number */}
  <div className='w-full mt-4 flex flex-col gap-2'>
    <label className='text-richblack-200' htmlFor='PhoneNumber'>Phone No.</label>
    <div className='flex flex-col sm:flex-row gap-3 items-stretch'>
      <div className='bg-richblack-700 sm:w-[25%] w-full rounded'>
        <select
          {...register("countrycode", { required: "enter the country code" })}
          className='bg-richblack-700 p-3 w-full border border-richblack-200 rounded text-white'
        >
          {countrycode.map((item, index) => (
            <option key={index} value={item.code}>
              {item.code} ({item.country})
            </option>
          ))}
        </select>
      </div>

      <input
        id='phoneNumber'
        placeholder='Enter your phone number'
        className="p-3 w-full border border-richblack-200 rounded bg-richblack-700 text-white placeholder-richblack-400 focus:ring-2 focus:ring-richblack-300 focus:outline-none"
        {...register("phoneNumber", { required: "enter your contact number" })}
      />
    </div>
    {errors.countrycode && <p className="text-red-500 text-sm">{errors.countrycode.message}</p>}
    {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
  </div>

  {/* Message */}
  <div className='w-full mt-4 flex flex-col gap-2'>
    <label className='text-richblack-200' htmlFor='area'>Message</label>
    <textarea
      id="area"
      cols={30}
      rows="5"
      placeholder="Enter your message"
      className="p-3 h-[180px] border border-richblack-200 rounded bg-richblack-700 text-white placeholder-richblack-400 focus:ring-2 focus:ring-richblack-300 focus:outline-none"
      {...register("message", { required: "Message is required" })}
    ></textarea>
    {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
  </div>

  {/* Submit Button */}
  <button
    type="submit"
    className="mt-6 w-full p-3 rounded-[8px] bg-yellow-50 text-xl font-medium text-richblack-900"
  >
    Send Message
  </button>
</form>

    )
}

export default ContactUsForm