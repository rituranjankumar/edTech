import { useState } from "react"
import { BiArrowBack } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { getPasswordResetToken } from "../services/operations/authAPI"

function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [emailSent, setEmailSent] = useState(false)
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.auth)
const {passwordResetUrl : passwordResetToken} = useSelector((state) => state.auth)
  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(getPasswordResetToken(email, setEmailSent))
  }

  return (
   <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center p-4 sm:p-6">
  {loading ? (
    <div className="loader"></div>
  ) : (
    <div className="max-w-[500px] w-full p-4 lg:p-8">
      <h1 className="text-2xl sm:text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
        {!emailSent ? "Reset your password" : "Check email"}
      </h1>
      <p className="my-3 sm:my-4 text-base sm:text-[1.125rem] leading-[1.625rem] text-richblack-100">
        {!emailSent
          ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
          : `We have sent the reset email to ${email}`}
      </p>

      {emailSent && (
  <div className="rounded-lg border border-yellow-400 bg-yellow-50 p-4 mt-4">
    <p className="font-semibold text-yellow-800">
      ⚠️ Demo Mode – Email Delivery Disabled
    </p>

    <p className="mt-1 text-sm text-yellow-700">
      This application is running in <strong>demo mode</strong>. 
      The password reset email is normally sent to your email address, 
      but email delivery is disabled because production email services 
      require a verified domain.
    </p>

    <p className="mt-2 text-sm text-yellow-700">
      For demonstration purposes, the password reset link is displayed below.
      In a real production environment, you would receive this link in your inbox.
    </p>

    <a href={passwordResetToken} className="mt-3 break-all text-blue-600 underline">
      {passwordResetToken}
    </a>
  </div>
)}

      <form onSubmit={handleOnSubmit}>
        {!emailSent && (
          <label className="w-full">
            <p className="mb-1 text-sm sm:text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Email Address <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              className="form-style p-3 bg-richblack-700 text-richblack-100 rounded-xl w-full text-sm sm:text-base"
            />
          </label>
        )}
        <button
          type="submit"
          className="mt-4 sm:mt-6 w-full rounded-[8px] bg-yellow-50 py-2 sm:py-[12px] px-3 sm:px-[12px] font-medium text-richblack-900 text-sm sm:text-base"
        >
          {!emailSent ? "Submit" : "Resend Email"}
        </button>
      </form>
      <div className="mt-4 sm:mt-6 bg-yellow-50 w-fit p-2.5 rounded-md hover:bg-yellow-400 transition-all duration-200 flex items-center justify-between">
        <Link to="/login">
          <p className="flex items-center gap-x-2   text-richblack-900 text-sm sm:text-base">
            <BiArrowBack /> Back To Login
          </p>
        </Link>
      </div>
    </div>
  )}
</div>
  )
}

export default ForgotPassword