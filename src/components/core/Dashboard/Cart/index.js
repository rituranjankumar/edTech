import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";
 
import SkeletonCart from "./SkeletonCart";
import { loadUserCartAPI } from "../../../../services/operations/CartApi";

export default function Cart() {
  const dispatch = useDispatch();
  const { total, totalItems, loading } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(loadUserCartAPI(token));  //  fetch cart on page visit
    }
  }, [token,dispatch]);

  return (
    <div className="text-white px-4 py-6 min-h-screen bg-gray-900">
      <h1 className="text-3xl font-semibold mb-2">Your Cart</h1>

      {/*  Loading State */}
      {loading ? (
        <p className="text-gray-400">Loading cart...</p>
      ) : (
        <p className="text-gray-300 mb-4">
          {totalItems} course{totalItems !== 1 ? "s" : ""} in cart
        </p>
      )}

      {/*  Show loader or cart data */}
      {loading ? (
        <SkeletonCart />   //  shimmer loading
      ) : total > 0 ? (
        <div className="flex flex-col md:flex-row gap-6">
          <RenderCartCourses />
          <RenderTotalAmount />
        </div>
      ) : (
        <p className="text-center text-lg text-gray-400 mt-10">Your cart is empty</p>
      )}
    </div>
  );
}
