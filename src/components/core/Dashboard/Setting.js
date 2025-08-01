import React from 'react'
import ProfileChange from   "./Settings/ProfileChange"
import UpdateProfile from './Settings/UpdateProfile'
import PasswordChange from './Settings/PasswordChange'
import DeleteAccount from './Settings/DeleteAccount'
const Setting = () => {
  return (
    <div className='flex flex-col gap-5'>
    <ProfileChange/>

    <UpdateProfile/>

    <PasswordChange/>

      <DeleteAccount/>
     </div>
  )
}

export default Setting