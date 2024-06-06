import axios from "axios";
import { axiosInstance } from "../utils/AxiosInterceptors";

export default async function _sendAPIRequest(
  action,
  url,
  data,
  useAuthInstance = false,
  headers = {}
) {
  const instance = useAuthInstance ? axiosInstance : axios;

  try {
    switch (action) {
      case "POST":
        const postResponse = await instance.post(url, data);
        return postResponse;
      case "GET":
        const getResponse = await instance.get(url);
        return getResponse;
      case "PATCH":
        const patchResponse = await instance.patch(url, data);
        return patchResponse;
      case "DELETE":
        const deleteResponse = await instance.delete(url);
        return deleteResponse;
      default:
        throw new Error(`Unsupported action type: ${action}`);
    }
  } catch (error) {
    throw error;
  }
}

// method for setting error dynamically
export const setErrors = (errors, watch, setError) => {
  Object.entries(errors).map((item) => {
    const [key, value] = item;

    if (key in watch()) {
      if (Array.isArray(value)) {
        setError(key, { message: value[0] }, { shouldFocus: true });
      } else if (typeof value === "object" && value !== null) {
        setErrors(value);
      }
    }
  });
};
