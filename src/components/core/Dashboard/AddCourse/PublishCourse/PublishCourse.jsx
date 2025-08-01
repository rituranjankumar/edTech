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
            console.log("result of public ", result);
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
    <div className='rounded-md border-[1px] mt-4 bg-richblack-800 p-6 border-richblack-700'> 
    
    <p>Publish Course</p>
    
    <form onSubmit={handleSubmit(onSubmit)}>

        <div>

        <input type='checkbox'  
            id='public'
            {...register("public")}
            className='rounded h-4 w-4 m-2'
             ></input>
            <label htmlFor='public'>Make this course as public</label>

            
        </div>

            <div className='flex justify-end gap-x-3 '>
                <button 
                disabled={loading}
                type='button'
                onClick={goBack}
                className='flex items-center bg-richblack-600 p-1.5  rounded-md'
                >Back</button>

                <IconBtn 

                  type="submit"
                    disabled={loading}
                     text={loading ? "Saving..." : "Save changes"}
                    className='bg-yellow-300 p-1.5 rounded-md text-white'  
                />
            </div>
    </form>
    </div>
  )
}

export default PublishCourse