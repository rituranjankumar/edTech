import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
 
import { addNewCategory, fetchCourseCategories } from "../../../services/operations/courseDetailsAPI";
import { useSelector } from "react-redux";

const CreateCategory = () => {
  const { register, handleSubmit, reset } = useForm();
  const [categories, setCategories] = useState([]);
    const {token}=useSelector((state)=>state.auth)
  const fetchCategories = async () => {
    try {
      const res = await  fetchCourseCategories();
      
      setCategories(res);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };
        //console.log("all ",categories)
  const onSubmit = async (data) => {
    try {
      const res = await  addNewCategory(data,token)
   //   console.log(res);
      if (res) {
        // refresh list
       await fetchCategories()
       //  console.log("new category  ",res)
        reset(); // reset form
      }
    } catch (error) {
      console.error("Failed to create category:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl text-richblack-50 font-bold mb-4">Create Category</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-richblack-700 p-4 rounded shadow">
        <div>
          <label className=" text-richblack-50 p-1 relative font-medium mb-2">Name <sup className="text-red-500 absolute top-0 text-lg">*</sup></label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="w-full border border-richblack-300 bg-richblack-800 text-richblack-50 p-2 rounded"
            placeholder="Enter category name"
          />
        </div>

        <div>
          <label className="  text-richblack-50 relative p-1 font-medium mb-2">Description <sup className="text-red-500 absolute top-0 text-lg">*</sup></label>
          <textarea
            {...register("description", { required: true })}
            className="w-full border border-richblack-300 bg-richblack-800 text-richblack-50 p-2 rounded"
            placeholder="Enter category description"
          />
        </div>

        <button type="submit" className="bg-yellow-50 text-richblack-800 hover:bg-yellow-200 px-4 py-2 rounded">
          Create Category
        </button>
      </form>

      <div className="mt-8 bg-richblack-700 p-2 rounded">
        <h3 className="text-xl text-richblack-50 font-semibold mb-2">All Categories</h3>
        {categories.length === 0 ? (
          <p className="text-richblack-50">No categories found.</p>
        ) : (
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li key={cat._id} className="p-3 border border-richblack-100 rounded shadow-sm">
                <h4 className="font-bold text-richblack-50">{cat.name}</h4>
                <p className="text-sm text-richblack-50">{cat.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CreateCategory;
