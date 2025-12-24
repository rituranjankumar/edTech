import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signupData: null,
  otp:null,
  passwordResetUrl:null,
  loading: false,
  token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupData(state, value) {
      state.signupData = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setToken(state, value) {
      state.token = value.payload;
    },
    setOtp:(state,action)=>
    {
      state.otp = action.payload
    },
    setPasswordReset:(state,action)=>
    {
      state.passwordResetUrl = action.payload
    }
  },
});

export const { setSignupData, setLoading, setToken,setOtp,setPasswordReset } = authSlice.actions;

export default authSlice.reducer;