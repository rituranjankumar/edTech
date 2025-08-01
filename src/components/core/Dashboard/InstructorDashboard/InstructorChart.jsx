import React, { useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

const InstructorChart = ({ courses }) => {
  const [currChart, setCurrChart] = useState("students");

  // Function to generate random colors
  const getRandomColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)} , ${Math.floor(Math.random() * 256)})`;
      colors.push(color);
    }
    return colors;
  };

  const studentdata = {
    labels: courses?.map((course) => course.courseName),
    datasets: [
      {
        label: 'Students Enrolled',
        data: courses?.map((course) => course.totalStudentsEnrolled),
        backgroundColor: getRandomColors(courses.length),
        borderWidth: 1,
      },
    ],
  };

  const incomeData = {
    labels: courses?.map((course) => course.courseName),
    datasets: [
      {
        label: 'Income',
        data: courses?.map((course) => course.totalAmountGenerated),
        backgroundColor: getRandomColors(courses.length),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="space-y-6 h-full">
      <h1 className="text-xl font-semibold text-richblack-50">Visualize</h1>

      <div className="flex justify-start">
        <div className="flex gap-x-1 bg-richblack-900 rounded-md p-1">
          <button
            className={`px-3 py-1.5 rounded-md transition-all duration-300 text-sm font-medium 
            ${currChart === "students"
                ? "bg-richblack-600 border border-richblack-500 text-white"
                : "bg-richblack-900 border border-richblack-800 text-richblack-200"
              }`}
            onClick={() => setCurrChart("students")}
          >
            Students
          </button>

          <button
            className={`px-3 py-1.5 rounded-md transition-all duration-300 text-sm font-medium
            ${currChart === "income"
                ? "bg-richblack-600 border border-richblack-500 text-white"
                : "bg-richblack-900 border border-richblack-800 text-richblack-200"
              }`}
            onClick={() => setCurrChart("income")}
          >
            Income
          </button>
        </div>
      </div>

      <div className="max-w-xl h-[80%] mx-auto">
        <Pie data={currChart === "students" ? studentdata : incomeData} />
      </div>
    </div>
  );
};

export default InstructorChart;
