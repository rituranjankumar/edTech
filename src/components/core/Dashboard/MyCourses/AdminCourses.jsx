 
import React, { useEffect, useState } from "react";
import { deleteCourse, fetchAdminCourses } from "../../../../services/operations/courseDetailsAPI";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import {   IoAddCircleOutline } from "react-icons/io5";
import AdminCourseCard from "./AdminCourseCard";
 
const AdminCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  // Assuming Redux state structure: state.auth.token
  const { token } = useSelector((state) => state.auth);

  const getAllCourses = async () => {
    try {
      setLoading(true);
      // NOTE: Using the user's original logic which assumes the response is the courses array
      const response = await fetchAdminCourses(token);
      if (response) {
        // Sort by creation date (newest first) for better display
        const sortedCourses = response.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setCourses(sortedCourses);
      }
    } catch (error) {
      toast.error("Failed to fetch courses");
      console.error("Error fetching all courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  const deleteCourseHandler = async (courseId) => {
   // const toastId = toast.loading("Confirming and deleting course...");
    try {
      
      await deleteCourse({ courseId }, token); 
    //  toast.success("Course deleted successfully!");
      // Update state immediately to remove the deleted course from the UI
      setCourses(courses.filter(course => course._id !== courseId));
    } catch (error) {
    //  toast.error("Failed to delete course");
     // console.error("Error deleting course:", error);
    } finally {
      //toast.dismiss(toastId);
    }
  };

  return (
    <div className="w-full min-h-screen p-4 sm:p-6 lg:p-8">
      
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-richblack-700">
        <h1 className="text-richblack-5 font-bold text-3xl sm:text-4xl tracking-tight">
          All Platform Courses 📚
        </h1>
    
      </div>
      
       
      {loading ? (
        // Enhanced Loading State
        <div className="flex flex-col justify-center items-center py-20 bg-richblack-800 rounded-lg shadow-inner  ">
          <div className="w-16 h-16 border-4 border-t-yellow-50 border-richblack-700 rounded-full animate-spin"></div>
          <p className="mt-4 text-yellow-50 font-medium text-lg">Loading Courses...</p>
        </div>
      ) : courses.length > 0 ? (
         
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {courses.map((course) => (
            <AdminCourseCard
              key={course._id} 
              deleteCourseHandler={deleteCourseHandler}
              course={course}
            />
          ))}
        </div>
      ) : (
        // Empty State
        <div className="flex flex-col justify-center items-center py-20 bg-richblack-800 border-2 border-dashed border-richblack-700 rounded-lg h-64">
          <p className="text-richblack-200 text-2xl font-semibold mb-2">
            No Courses Found
          </p>
          <p className="text-richblack-400">
            The platform currently has no published or drafted courses.
          </p>
    
        </div>
      )}
    </div>
  );
};

export default AdminCourse;