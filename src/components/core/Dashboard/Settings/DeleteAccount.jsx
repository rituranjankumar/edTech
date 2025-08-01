import React, { useState } from 'react'
import { MdDelete } from "react-icons/md";
import ConfirmationModal from '../../../common/ConfirmationModal';
import { apiConnector } from '../../../../services/apiconnector';
import { useDispatch, useSelector } from 'react-redux';
import { settingsEndpoints } from '../../../../services/apis';
import { accountDelete } from '../../../../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';

const DeleteAccount = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile)
    const [modal, setModal] = useState(null);
    return (
      <div className="flex flex-col sm:flex-row max-w-4xl w-full justify-center p-4 sm:p-6 bg-red-800 mx-auto text-richblack-100 rounded-lg">

  {/* Icon on the left */}
  <div className="flex justify-center sm:items-start pr-0 sm:pr-4 pt-0 sm:pt-1 mb-3 sm:mb-0">
    <MdDelete className="text-red-600 bg-red-700 rounded-full p-1 sm:p-2 text-4xl sm:text-5xl" />
  </div>

  {/* Text and button on the right */}
  <div className="flex flex-col gap-1 sm:gap-2">
    <p className="text-base sm:text-lg font-semibold">Delete Account</p>

    <p className="text-xs sm:text-sm">
      Would you like to delete your account?
    </p>

    <p className="text-xs sm:text-sm">
      This account contains Paid Courses. Deleting your account will remove all the content associated with it.
    </p>

    <button 
      onClick={() => {
        setModal({
          text1: "Are you sure?",
          text2: "Your account will be deleted permanently",
          btn1Text: "Delete",
          btn2Text: "Cancel",
          btn1Handler: () => dispatch(accountDelete(navigate, token)),
          btn2Handler: () => setModal(null)
        })
      }} 
      className="mt-3 sm:mt-4 w-full sm:w-fit px-3 sm:px-4 py-1.5 sm:py-2 bg-red-800 hover:bg-red-900 rounded text-sm sm:text-base"
    >
      I want to delete my account
    </button>
    
    {modal && <ConfirmationModal modalData={modal} />}
    
    {user?.deletionDate && (
      <div className="mt-3 sm:mt-4 bg-yellow-100 text-yellow-800 p-2 sm:p-3 rounded text-xs sm:text-sm">
        Your account is scheduled to be deleted on:{" "}
        <span className="font-semibold">
          {new Date(user.deletionDate).toLocaleString()}
        </span>
      </div>
    )}
  </div>
</div>
    )
}

export default DeleteAccount
