import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true, // if you use cookies
});

// Generic API connector
export const apiConnector = (method, url, bodyData = null, headers = {}, params = {}) => {
  if (!method || !url) throw new Error("API method and URL are required.");
  return axiosInstance({
    method,
    url,
    data: bodyData,
    headers,
    params,
  });
};
