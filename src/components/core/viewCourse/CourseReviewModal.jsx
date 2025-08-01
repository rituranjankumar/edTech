import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux'
import IconBtn from '../../common/IconBtn';
import ReactStars from 'react-stars'
import { MdCancel } from "react-icons/md";
import { createRating } from '../../../services/operations/courseDetailsAPI';

const CourseReviewModal = ({setReviewModal}) => {
    const {user} = useSelector((state)=>state.profile);
    const {token} = useSelector((state) => state.auth);
    const {courseEntireData} = useSelector((state)=> state.viewCourse);

    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm();

    useEffect(()=> {
        setValue("courseExperience", "");
        setValue("courseRating", 0);
    },[])

    const ratingChanged = (newRating) => {
        setValue("courseRating", newRating);
    }

    const onSubmit = async(data) => {
        await createRating(
            {
                courseId:courseEntireData._id,
                rating:data.courseRating,
                review:data.courseExperience,
            },
            token
        );
        setReviewModal(false);
    }

  return (
    <div className='fixed inset-0 z-[1000]   grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm '>
        <div className='my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800'>
            {/* Modal header */}
            <div className='flex items-center justify-between rounded-t-lg bg-richblack-700 p-5'>
                <p className='text-xl font-semibold text-richblack-5'>Add Review</p>
                <button 
                onClick={()=> setReviewModal(false)}
                className='text-richblack-5 hover:text-richblack-300'
                >
                     <MdCancel className='text-2xl'/>
                </button>
            </div>

            {/* Modal Body */}
            <div className='p-6'>

                <div className='flex items-center gap-x-4'>
                    <img 
                        src={user?.image}
                        alt='user Image'
                        className='aspect-square w-[50px] rounded-full object-cover'
                    />
                    <div>
                        <p className='text-lg font-semibold text-richblack-5'>{user?.firstName} {user?.lastName}</p>
                        <p className='text-sm text-richblack-5'>Posting Publicly</p>
                    </div>
                </div>


                <form
                onSubmit={handleSubmit(onSubmit)}
                className='mt-6 flex flex-col items-center'>

                    <ReactStars 
                        count={5}
                        onChange={ratingChanged}
                        size={30}
                        activeColor="#ffd700"
                    />

                    <div className='flex w-full flex-col space-y-2'>
                        <label htmlFor='courseExperience' className='text-sm text-richblack-5'>
                            Add Your Experience<sup className='text-pink-200'>*</sup>
                        </label>
                        <textarea 
                            id='courseExperience'
                            placeholder='Add Your Experience here'
                            {...register("courseExperience", {required:true})}
                            className='  min-h-[130px] w-full rounded-lg bg-richblack-700 p-3 text-richblack-5   shadow-md shadow-richblack-600'
                        />
                        {
                            errors.courseExperience && (
                                <span className='ml-2 text-xs tracking-wide text-pink-200'>
                                    Please add your experience
                                </span>
                            )
                        }
                    </div>
                    {/* Cancel and Save button */}
                    <div className='mt-6 flex w-full items-center justify-end gap-x-3'>
                        <button
                        onClick={() => setReviewModal(false)}
                        className='cursor-pointer rounded-md bg-richblack-300 py-2 px-5 font-semibold text-richblack-900'
                        >
                            Cancel
                        </button>
                        <IconBtn 
                        type="submit"
                            text="Save"
                            className='bg-yellow-50 px-3 hover:bg-yellow-100 text-richblack-800 py-2 rounded'
                        />
                    </div>


                </form>

            </div>
        </div>
    </div>
  )
}

export default CourseReviewModal