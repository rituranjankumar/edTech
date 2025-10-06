import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI';
import { categories } from '../../../../../services/apis';
import TagsComponent from '../TagsComponent';
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import Upload from '../Upload';
import RequirementField from './RequirementField';
import { setStep, setCourse } from '../../../../../slices/courseSlice';
import IconBtn from '../../../../common/IconBtn';
import toast from 'react-hot-toast';
import { COURSE_STATUS } from "../../../../../utils/constants"
import { addCourseDetails, editCourseDetails } from '../../../../../services/operations/courseDetailsAPI';
const CourseInformationForm = () => {

    const { token } = useSelector((state) => state.auth);
    const { register, handleSubmit, setValue,watch, getValues, reset,
        formState: { errors }
    } = useForm();


    const selectedCategory = watch("courseCategory");
    const dispatch = useDispatch();
    const { course, editCourse } = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);
    const [courseCategories, setCourseCategories] = useState([]);

    const getCategories = async () => {
        setLoading(true);
        const categories = await fetchCourseCategories();
      //  console.log("course categories -> ", categories);
        if (categories.length > 0) {
            setCourseCategories(categories);
        }
        setLoading(false);
    }

    useEffect(() => {
        if (editCourse) {
            setValue("courseTitle", course.Name);
            setValue("courseShortDesc", course.courseDescription);
            setValue("coursePrice", course.price);
            setValue("courseTags", course.tag);
            setValue("courseBenefits", course.whatYouWillLearn);
            setValue("courseCategory", course.category._id);
            setValue("courseRequirements",  typeof(course.instructions) === "string" 
                                            ? JSON.parse(course.instructions)
                                            : course.instructions || []);
            setValue("courseImage", course?.thumbnail);
            console.log("course is ", course);
        }

        getCategories();
    }, [])

    const isFormUpdated = () => {
        const currentValues = getValues();
        if (currentValues.courseTitle !== course.Name ||
            currentValues.courseShortDesc !== course.courseDescription ||
            currentValues.coursePrice !== course.price ||
            currentValues.courseTags.toString() !== course.tag.toString() ||
            currentValues.courseBenefits !== course.whatYouWillLearn ||
            currentValues.courseCategory !== course.category._id ||
            currentValues.courseRequirements.toString() !== course.instructions.toString() ||
            currentValues.courseImage !== course.thumbnail
        ) {
            return true;
        }
        else
            return false;


    }

    //handles next button click
    const onSubmit = async (data) => {

       // console.log("in course creation page checking for the category ",data);
        //use formdata to send the data to backend when there is handeling with files
        if (editCourse) {
            if (isFormUpdated()) {
                const currentValues = getValues();
                const formData = new FormData();

                formData.append("courseId", course._id);
                if (currentValues.courseTitle !== course.Name) {
                    formData.append("courseName", data.courseTitle);
                }

                if (currentValues.courseShortDesc !== course.courseDescription) {
                    formData.append("courseDescription", data.courseShortDesc);
                }

                if (currentValues.coursePrice !== course.price) {
                    formData.append("price", data.coursePrice);
                }

                if (currentValues.courseBenefits !== course.whatYouWillLearn) {
                    formData.append("whatYouWillLearn", data.courseBenefits);
                }

                if (currentValues.courseCategory !== course.category._id) {
                    formData.append("category", data.courseCategory);
                }

                if (currentValues.courseRequirements.toString() !== course.instructions.toString()) {
                    formData.append("instructions", JSON.stringify(data.courseRequirements));
                }
                if (currentValues.courseTags.toString() !== course.tag.toString()) {
                    formData.append("tag", data.courseTags);
                }
                if (  currentValues.courseImage !== course.thumbnail) {
                    formData.append("thumbnailImage", data.courseImage);
                }

                setLoading(true);
                const result = await editCourseDetails(formData, token);
                setLoading(false);
                if (result) {
                    setStep(2);
                    dispatch(setCourse(result));
                }

              //  console.log("PRINTING FORMDATA", formData);
               // console.log("PRINTING result", result);
            }
            else {
                toast.error("NO Changes made so far");
            }


            return;
        }

        //create a new course
        // console.log("thumbnailImage before append:", data.courseImage);
        const formData = new FormData();
        formData.append("courseName", data.courseTitle);
        formData.append("courseDescription", data.courseShortDesc);
        formData.append("price", data.coursePrice);
        formData.append("whatYouWillLearn", data.courseBenefits);
        formData.append("category", data.courseCategory);
        formData.append("tag", data.courseTags);
        formData.append("instructions", JSON.stringify(data.courseRequirements));
        formData.append("status", COURSE_STATUS.DRAFT);
        formData.append("thumbnailImage", data.courseImage)
        setLoading(true);
        //  console.log("BEFORE add course API call");
        //  for (let pair of formData.entries()) {
        //     console.log(`${pair[0]}:`, pair[1]);
        //                 }

        //   console.log("PRINTING FORMDATA", formData);
        const result = await addCourseDetails(formData, token);
        if (result) {
            dispatch(setStep(2));
            dispatch(setCourse(result));
        }
        setLoading(false);
        //  console.log("PRINTING FORMDATA", formData);
      //  console.log("PRINTING result", result);
    }
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8'>

            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="courseTitle" className="text-sm font-medium text-white">
                    Course Title <sup className="text-red-500">*</sup>
                </label>

                <input
                    id="courseTitle"
                    type="text"
                    placeholder="Enter Course Title"
                    {...register("courseTitle", { required: true })}
                    className="bg-richblack-700 text-white rounded-md p-3 border border-richblack-600 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                />

                {errors.courseTitle && (
                    <span className="text-sm text-red-500">Course Title is required</span>
                )}
            </div>


            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="courseShortDesc" className="text-sm font-medium text-white">
                    Course Short Description <sup className="text-red-500">*</sup>
                </label>

                <textarea
                    id="courseShortDesc"
                    placeholder="Enter a short description of the course"
                    {...register("courseShortDesc", { required: true })}
                    className="min-h-[140px] bg-richblack-700 text-white rounded-md p-3 border border-richblack-600 focus:outline-none focus:ring-1 focus:ring-yellow-400 resize-none"
                />

                {errors.courseShortDesc && (
                    <span className="text-sm text-red-500">Course description is required</span>
                )}
            </div>


            <div className="relative flex flex-col gap-2 w-full">
                <label htmlFor="coursePrice" className="text-sm font-medium text-white">
                    Course Price <sup className="text-red-500">*</sup>
                </label>

                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-richblack-400 text-lg">
                        <HiOutlineCurrencyRupee />
                    </span>

                    <input
                        type="number"
                        id="coursePrice"
                        min={0}
                        placeholder="Enter Course Price"
                        {...register("coursePrice", {
                            required: true,
                            valueAsNumber: true,

                        })}
                        className="w-full pl-10 pr-3 py-2 bg-richblack-700 text-white rounded-md border border-richblack-600 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                    />
                </div>

                {errors.coursePrice && (
                    <span className="text-sm text-red-500">Course price is required</span>
                )}
            </div>



            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="courseCategory" className="text-sm font-medium text-white">
                    Course Category <sup className="text-red-500">*</sup>
                </label>

                <select
               
               
                
                    id="courseCategory"
                   value= {selectedCategory?  selectedCategory:(course?.category?._id ? course?.category?._id :"")}
                    {...register("courseCategory", { required: true })}
                    className="bg-richblack-700 text-white rounded-md p-2 border border-richblack-600 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                >
                    <option value="" disabled >
                        Choose a Category
                    </option>

                    {!loading &&
                        courseCategories.map((category, index) => (
                            <option key={index} value={category?._id}>
                                {category?.name}
                            </option>
                        ))}
                </select>

                {errors.courseCategory && (
                    <span className="text-sm text-red-500">Course Category is required</span>
                )}


            </div>



            {/* custom component for tags */}
            <TagsComponent
                label="Tag"
                name="courseTags"
                placeholder="enter tags and press enter"
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
            />

            {/*             image upload component */}

            <Upload
                label="Thumbnail"
                name="courseImage"
                video={false}
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
            />


            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="courseBenefits" className="text-sm text-richblack-5">
                    Benefits of the course<sup className="text-pink-200">*</sup>
                </label>

                <textarea
                    id="courseBenefits"
                    placeholder="Enter the benefits of the course"
                    {...register("courseBenefits", { required: true })}
                    className="min-h-[120px] w-full resize-y rounded-md bg-richblack-700 px-3 py-2 text-sm text-white placeholder:text-richblack-400 outline-none ring-1 ring-richblack-600 focus:ring-yellow-400"
                />

                {errors.courseBenefits && (
                    <span className="ml-1 text-xs text-pink-200">
                        Benefits of the course are required
                    </span>
                )}
            </div>

            <RequirementField
                name="courseRequirements"
                label="Requirements/instructions"
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
            />


            <div className='flex gap-4 justify-between'>
                {
                    editCourse && (
                        <button
                            type='button'
                            onClick={(e) => {
                                dispatch(setStep(2));
                            }}
                             className='bg-richblack-600 text-richblack-50 px-3 rounded-lg   py-1'
                        >Countinue without Saving</button>
                    )
                }

                <IconBtn
                    type="submit"
                    text={!editCourse ? "Next" : "Save Changes"}
                    className='bg-yellow-100 text-richblack-800 px-3 rounded-lg   py-1'

                />
            </div>

        </form>
    )
}

export default CourseInformationForm