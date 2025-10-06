import React from 'react'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { FaStarOfLife } from "react-icons/fa6";
import { countrycode } from '../../../../data/countrycode';
import { settingsEndpoints } from '../../../../services/apis';
import { apiConnector } from '../../../../services/apiconnector';
import { setUser } from '../../../../slices/profileSlice';
import toast from 'react-hot-toast';
const UpdateProfile = () => {

  const { user } = useSelector((state) => state.profile);

  const {token}=useSelector((state)=> state.auth);
const dispatch=useDispatch();


  const convertToISO = (dateStr) => {
  if (!dateStr || typeof dateStr !== "string") return "";
  const parts = dateStr.split("/");
  if (parts.length !== 3) return "";
  const [dd, mm, yyyy] = parts;
  return `${yyyy}-${mm}-${dd}`;
}

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      countrycode:user?.additionalDetails?.countrycode || "",
      DisplayName: `${user?.firstName} ${user?.lastName}`,
      profession: `${user?.accountType}`,
      dateOfBirth:user?.additionalDetails?.dateOfBirth? convertToISO(user?.additionalDetails?.dateOfBirth):"",
      gender: user?.additionalDetails?.gender,
      contactNumber: user?.additionalDetails?.contactNumber,
      about: user?.additionalDetails?.about
    }
  })
  console.log(user,'user');
//  console.log(convertToISO(user?.additionalDetails?.dateOfBirth) )
  useEffect(() => {
  if (user) {
    reset({
    //  countrycode:`${user?.additionalDetails?.countrycode}`?`${user?.additionalDetails?.countrycode}`:"",
    countrycode:`${user?.additionalDetails?.countrycode}`||"",
      DisplayName: `${user.firstName} ${user.lastName}`,
      profession: user.accountType,
      dateOfBirth: user?.additionalDetails?.dateOfBirth? convertToISO(user?.additionalDetails?.dateOfBirth):"",
      gender: user.additionalDetails?.gender || "",
      contactNumber: user.additionalDetails?.contactNumber || "",
      about: user.additionalDetails?.about || "",
    });
  }
}, [user, reset]);
  const updateHandler = async (data) => {
  //  console.log("update profile data -> ", data);
  //console.log("token in update profile ",token)
    try{
     const  headers={
                authorization: `Bearer ${token}`

              }
          const response=await apiConnector('PUT',settingsEndpoints.UPDATE_PROFILE_API,data,headers  )
         
      //    console.log("upated user ",response.data.userProfile);
           
          if (response.data.userProfile) {
      dispatch(setUser(response.data.userProfile));
      localStorage.setItem("user", JSON.stringify(response.data.userProfile));
      toast.success("profile updated");
      reset(data); // reset form with updated values
    }

    }catch(error)
    {
      toast.error("failed to updated profile")
        console.log("error in upadating the data ",error.message)
    }
  }

  return (
    <div className='p-6 max-w-4xl mx-auto bg-richblack-800 rounded-lg shadow-md'>
  <p className='text-richblack-200 text-xl font-semibold mb-6'>Profile Picture</p>

  <div className="flex gap-6">
    
    <form
      onSubmit={handleSubmit(updateHandler)}
      className="grid md:grid-rows-3 md:grid-cols-2 grid-cols-1 gap-6 max-w-4xl w-full"
    >
      {/* Display Name */}
      <div className="md:col-span-1">
        <label htmlFor='name' className='block text-sm font-medium text-richblack-200 mb-1'>Display Name</label>
        <input
          id='name'
          {...register("DisplayName" ,{required: "Display name is required"})}
          className='w-full p-3 rounded-md bg-richblack-700 border border-richblack-600 text-white placeholder-richblack-400 focus:outline-none focus:ring-2 focus:ring-yellow-500'
        />
        {errors.DisplayName && <span className='text-red-500 text-sm'>{errors.DisplayName.message}</span>}
      </div>

      {/* Profession */}
      <div className="md:col-span-1">
        <label
          htmlFor='profession'
          className='block text-sm font-medium text-richblack-200 mb-2'
        >
          Profession
        </label>
        <select
          id="profession"
          {...register("profession")}
          className="w-full p-3 rounded-md bg-richblack-700 border border-richblack-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          <option value={user?.accountType}>{user?.accountType}</option>
        </select>

        {errors.profession && (
          <span className='text-red-500 text-sm mt-1 block'>
            {errors.profession.message}
          </span>
        )}
      </div>

      {/* Date of Birth */}
      <div className="md:col-span-1">
        <label htmlFor='birthdate' className='block text-sm font-medium text-richblack-200 mb-1'>Date Of Birth</label>
        <input
          type='date'
          id='birthdate'
          max={new Date().toISOString().split("T")[0]}
          {...register("dateOfBirth")}
          className='w-full p-3 rounded-md bg-richblack-700 cursor-pointer border border-richblack-600 text-white'
        />
        {errors.dateOfBirth && <span className='text-red-500 text-sm'>{errors.dateOfBirth.message}</span>}
      </div>

      {/* Gender */}
      <div className="md:col-span-1 bg-richblack-700 p-4 rounded-md">
        <p className='text-sm font-medium text-richblack-200 mb-3 flex items-center gap-2'>
          Gender <FaStarOfLife color='red' size={10} />
        </p>
        <div className='flex flex-wrap gap-4 md:gap-8'>
          <label className="flex items-center gap-3 text-richblack-100 cursor-pointer">
            <input
              type="radio"
              value="Male"
              {...register("gender", { required: "Please select your gender" })}
              className='accent-yellow-500 w-6 h-6'
            />
            Male
          </label>

          <label className="flex items-center gap-3 text-richblack-100 cursor-pointer">
            <input
              type="radio"
              value="Female"
              {...register("gender",{ required: "Please select your gender" })}
              className='accent-yellow-500 w-6 h-6'
            />
            Female
          </label>

          <label className="flex items-center gap-3 text-richblack-100 cursor-pointer">
            <input
              type="radio"
              value="other"
              {...register("gender", { required: "Please select your gender" })}
              className='accent-yellow-500 w-6 h-6'
            />
            Other
          </label>
        </div>
      </div>

      {/* Phone Number */}
      <div className="md:col-span-1">
        <label htmlFor='PhoneNumber' className='block text-sm font-medium text-richblack-200 mb-1'>Phone No.</label>
        <div className='flex flex-col sm:flex-row gap-2 items-center'>
          <div className='bg-richblack-700 w-full sm:w-[30%] rounded-md'>
            <select {...register("countrycode",  {
            
        validate: (value, formValues) => {
        console.log("form",formValues,typeof(value), value)
           if (( value !== "null") && formValues?.contactNumber?.length<=0) {
              return "Enter your phone number2";
            }
        
          
          // return true;
        },
      })} className='w-full h-full p-3 bg-richblack-700 text-white rounded-md'>
              {countrycode.map((item, index) => (
                <option key={index} value={item.code}>{item.code} ({item.country})</option>
              ))}
            </select>
          </div>

          <input
            id='phoneNumber'
            placeholder='Enter your phone number'
            {...register("contactNumber", {
          validate: (value, formValues) => {
           
                console.log("value ",value)
                console.log("value ",formValues,formValues?.countrycode?.length)
           if (value && (formValues?.countrycode?.length<=0 ||formValues?.countrycode === "undefined" || formValues?.countrycode === "null")) {
              return "Enter your country code2";
            }
        
           // return true;
          },
        })}
            className="w-full p-3 border border-richblack-600 rounded-md bg-richblack-700 text-white placeholder-richblack-400 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
          />
        </div>
         {/* ✅ Error Messages */}
  {errors.countrycode && (
    <p className="text-red-500 text-sm mt-1">{errors.countrycode.message}</p>
  )}
  {errors.contactNumber && (
    <p className="text-red-500 text-sm mt-1">{errors.contactNumber.message}</p>
  )}
        {/* {errors.countrycode && <p className="text-red-500 text-sm">{errors.countrycode.message}</p>}
        {errors.contactNumber && <p className="text-red-500 text-sm">{errors.contactNumber.message}</p>} */}
      </div>

      {/* About */}
      <div className="md:col-span-1">
        <label className='block text-sm font-medium text-richblack-200 mb-1'>About</label>
        <input
          {...register("about")}
          placeholder='Enter Bio Details'
          className='w-full p-3 rounded-md bg-richblack-700 border border-richblack-600 text-white placeholder-richblack-400 focus:outline-none focus:ring-2 focus:ring-yellow-500'
        />
        
      </div>

      {/* Save button at bottom right */}
      <div className="md:col-span-2 flex justify-end">
        <button
          type="submit"
          className='py-3 px-6 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-md transition duration-200 whitespace-nowrap'
        >
          Save
        </button>
      </div>
    </form>
  </div>
</div>
  )
}

export default UpdateProfile
