import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaUserClock } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { getUserDetails } from '../../services/operations/authAPI';
 

const PendingVerification = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

useEffect(() => {
  const interval = setInterval(() => {
    dispatch(getUserDetails(token, navigate));
  }, 10000); 

  return () => clearInterval(interval);
}, [token, dispatch, navigate]);

// Another useEffect to redirect when verified
useEffect(() => {
  if (user?.accountType === "Instructor" && user?.isVerified) {
    navigate("/dashboard/my-profile");
  }
}, [user, navigate]);

  return (
   <div className="min-h-[80vh] flex flex-col items-center text-richblack-50 justify-center text-center px-4 sm:px-6 py-8">
  <FaUserClock className="text-yellow-500 text-5xl sm:text-6xl mb-3 sm:mb-4" />
  <h1 className="text-2xl sm:text-3xl text-richblack-50 font-semibold mb-2 sm:mb-3">
    Your Instructor Account is Pending Verification
  </h1>
  <p className="text-base sm:text-lg text-richblack-50 mb-4 sm:mb-6 max-w-lg sm:max-w-xl">
    Hello <span className="font-bold text-richblack-50">{user?.firstName} {user?.lastName}</span>, your account is currently awaiting approval
    from the admin. Once approved, you'll be able to access your instructor dashboard and start uploading courses.
  </p>

  <div className="text-richblack-50 text-sm sm:text-base">
    <p>If you believe this is a mistake, please contact the administrator.</p>
    <Link 
      to="/" 
      className="mt-3 sm:mt-4 inline-block bg-yellow-50 text-richblack-800 py-2 sm:py-2.5 rounded-md px-3 hover:bg-yellow-300 transition-colors duration-300 text-sm sm:text-base"
    >
      Return to Home
    </Link>
  </div>
</div>
  );
};

export default PendingVerification;
