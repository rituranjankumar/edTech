import { toast } from "react-hot-toast"
 
import { setLoading, setOtp, setPasswordReset, setToken } from "../../slices/authSlice"
import { resetCart } from "../../slices/cartSlice"
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { endpoints } from "../apis"
import { settingsEndpoints,profileEndpoints } from "../apis"
 
const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints


const { GET_USER_DETAILS_API, GET_USER_ENROLLED_COURSES_API } = profileEndpoints

export function getUserDetails(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
        Authorization: `Bearer ${token}`,
      })
    //  console.log("GET_USER_DETAILS API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      const userImage = response?.data?.userDetails?.image
        ?  response?.data?.userDetails?.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response?.data?.userDetails?.firstName} ${response?.data?.userDetails?.lastName}`
      dispatch(setUser({ ... response?.data?.userDetails, image: userImage }))
    } catch (error) {
      dispatch(logout(navigate))
    //  console.log("GET_USER_DETAILS API ERROR............", error)
      toast.error("Could Not Get User Details")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}

export async function getUserEnrolledCourses(token) {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    const headers={
      authorization:`Bearer ${token}`
    }
   // console.log("BEFORE Calling BACKEND API FOR ENROLLED COURSES");
    const response = await apiConnector(
      "GET",
      GET_USER_ENROLLED_COURSES_API,
      token,
       headers
    )
   // console.log("AFTER Calling BACKEND API FOR ENROLLED COURSES");
    // console.log(
    //   "GET_USER_ENROLLED_COURSES_API API RESPONSE............",
    //   response
    // )

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data.data
  } catch (error) {
    //console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
    toast.error("Could Not Get Enrolled Courses")
  }
  toast.dismiss(toastId)
  return result
}


export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      })
     // console.log("SENDOTP API RESPONSE............", response)

     // console.log(response.data.success)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("OTP Sent Successfully")
      dispatch(setOtp(response.data.data))
       if (navigate) {
      navigate("/verify-email")
    }
     
    } catch (error) {
   //   console.log("SENDOTP API ERROR............", error)
      toast.error("Could Not Send OTP")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      })

     //console.log("SIGNUP API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Signup Successful")
      navigate("/login")
    } catch (error) {
     // console.log("SIGNUP API ERROR............", error.response )
      toast.error(error.response.data.message || "Signup Failed")
     // navigate("/signup")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function login({email, password}, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      })

    //  console.log("LOGIN API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Login Successful")
      dispatch(setToken(response.data.token))
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
        
      //  console.log("user data",response.data.user)
      dispatch(setUser({ ...response.data.user, image: userImage }))
      localStorage.setItem("token", JSON.stringify(response.data.token))
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/dashboard/my-profile")
      
    } catch (error) {
    //  console.log("LOGIN API ERROR............", error)
      toast.error("Login Failed",
        {
          duration:10000
        }
      )
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {
        email,
      })

   //   console.log("RESETPASSTOKEN RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      if(response.data.success)
      {
        dispatch(setPasswordReset(response?.data?.data))
      }
      toast.success("Reset Email Sent")
      setEmailSent(true)
    } catch (error) {
    //  console.log("RESETPASSTOKEN ERROR............", error)
      toast.error("Failed To Send Reset Email")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}

export function resetPassword(password, confirmPassword, token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        password,
        confirmPassword,
        token,
      })

     // console.log("RESETPASSWORD RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Password Reset Successfully")
      navigate("/login")
    } catch (error) {
    //  console.log("RESETPASSWORD ERROR............", error)
      toast.error("Failed To Reset Password")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}


export async function pendingInstructor(token) {
 
    const toastId=toast.loading("loading...")
    let result=[];
    try {
      const response = await  apiConnector("GET",profileEndpoints.GET_PENDING_INSTRUCTORS,null,{
        Authorization:`Bearer ${token}`
      })

       
        //  console.log("PENGINF INSTRUCTOR GET API RESPNSE ",response)
      if (!response.data.success) {
        toast.error("error in getting pending instructor")
      // console.error("Failed:",  response?.data?.data?.message);
        return [];
      }  
      result=response?.data?.data;
       
     
    } catch (error) {
    //  console.error("Error fetching pending instructors:", error);
      return [];
    }
    
      toast.dismiss(toastId);
    return result;
    
  };
 
  export async function verifyInstructor(token, instructorId) {
  const toastId = toast.loading("Verifying instructor...");

  try {
    const response = await apiConnector(
      "POST",
      profileEndpoints.VERIFY_INSTRUCTOR,
       { instructorId }, // assuming you're passing ID in body
      {
        Authorization: `Bearer ${token}`,
      }
    );

    //console.log("INSTRUCTOR VERIFICATION API RESPONSE", response);

    if (!response?.data?.success) {
      toast.error("Error verifying instructor");
     // console.error("Verification failed:", response?.data?.message);
      return null;
    }

    toast.success("Instructor verified successfully");
    return response.data.updatedInstructor  ;
  } catch (error) {
   // console.error("Error verifying instructor:", error);
    toast.error("Failed to verify instructor");
    return null;
  } finally {
    toast.dismiss(toastId);
  }
}
   
export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    dispatch(resetCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    // localStorage.removeItem("cart" )
    // localStorage.removeItem("total" )
    // localStorage.removeItem("totalItems" )
    toast.success("Logged Out")
    navigate("/")
  }
}

export function accountDelete(navigate,token)
{
  return async(dispatch)=>
  {
    try{
      const headers={
        authorization:`Bearer ${token}`
      }

      const response=await apiConnector("DELETE",settingsEndpoints.DELETE_PROFILE_API,null,headers)


     const updatedUser = response?.data?.updatedUser;

     
      if (updatedUser) {
        // Save in Redux
        dispatch(setUser(updatedUser));
        // Save in localStorage
        localStorage.setItem("user", JSON.stringify(updatedUser));

        toast.success(
          `Account scheduled for deletion on ${new Date(updatedUser.deletionDate).toLocaleString()}`
        );
      }
      dispatch(logout(navigate));

      navigate("/");
    }catch(error)
    {
      toast.error("failed to delete the account")
    //  console.log("error in deleting the account ",error.response);

    }
  }
  
}

