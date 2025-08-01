import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/core/Dashboard/Sidebar';

const Dashboard = () => {

    const authLoading=useSelector((state)=> state.auth.loading);

const profileLoading=useSelector((state)=> state.profile.loading);

console.log("dashboard rendered");
if(profileLoading || authLoading)
{
    return (
      <span class="loadder"></span>
         
    )
}
  return (
    <div className='relative flex min-h-[calc(100vh-3.5rem)]'>
   
    <Sidebar />
   
  
  <div className='min-h-[calc(100vh-3.5rem)] w-full md:w-11/12 overflow-auto'>
    <div className='mx-auto w-11/12 max-w-[1000px] py-6 sm:py-8 md:py-10 px-4 sm:px-6'>
      <Outlet />
    </div>
  </div>
</div>
  )
}

export default Dashboard