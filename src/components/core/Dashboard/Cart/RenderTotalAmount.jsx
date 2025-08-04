import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IconBtn from '../../../common/IconBtn';
import { buyCourse } from '../../../../services/operations/studentFeaturesAPI';
import { useNavigate } from 'react-router-dom';

const RenderTotalAmount = () => {
  const { total, cart } = useSelector((state) => state.cart);
  const {token}=useSelector((state) => state.auth);
  const {user}=useSelector((state)=> state.profile);
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleBuyCourse = async () => {
    const courses = cart.map((course) => course._id);
   // console.log("Bought these courses ->", courses);
    // TODO: API integration with payment page
    buyCourse(courses, token, navigate, dispatch, user)
  };

  return (
    <div className="bg-richblack-800 text-white p-6 rounded-xl w-full md:w-[30%] lg:w-[35%] max-w-sm space-y-4 shadow-md">
      <p className="text-xl font-semibold">Total:</p>
      <p className="text-3xl font-bold text-green-400">₹ {total}</p>

      <IconBtn
       
        text="Buy Now"
        onClick={handleBuyCourse}
        className="w-full bg-yellow-50 py-2 rounded-lg text-richblack-900 justify-center"
      />
    </div>
  );
};

export default RenderTotalAmount;
