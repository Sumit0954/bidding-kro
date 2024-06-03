// Used to refresh the token using interceptor

import {
  applyAuthTokenInterceptor,
  setAuthTokens,
  clearAuthTokens,
} from "axios-jwt";
import axios from "axios";

export const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// 1. Create an axios instance that you wish to apply the interceptor to
export const axiosInstance = axios.create({ baseURL: BASE_URL });

// 2. Define token refresh function.
const requestRefresh = async (refresh) => {
  // Notice that this is the global axios instance, not the axiosInstance!  <-- important
  return axios
    .post(`${BASE_URL}user/token/refresh/`, { refresh })
    .then((response) => {
      return {
        accessToken: response.data.access,
        refreshToken: response.data.refresh,
      };
    })
    .catch((err) => {
      window.location.href = "/logout";
    });
};

// 3. Apply interceptor
applyAuthTokenInterceptor(axiosInstance, { requestRefresh }); // Notice that this uses the axiosInstance instance.  <-- important

// 4. Logging in
export const login = async (data) => {
  // save tokens to storage
  setAuthTokens({
    accessToken: data.access,
    refreshToken: data.refresh,
  });
};

// 5. Logging out
export const logout = () => clearAuthTokens();

// Now just make all requests using your axiosInstance instance
// axiosInstance.get('/api/endpoint/that/requires/login').then(response => { console.log('inside instance get method') })