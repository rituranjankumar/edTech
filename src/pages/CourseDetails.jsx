import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { buyCourse } from "../services/operations/studentFeaturesAPI";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI";
import GetAvgRating from "../utils/avgRating";
import { toast } from "react-hot-toast";
import { MdLanguage } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { HiDesktopComputer } from "react-icons/hi";
import CourseDetailsCard from "../components/core/CourseDetails/CourseDetailsCard";
import { DateFormatter } from "../utils/DateFormatter";
import RatingStars from "../components/common/RatingStars";
import { useRef } from "react";
import Footer from "../components/common/Footer";
import { formatSecondsToHMS } from "../utils/TimeDurationFormatter";
const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { user, loading } = useSelector((state) => state.profile);
  const { paymentLoading } = useSelector((state) => state.course);

  const [courseData, setCourseData] = useState(null);
  const [avgReviewCount, setAvgReviewCount] = useState(null);
  const [lectureNumber, setLectureNumber] = useState(0);
  const [totalDuration, setTotalDuration] = useState(null);
  //const sectionRefs = useRef({});
  const [isActive, setIsActive] = useState([]);

  const handleActive = (id) => {
    setIsActive((prev) => {

      if (prev.includes(id)) {
        return prev.filter((sec) => sec != id);

      }
      else {
        return [...prev, id];
      }
    })
  }
  const calcuateLectureCount = (courseContent) => {
    if (!courseContent) return;
    let lectureNum = 0;
    courseContent.forEach((section) => {
      lectureNum += section?.subSection.length || 0;
    });
    return lectureNum;
  };

  const getCourseFullDetails = async () => {
    try {
      const result = await fetchCourseDetails(courseId);
      setCourseData(result.data);
      setTotalDuration(result?.totalDuration)
    } catch (error) {
      console.log("error in the course details ", error.message);
    }
  };

  //console.log("toatal duration", totalDuration)
  useEffect(() => {
    getCourseFullDetails();
  }, [courseId]);

  useEffect(() => {
    const reviewCount = GetAvgRating(courseData?.ratingAndReviews);
    setAvgReviewCount(reviewCount);
    const ans = calcuateLectureCount(courseData?.courseContent);
    setLectureNumber(ans);
  }, [courseData]);

  //console.log("courseData ",courseData)

  const handleBuyCourse = async () => {
    if (token) {
      buyCourse([courseId], token, navigate, dispatch, user);
    } else {
      toast.error("please login first ");
      navigate("/login");
    }
  };

//   const formatDuration = (seconds) => {
//     if (!seconds && seconds!== 0) return "0:00";
//     const mins = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
// };

  if (loading || !courseData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loader"></span>
      </div>
    );
  }

  const {
    _id: course_id,
    Name,
    courseDescription,
    instructions,
    price,
    thumbnail,
    whatYouWillLearn,
    category,
    courseContent,
    tag,
    ratingAndReviews,
    instructor,
    studentsEnrolled,
    createdAt,
  } = courseData;

  const calDuration = (subsection) => {
    const ans = subsection.reduce((time, sub) => {
      return time +sub.timeDuration
    }, 0);

    return ans ;
  }
  return (
    <div className="relative w-full bg-richblack-900">
      <div className="mx-auto w-full max-w-[1350px] px-4 lg:px-0">

        <div className="relative flex flex-col  lg:flex-row gap-6 lg:justify-between lg:gap-10 py-8">

          <div className=" flex flex-col lg:w-[100%]">

            <div className="rounded-lg bg-richblack-800 p-6 space-y-4">
              <div className="text-sm text-richblack-200">
                <p>
                  Home / Learning /
                  <span className="text-yellow-100 ml-1 text-base">{category.name}</span>
                </p>
              </div>

              <h1 className="text-3xl font-bold text-richblack-5">{Name}</h1>

              <p className="text-richblack-100 leading-relaxed">
                {courseDescription.slice(0, 200)}...
              </p>

              <div className="flex flex-wrap items-center gap-x-4 text-richblack-100">
                <span className="font-bold text-yellow-100">
                  {avgReviewCount}
                </span>
                <RatingStars Review_Count={avgReviewCount} Star_Size={20} />
                <span>{`${ratingAndReviews.length} reviews`}</span>
                <span>{`${studentsEnrolled.length} students enrolled`}</span>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-richblack-100">
                <div className="flex items-center gap-2">
                  <FaInfoCircle className="text-lg" />
                  <p>
                    Created by{" "}
                    <span className="font-medium text-richblack-5">
                      {instructor.firstName} {instructor.lastName}
                    </span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <FaInfoCircle className="text-lg" />
                  <p>{`Created at ${DateFormatter(createdAt.toString())}`}</p>
                </div>

                <div className="flex items-center gap-2">
                  <MdLanguage className="text-lg" />
                  <p>English</p>
                </div>
              </div>
            </div>


            <div className="mt-6 rounded-lg bg-richblack-800 p-6 border border-richblack-700">
              <h2 className="text-xl font-bold text-richblack-5 mb-4">
                What you'll learn
              </h2>
              <div className="text-richblack-100 space-y-3">
                {whatYouWillLearn}
              </div>
            </div>


            <div className="mt-8">
              <h2 className="text-2xl font-bold text-richblack-5 mb-4">
                Course Content
              </h2>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                <div className="flex gap-4 text-richblack-100 text-sm">
                  <span>{`${courseContent.length} sections`}</span>
                  <span>{`${lectureNumber} lectures`}</span>
                  <span>{totalDuration ? formatSecondsToHMS(totalDuration) : "0 sec"} total length</span>
                </div>

                <button
                  className="text-yellow-50 hover:text-yellow-100 text-sm"
                  onClick={() => setIsActive([])}
                >
                  Collapse all sections
                </button>
              </div>

              <div className="space-y-4">
                {courseContent.map((section) => (
                  <div
                    key={section._id}
                    className="border border-richblack-600 rounded-lg overflow-hidden"
                  >
                    <div
                      onClick={() => handleActive(section._id)}
                      className="flex justify-between items-center p-4 bg-richblack-700 hover:bg-richblack-600 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {isActive.includes(section._id) ? (
                          <FiChevronUp className="text-richblack-100 text-lg" />
                        ) : (
                          <FiChevronDown className="text-richblack-100 text-lg" />
                        )}
                        <h3 className="font-medium text-richblack-5">
                          {section.sectionName}
                        </h3>
                      </div>
                      <div className="flex gap-4 text-sm text-richblack-100">
                        <span>{`${section.subSection.length} lectures`}</span>
                        <span>{formatSecondsToHMS(calDuration(section.subSection))}</span>
                      </div>
                    </div>
         
                    {/* This WILL animate because the element persists */}
                    {/* conditional rendering will completely remove the element form the DOM
                    This will make it harder for transition
                    so,always render the element just change the height and opacity to add the transition
                     */}
                      <div className={`bg-richblack-800 border-t border-richblack-700 divide-y divide-richblack-700 transition-all duration-300 ease-in-out overflow-hidden  ${isActive.includes(section._id)
                          ? "max-h-[1000px] opacity-100"
                          : "max-h-0 opacity-0"
                        }`}>
                        {section.subSection.map((lecture) => (
                          <div
                            key={lecture._id}
                            className="flex justify-between items-center p-3 hover:bg-richblack-700 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <HiDesktopComputer className="text-richblack-100" />
                              <span className="text-richblack-50 text-sm">
                                {lecture.title}
                              </span>
                            </div>
                            <span className="text-richblack-200 text-sm">
                              {formatSecondsToHMS(lecture.timeDuration)}
                            </span>
                          </div>
                        ))}
                      </div>
                    
                  </div>
                ))}
              </div>
            </div>
          </div>


          <div className="lg:sticky   lg:top-20 lg:h-fit lg:w-[400px] w-full">
            <CourseDetailsCard
              course={courseData}
              handleBuyCourse={handleBuyCourse}
            />
          </div>
        </div>


        <div className="my-8  p-6 bg-richblack-800 rounded-lg border border-richblack-700">
          <h3 className="text-xl font-semibold text-richblack-5 mb-4">About the Instructor</h3>
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <img
              src={courseData.instructor.image}
              alt={`${courseData.instructor.firstName} ${courseData.instructor.lastName}`}
              className="w-24 h-24 rounded-full object-cover border-2 border-yellow-100"
            />
            <div className="flex-1">
              <h4 className="text-lg font-medium text-richblack-5">
                {`${courseData.instructor.firstName} ${courseData.instructor.lastName}`}
              </h4>
              <p className="mt-2 text-richblack-100 leading-relaxed">
                {courseData.instructor.additionalDetails.about}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CourseDetails;



