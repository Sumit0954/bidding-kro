import axios from "axios";

export const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Create an axios instance that you wish to apply the interceptor to
export const axiosInstance = axios.create({ baseURL: BASE_URL });

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers["Authorization"] = "Bearer " + accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401) {
      try {
        const { access } = await requestRefresh();
        setAccessToken(access);
        axiosInstance.defaults.headers["Authorization"] = "Bearer " + access;
        originalRequest.headers["Authorization"] = "Bearer " + access;
        return axiosInstance(originalRequest);
      } catch (error) {
        removeTokens();
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

// Define token refresh function.
export const requestRefresh = async () => {
  const refreshToken = getRefreshToken();
  let formData = new FormData();
  formData.append("refresh", refreshToken);
  const response = await axios.post(
    `${BASE_URL}/user/token/refresh/`,
    formData
  );
  return response.data;
};

// Logging in
export const login = async (data) => {
  // save tokens to storage
  localStorage.setItem("accessToken", data.access);
  localStorage.setItem("refreshToken", data.refresh);
  window.location.href = "/portal";
};

// Logging out
export const logout = async () => {
  // remove tokens to storage
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  window.location.href = "/login";
};

// AuthServices
export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

export const setAccessToken = (accessToken) => {
  localStorage.setItem("accessToken", accessToken);
};

export const setRefreshToken = (token) => {
  localStorage.setItem("refreshToken", token);
};

export const removeTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};
