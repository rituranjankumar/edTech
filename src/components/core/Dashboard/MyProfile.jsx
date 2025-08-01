import React from 'react'
import Dashboard from '../../../pages/Dashboard'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconBtn from '../../common/IconBtn'

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate();

  console.log("my profile rendered");

  return (
    <div className='text-white w-full flex justify-center items-center px-4 py-10'>
      <div className='flex flex-col space-y-10   '>

        {/* Profile Heading */}
        <div className='flex items-start justify-start'>
          <h1 className='text-3xl text-richblack-50 font-semibold'>My Profile</h1>
        </div>

        {/* Profile Picture and Basic Info */}
        <div className='flex items-center justify-between bg-richblack-800 p-6 rounded-xl flex-wrap gap-6'>
          <div className='flex items-center gap-4'>
            <img
              src={`${user?.image}`}
              className="aspect-square w-[78px] rounded-full object-cover"
              alt={`${user?.firstName}`} />
            <div>
              <p className='text-lg font-semibold'>{user?.firstName} {user?.lastName}</p>
              <p className='text-richblack-300'>{user?.email}</p>
            </div>
          </div>

          <IconBtn
            className='text-lg hover:bg-yellow-300 transition-all duration-100 hover:text-xl text-richblack-900 bg-yellow-500 px-4 py-2 rounded-lg'
            text="Edit"
            onClick={() => {
              navigate("/dashboard/settings")
            }}
          />
        </div>

        {/* About Section */}
        <div className='border-t bg-richblack-800 p-6 rounded-xl border-richblack-600 pt-6'>
          <div className='flex justify-between items-center mb-2'>
            <p className='text-xl font-semibold'>About</p>
            <IconBtn
              className='text-lg hover:bg-yellow-300 transition-all duration-100 hover:text-xl text-richblack-900 bg-yellow-500 px-4 py-2 rounded-lg'
              text="Edit"
              onClick={() => {
                navigate("/dashboard/settings")
              }}
            />
          </div>
          <p className='text-richblack-300'>
            {user?.additionalDetails.about ? user.additionalDetails.about : "Tell us something about yourself"}
          </p>
        </div>

        {/* Personal Details Section */}
        <div className='border-t bg-richblack-800 p-6 rounded-xl border-richblack-600 pt-6'>
          <div className='flex justify-between items-center mb-4'>
            <p className='text-xl font-semibold capitalize'>Personal Details</p>
            <IconBtn
              className='text-lg hover:bg-yellow-300 transition-all duration-100 hover:text-xl text-richblack-900 bg-yellow-500 px-4 py-2 rounded-lg'
              text="Edit"
              onClick={() => {
                navigate("/dashboard/settings")
              }}
            />
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10'>
            <div>
              <p className='text-sm text-richblack-400'>First Name</p>
              <p>{user?.firstName}</p>
            </div>

            <div>
              <p className='text-sm text-richblack-400'>Email</p>
              <p>{user?.email}</p>
            </div>

            <div>
              <p className='text-sm text-richblack-400'>Gender</p>
              <p>{user?.additionalDetails?.gender}</p>
            </div>

            <div>
              <p className='text-sm text-richblack-400'>Last Name</p>
              <p>{user?.lastName}</p>
            </div>

            <div>
              <p className='text-sm text-richblack-400'>Phone Number</p>
              <p>{user?.additionalDetails?.contactNumber}</p>
            </div>

            <div>
              <p className='text-sm text-richblack-400'>Date Of Birth</p>
              <p>{user?.additionalDetails?.dateOfBirth ? user?.additionalDetails?.dateOfBirth : "Add date of birth"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile
