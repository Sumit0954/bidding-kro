import axios from "axios";
import { axiosInstance } from "../utils/AxiosInterceptors";

/**
 * Makes an API request with the specified method, URL, and data.
 *
 * @export
 * @param {'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'} action - HTTP method in uppercase.
 * @param {string} url - The endpoint URL.
 * @param {object} [data] - The payload/data to be sent with the request.
 * @param {boolean} [useAuthInstance=false] - Whether to use the authenticated API instance.
 * @param {object} [headers={}] - Optional custom headers to include in the request.
 * @returns {Promise<any>} - Returns a Promise resolving to the API response.
 */

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
        const config = { params: data };
        const getResponse = await instance.get(url, config);
        return getResponse;
      case "PATCH":
        const patchResponse = await instance.patch(url, data);
        return patchResponse;
      case "PUT":
        const putResponse = await instance.put(url, data);
        return putResponse;
      case "DELETE":
        const deleteResponse = await instance.delete(url, { data });
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
