import { useSelector } from "react-redux";
import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";

export default function Cart() {
  const { total, totalItems } = useSelector((state) => state.cart);

  return (
    <div className="text-white px-4 py-6 min-h-screen bg-gray-900">
      <h1 className="text-3xl font-semibold mb-2">Your Cart</h1>
      <p className="text-gray-300 mb-4">{totalItems} course{totalItems !== 1 ? "s" : ""} in cart</p>

      {total > 0 ? (
        <div className="flex  flex-col  md:flex-row lg:flex-row lg:justify-between lg:items-start gap-6">
          <RenderCartCourses />
          <RenderTotalAmount />
        </div>
      ) : (
        <p className="text-center text-lg text-gray-400 mt-10">Your cart is empty</p>
      )}
    </div>
  );
}
