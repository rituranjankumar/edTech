import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../common/IconBtn'
import { MdAddCircleOutline } from 'react-icons/md'
import { BiAddToQueue } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { BiRightArrow } from 'react-icons/bi'
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice'
import { toast } from 'react-hot-toast'
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI'
import NestedView from './NestedView'

const CourseBuilderForm = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm()
  const [editSectionName, setEditSectionName] = useState(null)
  const { course } = useSelector((state) => state.course)
  //console.log("hello course ",course)
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)

  // useEffect(() => {
  //  // console.log("UPDATED")
  // }, [course])

  const onSubmit = async (data) => {
    setLoading(true)
    let result

    if (editSectionName) {
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        }, token
      )
    } else {
      result = await createSection({
        sectionName: data.sectionName,
        courseId: course._id,
      }, token)
    }

    if (result) {
      dispatch(setCourse(result))
      setEditSectionName(null)
      setValue("sectionName", "")
    }

    setLoading(false)
  }

  const cancelEdit = () => {
    setEditSectionName(null)
    setValue("sectionName", "")
  }

  const goBack = () => {
    dispatch(setStep(1))
    dispatch(setEditCourse(true))
  }

  const goToNext = () => {
    if (course?.courseContent?.length === 0) {
      toast.error("Please add atleast one Section")
      return
    }
    if (course.courseContent.some((section) => section.subSection.length === 0)) {
      toast.error("Please add atleast one lecture in each section")
      return
    }
    dispatch(setStep(3))
  }

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit()
      return
    }

    setEditSectionName(sectionId)
    setValue("sectionName", sectionName)
  }

  return (
    <div className='text-white p-6 bg-richblack-800 rounded-md shadow-lg'>
      <p className='text-2xl font-semibold mb-6'>Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
        <div>
          <label htmlFor='sectionName' className='block text-sm font-medium text-richblack-5'>
            Section name <sup className='text-pink-200 text-sm'>*</sup>
          </label>
          <input
            id='sectionName'
            placeholder='Add section name'
            {...register("sectionName", { required: true })}
            className='mt-1 w-full rounded-lg bg-richblack-700 text-white px-3 py-2 border border-richblack-600 focus:outline-none focus:ring-2 focus:ring-yellow-50'
          />
          {errors.sectionName && (
            <span className='text-xs text-pink-200'>Section Name is required</span>
          )}
        </div>

        <div className='flex items-center gap-x-4'>
          <IconBtn
            type="Submit"
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            outline={true}
            customClasses={"text-white"}
            className='bg-yellow-100 px-2 py-1 rounded-md flex justify-center items-center'
          > 
            <MdAddCircleOutline className='text-white' size={20} />
          </IconBtn>

          {editSectionName && (
            <button
              type='button'
              onClick={cancelEdit}
              className='text-sm text-richblack-300 underline ml-2'
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {course?.courseContent?.length > 0 && (
        <div className='mt-8'>
          <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
        </div>
      )}

      <div className='flex justify-end items-center gap-x-4 mt-10'>
        <button
          onClick={goBack}
          className='rounded-md px-4 py-2 bg-richblack-600 text-white hover:bg-richblack-700 transition-all duration-200'
        >
          Back
        </button >

        <IconBtn className='bg-yellow-100 px-2 py-1 rounded-md flex justify-center items-center' text="Next" onClick={goToNext}>
          <BiRightArrow  />
        </IconBtn>
      </div>
    </div>
  )
}

export default CourseBuilderForm
