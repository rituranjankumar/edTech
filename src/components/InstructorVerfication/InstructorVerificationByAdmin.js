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
    console.log("pending instructor data ",data);
    setLoading(false);
  };

  const handleVerify = async (instructorId) => {
    console.log("instructor id befire verifucation ",instructorId)
    const result = await verifyInstructor(token, instructorId);
    console.log("updated instructor is ",result)
    if (result) {
      // Remove verified instructor from list
      setInstructors((prev) => prev.filter((user) => user._id !== instructorId));
    }
  };

  useEffect(() => {
    fetchPendingInstructors();
    console.log("called times")
  }, []);

  if (loading) return <div className="text-white text-xl">Loading...</div>;

  return (
    <div className="text-white px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">Pending Instructor Approvals</h2>

      {instructors?.length === 0 ? (
        <p className="text-gray-400">No pending instructors.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {instructors?.map((instructor) => (
            <div
              key={instructor._id}
              className="flex items-center justify-between bg-richblack-700 p-4 rounded-lg shadow-sm border border-richblack-600"
            >
              <div className="flex items-center gap-4">
                <img
                  src={instructor?.image}
                  alt={instructor?.firstName}
                  className="w-14 h-14 rounded-full object-cover border border-richblack-300"
                />
                <div>
                  <p className="text-lg font-semibold">
                    {instructor?.firstName} {instructor?.lastName}
                  </p>
                  <p className="text-sm text-richblack-200">{instructor?.email}</p>
                </div>
              </div>

              <button
                onClick={() => handleVerify(instructor?._id)}
                className="flex items-center gap-2 bg-yellow-300 text-black px-4 py-2 rounded-md font-semibold hover:bg-yellow-400 transition-all duration-200"
              >
                <FaCheck /> Verify
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InstructorVerificationByAdmin;
