import React from "react";

const SkeletonCart = () => {
  return (
    <div className="flex flex-col gap-4 mt-6 animate-pulse">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="bg-richblack-800 p-4 rounded-lg flex gap-4 items-center"
        >
          <div className="w-24 h-24 bg-richblack-700 rounded"></div>
          <div className="flex flex-col gap-2 w-full">
            <div className="h-4 bg-richblack-700 rounded w-3/4"></div>
            <div className="h-3 bg-richblack-700 rounded w-1/2"></div>
            <div className="h-3 bg-richblack-700 rounded w-1/3"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonCart;
