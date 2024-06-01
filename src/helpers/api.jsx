import axios from "axios";
import { axiosInstance } from "../utils/AxiosInterceptors";

export default async function _sendAPIRequest(
  data,
  url,
  action,
  headers = {},
  useAuthInstance = false
) {
  const instance = useAuthInstance ? axiosInstance : axios;

  try {
    switch (action) {
      case "POST":
        const postResponse = await instance.post(url, data, { headers });
        return postResponse;
      case "GET":
        const config = { headers, params: data };
        const getResponse = await instance.get(url, config);
        return getResponse;
      case "PATCH":
        const patchResponse = await instance.patch(url, data, { headers });
        return patchResponse;
      case "DELETE":
        const deleteResponse = await instance.delete(url, { headers });
        return deleteResponse;
      default:
        throw new Error(`Unsupported action type: ${action}`);
    }
  } catch (error) {
    return error.response;
  }
}