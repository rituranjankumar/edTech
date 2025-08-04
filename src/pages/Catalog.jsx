import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Course_Card from "../components/core/Catalog/Course_Card";
import CourseSlider from "../components/core/Catalog/CourseSlider";
import Footer from "../components/common/Footer";
import { categories } from "../services/apis";
import { getCatalogaPageData } from "../services/operations/pageAndComponentData";
import { apiConnector } from "../services/apiconnector";

const Catalog = () => {
  const { catalogName } = useParams();
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [activeTab, setActiveTab] = useState("popular");

  // Fetch category ID based on catalog name
  useEffect(() => {
    const getCategories = async () => {
      const res = await apiConnector("GET", categories.CATEGORIES_API);
   //   console.log("all categories response ", res);
      const category_id = res?.data?.allCategories?.find(
        (ct) => ct.name.split(" ").join("-") === catalogName
      )?._id;

    //  console.log("category id is ", category_id);
      if (category_id === "undefined") {
        setCategoryId(null);
      }
      setCategoryId(category_id);
    };
    getCategories();
  }, [catalogName]);

  // Fetch catalog page data using category ID
  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const res = await getCatalogaPageData(categoryId);
    //    console.log("category details response", res);
        setCatalogPageData(res);
      } catch (error) {
        console.log(error);
      }
    };
    if (categoryId) getCategoryDetails();
  }, [categoryId]);

  //console.log(" catalogPage ",catalogPageData?.data);
  const selectedCategory = catalogPageData?.data?.selectedCategoryCourses;
  const popularCourses = catalogPageData?.data?.topSellingCourse || [];
  const newCourses =
    catalogPageData?.data?.differentCategoryCourses[0]?.course || [];
  //console.log("new course",catalogPageData?.data?.differentCategoryCourses )  ;

  return (
   <div>
  {categoryId ? (
    <div className="text-white bg-richblack-900 min-h-screen">
      {/* Breadcrumb */}
      <div className="px-4 sm:px-6 lg:px-20 py-4 sm:py-6">
        <p className="text-xs sm:text-sm text-richblack-300">
          Home / Catalog /{" "}
          <span className="text-yellow-50 font-medium">
            {selectedCategory?.name}
          </span>
        </p>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold mt-1 sm:mt-2">
          {selectedCategory?.name}
        </h1>
        <p className="text-richblack-200 text-sm sm:text-base mt-1 sm:mt-2">
          {selectedCategory?.description}
        </p>
      </div>

      {/* Courses Section */}
      <div className="px-4 sm:px-6 lg:px-20 space-y-8 sm:space-y-12">
        {/* Section 1: Courses to get started */}
        <div className="flex flex-col">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4">
            Courses to get you started
          </h2>
          
          {/* Tabs */}
          <div className="flex bg-richblack-800 rounded-lg sm:rounded-xl w-fit sm:w-fit mb-4 sm:mb-6">
            {["popular", "new"].map((tab) => (
              <button
                key={tab}
                className={`px-3 sm:px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl border text-xs sm:text-sm font-medium transition-all duration-200 w-1/2 sm:w-auto text-center
                  ${
                    activeTab === tab
                      ? "bg-richblack-200 text-richblack-900 border-yellow-100"
                      : "bg-richblack-700 text-richblack-100 border-richblack-700 hover:bg-richblack-700"
                  }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === "popular" ? "Most Popular" : "New"}
              </button>
            ))}
          </div>
          
          {/* Course Slider */}
          <CourseSlider
            Courses={activeTab === "popular" ? popularCourses : newCourses}
          />
        </div>

        {/* Section 2: Top Courses in Category */}
        <div>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4">
            Top Courses in {selectedCategory?.name}
          </h2>
          <CourseSlider Courses={popularCourses || []} />
        </div>

        {/* Section 3: Frequently Bought */}
        <div>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4">
            Frequently Bought
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 py-4 sm:py-6">
            {catalogPageData?.data?.topSellingCourse
              ?.slice(0, 4)
              .map((course, index) => (
                <Course_Card
                  course={course}
                  key={index}
                  Height={"h-[300px] sm:h-[350px] lg:h-[400px]"}
                />
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  ) : (
    <div className="text-white p-4 text-center">No data is present</div>
  )}
</div>
  );
};

export default Catalog;
