import { AUTH_TOKEN } from "../utilities/consts";
import axios, { AxiosResponse } from "axios";

export const getToken = () => {
  console.log("get token ", localStorage.getItem("auth_token"));
  return localStorage.getItem("auth_token")
    ? "Bearer " + localStorage.getItem("auth_token")
    : null;
};

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "Application/json",
    Authorization: `Token ${localStorage.getItem(AUTH_TOKEN)}`,
  },
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFTOKEN",
});

// Add a request interceptor to read auth_token from localStorage and set it as Authorization header
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(AUTH_TOKEN);
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
const responseBody = (response: AxiosResponse) => response.data;

export const requests = {
  get: (url: string) => instance.get(url).then(responseBody),
  post: (url: string, body: {}) => instance.post(url, body).then(responseBody),
  put: (url: string, body: {}) => instance.put(url, body).then(responseBody),
  delete: (url: string) => instance.delete(url).then(responseBody),
};
