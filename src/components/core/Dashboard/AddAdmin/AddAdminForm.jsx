import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaUserShield } from "react-icons/fa";
import { apiConnector } from "../../../../services/apiconnector";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const AddAdminForm = () => {
  const [showPassword, setShowPassword] = useState(false);
    const [loading,setLoading]=useState(false)
    const {token} =useSelector((state) =>state.auth)
    const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      accountType: "Admin",
    },
  });

  const createAccount = async(data) => {

    setLoading(true);
     const toastId=toast.loading("Creating Admin...");
    try{
     

          const response =await apiConnector("POST",`${REACT_APP_BASE_URL}/auth/create-admin`,data,{
            Authorization:`Bearer ${token}`
          })

          if(response?.data?.success)
          {
            toast.success("Admin Created Successfully");
             
          }
    }catch(error)
    {
      toast.error(error?.response?.data?.message || "Failed to create admin");
      console.log("ERROR IN CREATING ADMIN ",error);
    }
    finally{
      toast.dismiss(toastId)
       setLoading(false)
       reset();
    }
   //console.log("form data is ", data);

   
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-richblack-900 p-4">
      <form
        onSubmit={handleSubmit(createAccount)}
        className="w-full max-w-md bg-richblack-800 p-6 rounded-xl shadow-lg space-y-6"
      >
        
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="h-12 w-12 flex items-center justify-center rounded-full bg-yellow-100 text-richblack-900">
            <FaUserShield size={22} />
          </div>
          <h2 className="text-xl font-semibold text-richblack-5">
            Add New Admin
          </h2>
          <p className="text-sm text-richblack-300">
            Create an administrator account with full access
          </p>
        </div>

        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="firstName" className="text-sm font-medium text-richblack-200">
              First Name
            </label>
            <input
              type="text" id="firstName"
              {...register("firstName", { required: true })}
              className="w-full rounded-md bg-richblack-700 border border-richblack-600 px-3 py-2 text-richblack-50 outline-none focus:ring-2 focus:ring-yellow-200"
            />
            {errors.firstName && (
              <p className="text-xs text-red-400">First name is required</p>
            )}
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="lastName" className="text-sm font-medium text-richblack-200">
              Last Name
            </label>
            <input id="lastName"
              type="text"
              {...register("lastName", { required: true })}
              className="w-full rounded-md bg-richblack-700 border border-richblack-600 px-3 py-2 text-richblack-50 outline-none focus:ring-2 focus:ring-yellow-200"
            />
            {errors.lastName && (
              <p className="text-xs text-red-400">Last name is required</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium text-richblack-200">
            Email
          </label>
          <input id="email"
            type="email"
            {...register("email", { required: true })}
            className="w-full rounded-md bg-richblack-700 border border-richblack-600 px-3 py-2 text-richblack-50 outline-none focus:ring-2 focus:ring-yellow-200"
          />
          {errors.email && (
            <p className="text-xs text-red-400">Email is required</p>
          )}
        </div>

       
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm font-medium text-richblack-200">
            Password
          </label>

          <div className="relative">
            <input id="password"
              type={showPassword ? "text" : "password"}
              {...register("password", { required: true })}
              className="w-full rounded-md bg-richblack-700 border border-richblack-600 px-3 py-2 pr-10 text-richblack-50 outline-none focus:ring-2 focus:ring-yellow-200"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-richblack-300 hover:text-richblack-50"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {errors.password && (
            <p className="text-xs text-red-400">Password is required</p>
          )}
        </div>

        {/* Account Type */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-richblack-200">
            Account Type
          </label>
          <input
            type="text"
            readOnly
            {...register("accountType")}
            className="w-full rounded-md bg-richblack-600 border border-richblack-600 px-3 py-2 text-richblack-100 cursor-not-allowed"
          />
        </div>

        {/* Submit */}
        <button
            disabled={loading}
          type="submit"
          className="w-full bg-yellow-50 text-richblack-900 py-2 rounded-md font-semibold hover:bg-yellow-100 transition"
        >
          Create Admin
        </button>
      </form>
    </div>
  );
};

export default AddAdminForm;
