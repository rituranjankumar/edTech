import React from 'react'
import IconBtn from './IconBtn'

const ConfirmationModal = ({ modalData }) => {
  return (
    
    <div className="inset-0 fixed bg-black bg-opacity-50 flex items-center justify-center z-50 h-screen w-screen px-2 sm:px-4">
  <div className="bg-richblack-800 rounded-2xl p-4 sm:p-5 max-w-sm sm:max-w-md w-full">
    <p className="text-richblack-50 text-base sm:text-lg font-semibold mb-3 sm:mb-4 pt-2">
      {modalData.text1}
    </p>
    <p className="text-richblack-50 text-base sm:text-lg font-semibold mb-6 sm:mb-10">
      {modalData.text2}
    </p>
    <div className="flex flex-col sm:flex-row justify-center sm:justify-around gap-3 sm:gap-4">
      <IconBtn
        onClick={modalData.btn1Handler}
        text={modalData.btn1Text}
        className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 duration-75 transition"
      />
      <button
        onClick={modalData.btn2Handler}
        className="bg-gray-700 text-richblack-300 px-4 py-2 rounded hover:bg-gray-600 transition duration-75"
      >
        {modalData.btn2Text}
      </button>
    </div>
  </div>
</div>

  );
};



export default ConfirmationModal