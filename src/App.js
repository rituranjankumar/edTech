import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home"
import Navbar from "./components/common/Navbar"
import OpenRoute from "./components/core/Auth/OpenRoute"
import { useEffect } from "react";
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import Error from "./pages/Error"
import ContactUs from "./pages/ContactUs";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Dashboard from "./pages/Dashboard";
import Setting from "./components/core/Dashboard/Setting";
import PrivateRoute from "./components/core/Auth/PrivateRoutes"
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourse";
import Cart from "./components/core/Dashboard/Cart";
import AddCourse from "./components/core/Dashboard/AddCourse";
 
import InstructorCourse from "./components/core/Dashboard/MyCourses/InstructorCourse";
import { useDispatch, useSelector } from "react-redux";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import { ACCOUNT_TYPE } from "./utils/constants";
import ViewCourse from "./pages/ViewCourseLectures";
import VideoDetails from "./components/core/viewCourse/VideoDetails"
import { jwtDecode } from "jwt-decode";
import { setToken } from "./slices/authSlice";
import { setUser } from "./slices/profileSlice";
import toast from "react-hot-toast";
 import PendingVerification from "./components/InstructorVerfication/PendingVerification";
 
import InstructorVerificationByAdmin from "./components/InstructorVerfication/InstructorVerificationByAdmin";
import CreateCategory from "./components/core/Dashboard/CreateCategory";
import Admin from "./components/core/Dashboard/Instructor/Instructor";
import AdminCourse from "./components/core/Dashboard/MyCourses/AdminCourses";
import AdminDashboard from "./components/core/Dashboard/AdminDashboard/AdminDashboard";

function App() {

const {user}=useSelector((state)=> state.profile);
const dispatch = useDispatch();
const logoutUser = (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  dispatch(setToken(null));
  dispatch(setUser(null));

  toast.error("Session expired. Please login again.");

  setTimeout(() => {
    window.location.href = "/login";
  }, 1500);
};
 //logic to automatic logout user if the token is expired
useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      const expiryTime = decoded.exp * 1000; // Convert to ms
      const currentTime = Date.now();

      if (expiryTime < currentTime) {
        // Token already expired
        logoutUser(dispatch);
      } else {
        // Set timeout for future expiry
        const remainingTime = expiryTime - currentTime;
        const timeoutId = setTimeout(() => {
          logoutUser(dispatch);
        }, remainingTime);

        return () => clearTimeout(timeoutId);
      }
    } catch (err) {
      console.error("Invalid token:", err);
      logoutUser(dispatch);
    }
  }, [dispatch]);

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />

        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />

        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />
        <Route
          path="about"
          element={

            <About />

          }
        />

        <Route
          path="contact"
          element={

            <ContactUs />

          }
        />

        <Route path="/dashboard" element={<PrivateRoute>
           {user?.accountType === "Instructor" && !user?.approved ? (
      <PendingVerification />
    ) : (
      <Dashboard />
    )}
             </PrivateRoute>}  >

              {user && user?.accountType==="Admin" && (<Route path="create-category"  element={<CreateCategory/>} />)}
             {user && user?.accountType==="Admin" && (<Route path="verify-instructor"  element={<InstructorVerificationByAdmin/>} />)}
          {/* Nested route rendered in <Outlet /> */}
          <Route path="my-profile" element={<PrivateRoute><MyProfile /></PrivateRoute>} />
          <Route path="*" element={<Error />} />
          <Route index element={<Error/>} />
          {/* Add other nested routes if needed */}
          <Route path="settings" element={<Setting />} />

          {user && user.accountType === "Student" && ( <Route path="cart" element={<Cart />} />)}
         
          <Route path="enrolled-courses" element={<EnrolledCourses />} />
            {user && (user.accountType==="Instructor" ) && (<Route path="my-courses" element={<InstructorCourse/>}/>)}
             {user && (user.accountType==="Admin") && (<Route path="Admin-courses" element={<AdminCourse/>}/>)}
             {user && (user.accountType==="Admin") && (<Route path="admin-Dashboard" element={<AdminDashboard/>}/>)}
          {user && user.accountType==="Instructor" && (<Route path="add-course" element={<AddCourse/>}/>)}
           {user && user.accountType==="Instructor" && (<Route path="instructor" element={<Admin/>}/>)}
        </Route>

        <Route path="catalog/:catalogName" element={<Catalog/>}/>
        <Route path="courses/:courseId" element={<CourseDetails/>} />

         <Route   element={
               <PrivateRoute>
                 <ViewCourse />
               </PrivateRoute>
             }>
       
             {
               user?.accountType === ACCOUNT_TYPE.STUDENT && (
                 <>
                 <Route 
                   path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                   element={<VideoDetails />}
                 />
                 </>
               )
             }
       
             </Route>

             <Route path="*" element={<Error />} />

      </Routes>



    </div>
  );
}

export default App;
