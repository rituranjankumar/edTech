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
        <form className='max-w-max w-full  ' onSubmit={handleSubmit(submitHandler)}>
            <div className='flex w-full gap-10 items-between -'>
                <div className='flex flex-col w-[50%] gap-2 '>
                    <label className='text-richblack-200' htmlFor='firstname'>First Name</label>
                    <input type='text' className="p-3 border border-richblack-200 rounded-l bg-richblack-700 text-white placeholder-richblack-400 focus:ring-2 focus:ring-richblack-300 focus:outline-none" placeholder='Enter your first name' id='firstname' {...register("firstname", { required: "first name is required " })} />
                    {errors.firstname && <p>{errors.firstname.message}</p>}

                </div>
                <div className='flex flex-col gap-2 w-[50%] '>
                    <label className='text-richblack-200' htmlFor='lastname'>Last Name</label>
                    <input type='text' className="p-3 border border-richblack-200 rounded-l bg-richblack-700 text-white placeholder-richblack-400 focus:ring-2 focus:ring-richblack-300 focus:outline-none" placeholder='Enter your last name' id='lastname' {...register("lastname", { required: "last name is required " })} />
                    {errors.lastname && <p>{errors.lastname.message}</p>}
                </div>


            </div>

            <div className='min-w-full   mt-4 flex flex-col gap-2'>
                <label className='text-richblack-200' htmlFor='email'>Email</label>
                <input type='email' className="p-3 border border-richblack-200 rounded-l bg-richblack-700 text-white placeholder-richblack-400 focus:ring-2 focus:ring-richblack-300 focus:outline-none" placeholder='Enter your email address' id='email' {...register("email", {
                    required: "email address is required "
                    , pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Invalid email format" }
                })} />
                {errors.email && <p>{errors.email.message}</p>}
            </div>


            <div className='min-w-full   mt-4 flex flex-col gap-2'>
                <label className='text-richblack-200' htmlFor='PhoneNumber'>Phone No.</label>
                <div className='flex justify-between items-center '>
                    <div className='bg-richblack-700 w-[15%] rounded p-1 flex'>
                        <select {...register("countrycode", { required: "enter the country code" })} className='bg-richblack-700 p-3 w-[100%]   border-gray-300 rounded-sm rounded-l'>
                            {countrycode.map((item, index) =>
                            (
                                <option key={index} value={item.code}>{item.code} ({item.country})</option>
                            ))}
                        </select>
                    </div>

                    <input id='phoneNumber' className="p-3 w-full border border-richblack-200 rounded-l bg-richblack-700 text-white placeholder-richblack-400 focus:ring-2 focus:ring-richblack-300 focus:outline-none" placeholder='Enter your phone number'  {...register("phoneNumber", { required: "enter your contact number " })} />

                    {errors.countrycode && <p className="text-red-500">{errors.countrycode.message}</p>}
                    {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber.message}</p>}
                </div>

                <div className='min-w-full   mt-4 flex flex-col gap-2'>
                    <label className='text-richblack-200' htmlFor='area'>Message</label>
                    <textarea
                        cols={30}
                        rows="5"
                        className="p-3 h-[180px] border border-richblack-200 rounded bg-richblack-700 text-white placeholder-richblack-400 focus:ring-2 focus:ring-richblack-300 focus:outline-none"
                        placeholder="Enter your message"
                        id="area"
                        {...register("message", { required: "Message is required" })}
                    ></textarea>
                    {errors.message && <p>{errors.message.message}</p>}
                </div>

                <button
                    type="submit"
                    className="mt-6 w-full p-3 rounded-[8px] bg-yellow-50  text-xl font-medium text-richblack-900"
                >
                    send message
                </button>
            </div>
        </form>
    )
}

export default ContactUsForm