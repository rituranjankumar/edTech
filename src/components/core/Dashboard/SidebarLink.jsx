import React from 'react'
import * as Icons from 'react-icons/vsc'
import * as MdIcons from 'react-icons/md'
import { MdPendingActions } from 'react-icons/md'
 
import { useDispatch } from 'react-redux'
import { matchRoutes, NavLink, useLocation } from 'react-router-dom'

// Mapping of icon prefixes to libraries
 

 

const SidebarLink = ({ link, iconName }) => {
 
  
  const Icon =  Icons[iconName];
  //console.log('Icon for', iconName, 'is', Icon)  
  const location = useLocation()
  const dispatch = useDispatch()

  const matchRoute = (route) => {
    return matchRoutes([{ path: route }], location.pathname)
  }

  return (
    <NavLink
      to={link.path}
      className={`border-l-4 px-4 text-sm font-medium transition-all py-2 rounded ${matchRoute(`/dashboard/${link.path}`)
          ? 'bg-yellow-600 border-yellow-400 text-black rounded'
          : 'bg-opacity-0 border-transparent'
        }`}
    >
      <div className='flex items-center gap-x-2'>
        {link.name === "Verify Instructor" ? (
          <MdPendingActions className="text-lg text-richblack-50" />
        ) : (
          <Icon className="text-lg text-richblack-50" />
        )}

        <span className='text-richblack-50'>{link.name}</span>
      </div>
    </NavLink>
  )
}

export default SidebarLink
