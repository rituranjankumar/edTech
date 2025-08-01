import React, { useState } from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import { logout } from '../../../services/operations/authAPI'
import { useSelector,useDispatch } from 'react-redux'
import SidebarLink from './SidebarLink'
import { VscSignOut } from 'react-icons/vsc'
import { useNavigate } from 'react-router-dom'
import ConfirmationModal from '../../common/ConfirmationModal'
const Sidebar = () => {


const navigate=useNavigate();
    const dispatch=useDispatch();

    const [confirmationModal,setConfirmationModal]=useState(null);
    const {user,loading:profileLoading}=useSelector((state)=> state.profile);
    // console.log("in side bar -> ",user)
    const {loading:authLoading}=useSelector((state)=> state.auth)
console.log("User Account Type:", user?.accountType);

    if(profileLoading || authLoading)
{
    return (
        <span className='loadder flex items-center justify-center'></span>
    )
}
  return (
    <div> 
        <div className='flex relative min-w-[222px] flex-col border-r-[1px] border-r-richblack-700  h-full
        bg-richblack-800 py-10'>

                <div className='flex flex-col'>
                            {
                                sidebarLinks.map((link)=>
                                {
                                    if(link.type && user?.accountType!==link.type ) return null;

                                    return (
                                        <SidebarLink key={link.id} link={link} iconName={link.icon}/>
                                    ) 
                            })
                            }


                </div>

                <div className='mx-auto  mt-6 mb-6 h-[1px] w-11/12 bg-richblack-50'> </div>

                <div className='flex flex-col'> 
                            <SidebarLink 
                                link={{name:"Settings",path:"settings"}}

                                iconName= "VscSettingsGear"
                            />

                            <button onClick={()=>
                               setConfirmationModal( {
                                    text1:"Are you sure ?",
                                    text2 : "You will be logged out of your account",
                                    btn1Text:"Logout",
                                    btn2Text:"Cancel",
                                    btn1Handler:()=> dispatch(logout(navigate)),
                                     btn2Handler: ()=> setConfirmationModal(null)
                                })
                            } 
                            className='text-md flex justify-start hover:text-[17px] transition-all duration-100 px-5 font-medium text-richblack-50 '
                            >
                                <div className='flex items-center gap-x-2'>
                                    <VscSignOut className='text-lg'/>
                                    <span>Logout</span>
                                </div>
                            </button>
                </div>
        </div>   

        {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>} 
    </div>
  )
}

export default Sidebar