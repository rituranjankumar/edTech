import React from 'react'
import { FaCheck } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import PublishCourse from './PublishCourse/PublishCourse';
import CourseBuilderForm from './CourseBulider/CourseBuilderForm';
import CourseInformationForm from './CourseInformation/CourseInformationForm';
const RenderSteps = () => {
  const { step } = useSelector((state) => state.course);

  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ];

  return (
    <>
      {/* Steps with circles and connecting dashes */}
      <div className="flex p-5 items-center justify-center ">
        {steps.map((item, index) => (
          <div key={item.id} className="flex items-center">
            {/* Step circle */}
            <div>
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full border-2 font-bold text-sm
                  ${
                    step === item.id
                      ? "bg-yellow-900 border-yellow-50 text-yellow-50"
                      : step > item.id
                      ? "bg-yellow-50 text-yellow-900 border-yellow-50"
                      : "border-richblack-700 bg-richblack-800 text-richblack-300"
                  }`}
              >
                {step > item.id ? <FaCheck /> : item.id}
              </div>
            </div>

            {/* Dashed line between steps */}
            {index < steps.length - 1 && (
              <div
                className={`w-8 sm:w-16 md:w-24 border-t-2 border-dashed mx-2 ${
                  step > item.id ? "border-yellow-50" : "border-richblack-500"
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>

      {/* Step Titles */}
      <div className="flex gap-10 space-x-16 justify-center   items-center mt-2">
        {steps.map((item) => (
          <div key={item.id} className="w-10 text-center text-sm">
            <p>{item.title}</p>
          </div>
        ))}
      </div>

      {/* Step Content */}
      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm />}
      {step === 3 && <PublishCourse />}
    </>
  );
};

export default RenderSteps;
