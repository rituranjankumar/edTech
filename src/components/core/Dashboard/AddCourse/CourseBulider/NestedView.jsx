import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RxDropdownMenu } from "react-icons/rx"
import { MdEdit } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"
import { BiDownArrow } from "react-icons/bi"
import { AiOutlinePlus } from "react-icons/ai"
import SubSectionModal from './SubSectionModal'
import ConfirmationModal from '../../../../common/ConfirmationModal'
import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseDetailsAPI'
import { setCourse } from '../../../../../slices/courseSlice'

const NestedView = ({ handleChangeEditSectionName }) => {
    const { course } = useSelector((state) => state.course)
    const { token } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const [addSubSection, setAddSubSection] = useState(null)
    const [viewSubSection, setViewSubSection] = useState(null)
    const [editSubSection, setEditSubSection] = useState(null)
    const [confirmationModal, setConfirmationModal] = useState(null)

    useEffect(() => {
       // console.log("REndering it again")
    })

    const handleDeleteSection = async (sectionId) => {
        const result = await deleteSection({
            sectionId,
            courseId: course._id
        }, token)
        if (result) {
            dispatch(setCourse(result))
        }
        setConfirmationModal(null)
    }

    const handleDeleteSubSection = async (subSectionId, sectionId) => {
        const result = await deleteSubSection({ subSectionId, sectionId, token })
        if (result) {
            dispatch(setCourse(result))
        }
        setConfirmationModal(null)
    }
// console.log("in the nested view ",course)
    return (
        <div>
            <div className='rounded-lg text-white bg-richblack-700 p-6 px-8 space-y-6'>
                {course?.courseContent?.map((section) => (
                    <details key={section._id} open className='border border-richblack-600 rounded-md overflow-hidden'>
                        <summary className='flex items-center justify-between gap-x-3 px-4 py-2 bg-richblack-600 cursor-pointer'>
                            <div className='flex items-center gap-x-3'>
                                <RxDropdownMenu />
                                <p className='font-medium'>{section.sectionName}</p>
                            </div>
                            <div className='flex items-center gap-x-4 text-lg'>
                                <button onClick={() => handleChangeEditSectionName(section._id, section.sectionName)}>
                                    <MdEdit className='hover:text-yellow-50' />
                                </button>
                                <button
                                    onClick={() =>
                                        setConfirmationModal({
                                            text1: "Delete this Section",
                                            text2: "All the lectures in this section will be deleted",
                                            btn1Text: "Delete",
                                            btn2Text: "Cancel",
                                            btn1Handler: () => handleDeleteSection(section._id),
                                            btn2Handler: () => setConfirmationModal(null),
                                        })
                                    }
                                >
                                    <RiDeleteBin6Line className='hover:text-pink-200' />
                                </button>
                                <span className='text-richblack-300'>|</span>
                                <BiDownArrow className='text-xl text-richblack-300' />
                            </div>
                        </summary>

                        <div className='px-6 py-4 space-y-4 bg-richblack-800'>
                            {section?.subSection?.map((data) => (
                                <div
                                    key={data?._id}
                                    className='flex items-center justify-between gap-x-3 border-b border-richblack-600 pb-2'
                                >
                                    <div onClick={() => setViewSubSection(data)} className='flex items-center gap-x-3 cursor-pointer'>
                                        <RxDropdownMenu />
                                        <p>{data.title}</p>
                                    </div>

                                    <div className='flex items-center gap-x-3 text-lg'>
                                        <button onClick={() => setEditSubSection({ ...data, sectionId: section._id })}>
                                            <MdEdit className='hover:text-yellow-50' />
                                        </button>
                                        <button
                                            onClick={() =>
                                                setConfirmationModal({
                                                    text1: "Delete this Sub Section",
                                                    text2: "Selected Lecture will be deleted",
                                                    btn1Text: "Delete",
                                                    btn2Text: "Cancel",
                                                    btn1Handler: () => handleDeleteSubSection(data._id, section._id),
                                                    btn2Handler: () => setConfirmationModal(null)
                                                })
                                            }
                                        >
                                            <RiDeleteBin6Line className='hover:text-pink-200' />
                                        </button>
                                    </div>
                                </div>
                            ))}

                            <button
                                onClick={() => setAddSubSection(section._id)}
                                className='mt-2 flex items-center gap-x-2 text-yellow-50 text-sm hover:underline'
                            >
                                <AiOutlinePlus />
                                <p>Add Lecture</p>
                            </button>
                        </div>
                    </details>
                ))}
            </div>

            {addSubSection ? (
                <SubSectionModal modalData={addSubSection} setModalData={setAddSubSection} add={true} />
            ) : viewSubSection ? (
                <SubSectionModal modalData={viewSubSection} setModalData={setViewSubSection} view={true} />
            ) : editSubSection ? (
                <SubSectionModal modalData={editSubSection} setModalData={setEditSubSection} edit={true} />
            ) : (
                <div></div>
            )}

            {confirmationModal ? (
                <ConfirmationModal modalData={confirmationModal} />
            ) : (
                <div></div>
            )}
        </div>
    )
}

export default NestedView
