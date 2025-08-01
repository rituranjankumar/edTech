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
        <div className="flex max-w-4xl w-full justify-center p-6 bg-red-800 mx-auto text-richblack-100 rounded-lg">

            {/* Icon on the left */}
            <div className="flex items-start pr-4 pt-1">
                <MdDelete className="text-red-600 bg-red-700 rounded-full p-2 text-5xl" />
            </div>

            {/* Text and button on the right */}
            <div className="flex flex-col gap-2">
                <p className="text-lg font-semibold">Delete Account</p>

                <p className="text-sm">Would you like to delete your account?</p>

                <p className="text-sm">
                    This account contains Paid Courses. Deleting your account will remove all the content associated with it.
                </p>

                <button onClick={() => {
                    setModal({
                        text1: "Are you sure ?",
                        text2: "Your account will be deleted ",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: () => dispatch(accountDelete(navigate, token)),
                        btn2Handler: () => setModal(null)
                    })
                }} className="mt-4 w-fit px-4 py-2 bg-red-800 hover:bg-red-900 rounded">
                    I want to delete my account
                </button>
            </div>
            
            {modal && <ConfirmationModal modalData={modal} />}
            {user?.deletionDate && (
                <div className="mt-4 bg-yellow-100 text-yellow-800 p-3 rounded">
                    Your account is scheduled to be deleted on:{" "}
                    <span className="font-semibold">
                        {new Date(user.deletionDate).toLocaleString()}
                    </span>
                </div>
            )}


        </div>
    )
}

export default DeleteAccount
