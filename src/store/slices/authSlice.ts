import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AUTH_TOKEN, AUTH_TYPES, toastTypes } from "../../utilities/consts";
import { RegisterFormInputs } from "../../components/auth/RegisterForm";
import { LoginFormInputs } from "../../components/auth/LoginForm";
import { showToast } from "../../utilities/helper";

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
    try {
      const response = await apiWithoutToken.post("register/", formData);
      console.log(response.data);
      localStorage.setItem(AUTH_TOKEN, response.data.token);
      showToast("Registration Successfull!", toastTypes.SUCCESS);
      window.location.href = "/";
    } catch (error: any) {
      showToast("Failed to register, Please try again!", toastTypes.DANGER);
      console.log(error, "test");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/registerUser",
  async (formData: LoginFormInputs, { dispatch }) => {
    try {
      const response = await apiWithoutToken.post("login/", formData);
      console.log(response.data);
      localStorage.setItem(AUTH_TOKEN, response.data.token);
      showToast("Login successfull!", toastTypes.SUCCESS);
      window.location.href = "/";
    } catch (error: any) {
      showToast("Failed to login, Please try again!", toastTypes.DANGER);
    }
  }
);
