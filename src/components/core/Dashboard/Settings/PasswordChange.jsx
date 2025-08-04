import React, { useEffect, useState } from "react";
import { FaStarOfLife } from "react-icons/fa6";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { apiConnector } from "../../../../services/apiconnector";

import { settingsEndpoints } from "../../../../services/apis";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
const ChangePassword = () => {

        const {user}=useSelector((state)=> state.profile)
    const {token}=useSelector((state)=> state.auth)
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });


  const [formData,setFormData]=useState({
    oldPassword:"",
    newPassword:"",
    confirmNewPassword:""
  })

  const changeHandler=(e)=>
  {
    e.preventDefault();
    setFormData((prev)=>
    {
        return {...prev,[e.target.name]:e.target.value}
    })
  }
  const togglePassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const submitHandler=async(e)=>
  {
    e.preventDefault();

  //  console.log( "email ",user.email);

       // console.log("change password data -> ",formData);
    formData.email=user?.email;
    try{

       if (formData.newPassword !== formData.confirmNewPassword) {
  toast.error("New password and confirm password do not match");
  return;  
}

        const headers={
            authorization:`Bearer ${token}`,
        }
              const response=await apiConnector('POST',settingsEndpoints.CHANGE_PASSWORD_API,formData,headers)
            if(response)
            {
                toast.success("password changed sucessfully")
            }
             //   console.log("response of password change ",response)
            setFormData({
                 oldPassword:"",
    newPassword:"",
    confirmNewPassword:""
            })
    }catch(error)
    {
         
        toast.error("password not changed")
        //console.log("error in updating the password ",error.response)

      
    }
  }

//   useEffect(()=>
// {
     
// },[submitHandler])
  return (
  <div className="p-4 sm:p-6 max-w-4xl w-full mx-auto bg-richblack-800 rounded-lg shadow-md">
  <p className="text-richblack-200 text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
    Change Password
  </p>

  <form onSubmit={submitHandler} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
    {/* Current Password */}
    <div className="col-span-1 relative">
      <label
        htmlFor="oldPassword"
        className="text-xs sm:text-sm font-medium text-richblack-200 mb-1 flex items-center gap-1"
      >
        Current Password
        <FaStarOfLife className="text-[10px] sm:text-xs text-pink-300" />
      </label>
      <input
        type={showPassword.old ? "text" : "password"}
        id="oldPassword"
        name="oldPassword"
        value={formData.oldPassword}
        onChange={changeHandler}
        className="w-full p-2 sm:p-3 rounded-md bg-richblack-700 border border-richblack-600 text-white placeholder-richblack-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 pr-10 sm:pr-12 text-sm sm:text-base"
        placeholder="Enter current password"
      />
      <span
        onClick={() => togglePassword("old")}
        className="absolute top-[52%] right-2 sm:right-3 text-richblack-300 text-base sm:text-lg cursor-pointer"
      >
        {showPassword.old ? <FaEyeSlash /> : <FaEye />}
      </span>
    </div>

    {/* New Password */}
    <div className="col-span-1 relative">
      <label
        htmlFor="newPassword"
        className="text-xs sm:text-sm font-medium text-richblack-200 mb-1 flex items-center gap-1"
      >
        New Password
        <FaStarOfLife className="text-[10px] sm:text-xs text-pink-300" />
      </label>
      <input
        type={showPassword.new ? "text" : "password"}
        id="newPassword"
        name="newPassword"
        value={formData.newPassword}
        onChange={changeHandler}
        className="w-full p-2 sm:p-3 rounded-md bg-richblack-700 border border-richblack-600 text-white placeholder-richblack-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 pr-10 sm:pr-12 text-sm sm:text-base"
        placeholder="Enter new password"
      />
      <span
        onClick={() => togglePassword("new")}
        className="absolute top-[52%] right-2 sm:right-3 text-richblack-300 text-base sm:text-lg cursor-pointer"
      >
        {showPassword.new ? <FaEyeSlash /> : <FaEye />}
      </span>
    </div>

    {/* Confirm Password */}
    <div className="col-span-1 sm:col-span-2 relative">
      <label
        htmlFor="confirmNewPassword"
        className="text-xs sm:text-sm font-medium text-richblack-200 mb-1 flex items-center gap-1"
      >
        Confirm New Password
        <FaStarOfLife className="text-[10px] sm:text-xs text-pink-300" />
      </label>
      <input
        type={showPassword.confirm ? "text" : "password"}
        id="confirmNewPassword"
        name="confirmNewPassword"
        onChange={changeHandler}
        value={formData.confirmNewPassword}
        className="w-full p-2 sm:p-3 rounded-md bg-richblack-700 border border-richblack-600 text-white placeholder-richblack-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 pr-10 sm:pr-12 text-sm sm:text-base"
        placeholder="Re-enter new password"
      />
      <span
        onClick={() => togglePassword("confirm")}
        className="absolute top-[52%] right-2 sm:right-3 text-richblack-300 text-base sm:text-lg cursor-pointer"
      >
        {showPassword.confirm ? <FaEyeSlash /> : <FaEye />}
      </span>
    </div>

    {/* Submit Button */}
    <div className="col-span-1 sm:col-span-2 flex justify-end">
      <button
        type="submit"
        className="w-full sm:w-auto py-2 sm:py-3 px-4 sm:px-6 bg-yellow-500 hover:bg-yellow-400 text-black font-medium sm:font-semibold rounded-md transition duration-200 text-sm sm:text-base"
      >
        Update Password
      </button>
    </div>
  </form>
</div>
  );
};

export default ChangePassword;
