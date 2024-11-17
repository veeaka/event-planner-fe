import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AUTH_TOKEN, AUTH_TYPES } from "../../utilities/consts";
import { RegisterFormInputs } from "../../components/auth/RegisterForm";
import { LoginFormInputs } from "../../components/auth/LoginForm";

const apiWithoutToken = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "Application/json",
  },
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFTOKEN",
});

export const initialState = {
  isAuth: false,
  authState: AUTH_TYPES.SIGN_UP,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (state, action) => {
      state.authState = action.payload;
    },
  },
});

export const { setAuthState } = authSlice.actions;

export default authSlice.reducer;

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData: RegisterFormInputs, { dispatch }) => {
    // dispatch(setIsRegistering(true));
    try {
      const response = await apiWithoutToken.post("register/", formData);
      console.log(response.data);
      localStorage.setItem(AUTH_TOKEN, response.data.token);
      window.location.href = "/";
    } catch (error: any) {
      // showToast("Failed to register, Please try again!", toastTypes.DANGER);
      console.log(error, "test");
    } finally {
      // setTimeout(() => {
      //   dispatch(setIsRegistering(false));
      // }, 2000);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/registerUser",
  async (formData: LoginFormInputs, { dispatch }) => {
    // dispatch(setIsRegistering(true));
    try {
      const response = await apiWithoutToken.post("login/", formData);
      console.log(response.data);
      localStorage.setItem(AUTH_TOKEN, response.data.token);
      window.location.href = "/";
    } catch (error: any) {
      // showToast("Failed to register, Please try again!", toastTypes.DANGER);
      console.log(error, "test");
    } finally {
      // setTimeout(() => {
      //   dispatch(setIsRegistering(false));
      // }, 2000);
    }
  }
);
