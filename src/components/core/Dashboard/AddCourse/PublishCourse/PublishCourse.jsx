import React from 'react'
import { useState,useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import IconBtn from '../../../../common/IconBtn';
import {useNavigate} from "react-router"
import { resetCourseState, setStep } from '../../../../../slices/courseSlice';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI';
const PublishCourse = () => {

    const{register,handleSubmit,setValue,getValues,watch,formState:{errors}}=useForm();

        const dispatch = useDispatch();
        const{token}=useSelector((state)=>state.auth);
        const navigate=useNavigate();
    const { course, editCourse } = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);

    useEffect(()=>
    {
        if(course?.status === COURSE_STATUS.PUBLISHED)
        {
            setValue("public",true);
        }
    },[])

    const goToCourses=()=>
    {
        dispatch(resetCourseState());
        navigate("/dashboard/my-courses");
    }
    const handleCoursePublish=async ()=>
    {
        if(course?.status === COURSE_STATUS.PUBLISHED && getValues("public")===true
    || (course?.status === COURSE_STATUS.DRAFT && getValues("public")===false)
    )
        {
            //no updation in the form
            //no need to make api call
            goToCourses();
            return ;
        }

        // form is updated
        const formData=new FormData();
        formData.append("courseId",course._id);
        const courseStatus=getValues("public") ? COURSE_STATUS.PUBLISHED:COURSE_STATUS.DRAFT

        formData.append("status",courseStatus);
        setLoading(true);

        const result=await editCourseDetails(formData,token);
        if(result)
        {
          //  console.log("result of public ", result);
            goToCourses();
        }

        setLoading(false);
    }
    const onSubmit=(data)=>
    {
        //console.log(data);
            handleCoursePublish(data);
    }

    const goBack=()=>
    {
        dispatch(setStep(2));

    }
  return (
    <div className="rounded-md border border-richblack-700 mt-6 bg-richblack-800 p-6 shadow-sm">
  <p className="text-richblack-25 text-lg font-semibold mb-4 border-b border-richblack-700 pb-2">
    Publish Course
  </p>

  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
    {/* Checkbox Section */}
    <div className="flex items-center gap-3">
      <input
        type="checkbox"
        id="public"
        {...register("public")}
        className=" accent-yellow-500 h-5 w-5 border-2 border-richblack-400 rounded-md 
        bg-transparent checked:bg-yellow-400 checked:border-yellow-400
        transition-all duration-300 ease-in-out
        cursor-pointer hover:border-yellow-300 hover:scale-105
        focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />
      <label
        htmlFor="public"
        className="text-richblack-50 text-sm md:text-base cursor-pointer hover:text-yellow-200 transition-colors"
      >
        Make this course public
      </label>
    </div>

    {/* Button Section */}
    <div className="flex justify-end gap-3 pt-2">
      <button
        disabled={loading}
        type="button"
        onClick={goBack}
        className="flex items-center gap-2 bg-richblack-700 hover:bg-richblack-600 text-richblack-25 px-4 py-2 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        ← Back
      </button>

      <IconBtn
        type="submit"
        disabled={loading}
        text={loading ? 'Saving...' : 'Save changes'}
        className="bg-yellow-400 hover:bg-yellow-500 text-richblack-900 font-semibold px-5 py-2 rounded-lg shadow-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      />
    </div>
  </form>
</div>

  )
}

export default PublishCourse