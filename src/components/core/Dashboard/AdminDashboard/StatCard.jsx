import React from "react";

const StatCard=({title,value})=>
{

    return (
        <div className="bg-richblack-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-richblack-700">
                <div className="text-richblack-300 text-sm font-medium mb-2">{title}</div>
                <div className="text-3xl font-bold text-yellow-50">{value}</div>
        </div>
    )
}

export default StatCard