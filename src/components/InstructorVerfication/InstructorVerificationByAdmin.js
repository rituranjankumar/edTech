import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { FaCheck } from "react-icons/fa";
import { pendingInstructor, verifyInstructor } from "../../services/operations/authAPI";
import toast from "react-hot-toast";

const InstructorVerificationByAdmin = () => {
  const { token } = useSelector((state) => state.auth);
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPendingInstructors = async () => {
    setLoading(true);
    const data = await pendingInstructor(token);
    if(data)
    {
      //  toast.success(" Pending Instructor fetched successfully")
    }
    setInstructors(data);
  //  console.log("pending instructor data ",data);
    setLoading(false);
  };

  const handleVerify = async (instructorId) => {
    //console.log("instructor id befire verifucation ",instructorId)
    const result = await verifyInstructor(token, instructorId);
  //  console.log("updated instructor is ",result)
    if (result) {
      // Remove verified instructor from list
      setInstructors((prev) => prev.filter((user) => user._id !== instructorId));
    }
  };

  useEffect(() => {
    fetchPendingInstructors();
   // console.log("called times")
  }, []);

  if (loading) return <div className="text-white text-xl">Loading...</div>;

  return (
    <div className="text-white px-4 sm:px-6 py-4 sm:py-6">
  <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Pending Instructor Approvals</h2>

  {instructors?.length === 0 ? (
    <p className="text-gray-400 text-sm sm:text-base">No pending instructors.</p>
  ) : (
    <div className="flex flex-col gap-3 sm:gap-4">
      {instructors?.map((instructor) => (
        <div
          key={instructor._id}
          className="flex flex-col sm:flex-row sm:items-center justify-between bg-richblack-700 p-3 sm:p-4 rounded-lg shadow-sm border border-richblack-600 gap-3 sm:gap-0"
        >
          <div className="flex items-center gap-3 sm:gap-4">
            <img
              src={instructor?.image}
              alt={instructor?.firstName}
              className="w-10 h-10 sm:w-14 sm:h-14 rounded-full object-cover border border-richblack-300"
            />
            <div>
              <p className="text-base sm:text-lg font-semibold">
                {instructor?.firstName} {instructor?.lastName}
              </p>
              <p className="text-xs sm:text-sm text-richblack-200">{instructor?.email}</p>
            </div>
          </div>

          <button
            onClick={() => handleVerify(instructor?._id)}
            className="flex items-center justify-center gap-2 bg-yellow-300 text-black px-3 py-1 sm:px-4 sm:py-2 rounded-md font-medium sm:font-semibold hover:bg-yellow-400 transition-all duration-200 text-sm sm:text-base"
          >
            <FaCheck size={14} className="sm:w-auto" /> Verify
          </button>
        </div>
      ))}
    </div>
  )}
</div>
  );
};

export default InstructorVerificationByAdmin;
