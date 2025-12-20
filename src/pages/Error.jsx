import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaHome } from "react-icons/fa";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-richblack-900 px-4 text-center">
      
      {/* Illustration */}
      <img
        src="https://illustrations.popsy.co/gray/falling.svg"
        alt="Page Not Found"
        className="w-64   sm:w-72 md:w-80 mb-6 hover:scale-105 transition-transform duration-300"
      />

      {/* 404 Text */}
      <h1 className="text-6xl md:text-7xl font-extrabold text-red-500">
        404
      </h1>

      <p className="mt-2 text-2xl font-semibold text-richblack-50">
        Page Not Found
      </p>

      <p className="mt-3 text-sm sm:text-base text-richblack-300 max-w-md">
        Sorry, the page you’re looking for doesn’t exist or has been moved.
        Let’s get you back to somewhere safe.
      </p>

      {/* Buttons */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-6 py-2 rounded-lg font-semibold bg-yellow-400 text-richblack-900 hover:bg-yellow-300 transition-all duration-300"
        >
          <FaArrowLeft />
          Go Back
        </button>

        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 px-6 py-2 rounded-lg font-semibold border border-richblack-600 text-richblack-50 hover:bg-richblack-800 transition-all duration-300"
        >
          <FaHome />
          Home
        </button>
      </div>
    </div>
  );
};

export default Error;
