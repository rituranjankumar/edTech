import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { createSubSection, updateSubSection } from '../../../../../services/operations/courseDetailsAPI'
import { setCourse } from '../../../../../slices/courseSlice'
import { RxCross1 } from 'react-icons/rx'
import Upload from '../Upload'
import IconBtn from '../../../../common/IconBtn'

const SubSectionModal = ({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm()

  useEffect(() => {
    // Register timeDuration manually since we set it programmatically
    register("timeDuration");
  }, [register]);
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)
  const [videoDuration, setVideoDuration] = useState(null);

  useEffect(() => {
    if (view || edit) {
      setValue('lectureTitle', modalData.title)
      setValue('lectureDesc', modalData.description)
      setValue('lectureVideo', modalData.videoUrl)
        setValue('timeDuration', modalData.timeDuration);
        console.log()
    }
  }, [])

  const isFormUpdated = () => {
    const currentValues = getValues()
    return (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl
    )
  }

  const handleEditSubSection = async () => {
    const currentValues = getValues()
    const formData = new FormData()

    formData.append('sectionId', modalData.sectionId)
    formData.append('subSectionId', modalData._id)

    if (currentValues.lectureTitle !== modalData.title) {
      formData.append('title', currentValues.lectureTitle)
    }
    if (currentValues.lectureDesc !== modalData.description) {
      formData.append('description', currentValues.lectureDesc)
    }
    if (currentValues.lectureVideo !== modalData.videoUrl) {
      formData.append('lectureVideo', currentValues.lectureVideo)
      formData.append('timeDuration', currentValues.timeDuration)

    }

    setLoading(true)

    console.log("before updateing hte subsection ",currentValues.timeDuration);
    const result = await updateSubSection(formData, token)
    if (result) {
      dispatch(setCourse(result))
    }
    setModalData(null)
    setLoading(false)
  }

  const onSubmit = async (data) => {
    if (view) return

    if (edit) {
      if (!isFormUpdated()) {
        toast.error('No changes made to the form')
      } else {
        handleEditSubSection()
      }
      return
    }

    const formData = new FormData()
    formData.append('sectionId', modalData)
    formData.append('title', data.lectureTitle)
    formData.append("timeDuration", getValues("timeDuration"));
    formData.append('description', data.lectureDesc)
    formData.append('lectureVideo', data.lectureVideo)

    //  console.log("before addding the subsection ",getValues("timeDuration"));
    //    for (let [key, value] of formData.entries()) {
    // console.log(`${key}:`, value);
 // }
    setLoading(true)
    const result = await createSubSection(formData, token)
    if (result) {
      dispatch(setCourse(result))
    }
    setModalData(null)
    setLoading(false)
  }

  return (
    <div className=" absolute h-[100%] inset-0   bg-black bg-opacity-60 z-50 flex items-center justify-center">
      <div className="w-[90%] max-w-[600px]      rounded-md bg-richblack-800 p-6 relative text-white space-y-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xl font-semibold text-yellow-50">
            {view && 'Viewing'} {add && 'Adding'} {edit && 'Editing'} Lecture
          </p>
          <button onClick={() => (!loading ? setModalData(null) : {})}>
            <RxCross1 className="text-2xl hover:text-pink-200" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Upload
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            getValues={getValues}
            setVideoDuration={setVideoDuration}
            errors={errors}
            video={true}
            viewData={view ? modalData.videoUrl : null}
            editData={edit ? modalData.videoUrl : null}
          />

          <div>
            <label htmlFor="lectureTitle" className="block mb-1 text-sm">
              Lecture Title <sup className="text-pink-200">*</sup>
            </label>
            <input
              id="lectureTitle"
              placeholder="Enter Lecture Title"
              {...register('lectureTitle', { required: true })}
              className="w-full rounded-md bg-richblack-700 p-2 text-sm text-white border border-richblack-600 focus:outline-none focus:ring-1 focus:ring-yellow-200"
            />
            {errors.lectureTitle && (
              <span className="text-xs text-pink-200">
                Lecture Title is required
              </span>
            )}
          </div>

          <div>
            <label htmlFor="lectureDesc" className="block mb-1 text-sm">
              Lecture Description <sup className="text-pink-200">*</sup>
            </label>
            <textarea
              id="lectureDesc"
              placeholder="Enter Lecture Description"
              {...register('lectureDesc', { required: true })}
              className="w-full min-h-[130px] rounded-md bg-richblack-700 p-2 text-sm text-white border border-richblack-600 focus:outline-none focus:ring-1 focus:ring-yellow-200"
            />
            {errors.lectureDesc && (
              <span className="text-xs text-pink-200">
                Lecture Description is required
              </span>
            )}
          </div>

          {!view && (
            <div className="flex justify-end">
              <IconBtn 
              className='transition-colors duration-150 bg-yellow-500 p-1.5 rounded hover:bg-yellow-300'
              text={loading ? 'Loading...' : edit ? 'Save Changes' : 'Save'} />
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default SubSectionModal
