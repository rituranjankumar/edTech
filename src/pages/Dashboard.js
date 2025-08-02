import React, { useRef } from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux'
import { FiMenu, FiX } from 'react-icons/fi';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/core/Dashboard/Sidebar';
import useOnClickOutside from '../hooks/useOnClickOutside';

const Dashboard = () => {

    const authLoading=useSelector((state)=> state.auth.loading);

const profileLoading=useSelector((state)=> state.profile.loading);
const [isSidebarOpen, setIsSidebarOpen] = useState(true);
const dashRef=useRef(null);

useOnClickOutside(dashRef,()=>setIsSidebarOpen(false))

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
console.log("dashboard rendered");
if(profileLoading || authLoading)
{
    return (
      <span class="loadder"></span>
         
    )
}

  return (
   <div className='relative flex min-h-[calc(100vh-3.5rem)]'>
      {/* Mobile Toggle Button (visible only on small screens) */}
      <button
        onClick={toggleSidebar}
        className={`fixed z-30 sm:hidden top-15 left-2 p-2 rounded-md bg-richblack-700 text-white`}
      >
        <FiMenu size={24} />  
      </button>

      {/* Sidebar */}
      <div 
      ref={dashRef}
        className={`flex transition-all duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                   fixed sm:relative z-40 h-[calc(100vh-3.5rem)] sm:h-auto sm:translate-x-0`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className={`min-h-[calc(100vh-3.5rem)] w-full ${isSidebarOpen ? 'md:w-11/12' : 'md:w-full'} overflow-auto`}>
        <div className='mx-auto w-11/12 max-w-[1000px] py-6 sm:py-8 md:py-10 px-4 sm:px-2 xs:w-fit'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard