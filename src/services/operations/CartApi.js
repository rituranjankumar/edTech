import { apiConnector } from "../apiconnector";
import { setCart, setLoading } from "../../slices/cartSlice";
import toast from "react-hot-toast";
const BASE_URL = process.env.REACT_APP_BASE_URL
export const addToCartAPI = (courseId, token) => {
  return async (dispatch) => {
    try {
      const response = await apiConnector(
        "POST",
        `${BASE_URL}/cart/add`,
        { courseId },
        { Authorization: `Bearer ${token}` }
      );

      dispatch(setCart(response.data));
      toast.success("Course added to cart");
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };
};

 

export const removeFromCartAPI = (courseId, token) => {
  return async (dispatch) => {
    try {
      const res = await apiConnector(
        "POST",
       `${BASE_URL}/cart/remove`,
        { courseId },
        {
          Authorization: `Bearer ${token}`,
        }
      );

      dispatch(
        setCart({
          courses: res.data.courses,
          totalPrice: res.data.totalPrice,
          totalItems: res.data.totalItems,
        })
      );

      toast.success("Removed from cart");
    } catch (err) {
      console.log(err);
      toast.error("Error removing");
    }
  };
};

 

 

export const loadUserCartAPI = (token) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));   //  start loading

      const response = await apiConnector(
        "GET",
        `${process.env.REACT_APP_BASE_URL}/cart`,
        null,
        { Authorization: `Bearer ${token}` }
      );

      dispatch(setCart(response.data)); //  update cart
    } catch (err) {
      dispatch(setLoading(false));
      console.log(err);
    }
  };
};

export const resetCartAPI = (token) => {
  return async (dispatch) => {
    try {
      const response = await apiConnector(
        "POST",
        `${BASE_URL}/cart/clear`,
        {},
        { Authorization: `Bearer ${token}` }
      );

      dispatch(
        setCart({
          courses: [],
          totalItems: 0,
          totalPrice: 0,
        })
      );

      toast.success("Cart cleared!");
    } catch (err) {
      console.log(err);
      toast.error("Error clearing cart");
    }
  };
};
