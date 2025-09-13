import axios from "axios"

// Create a reusable Axios instance for API requests
export const axiosInstance = axios.create({
  // You can add a baseURL here if needed for all API calls
  // baseURL: process.env.REACT_APP_API_URL,
})

// Generic API connector function for making HTTP requests
export const apiConnector = (method, url, bodyData = null, headers = {}, params = {}) => {
  // Validate method and URL for safety
  if (!method || !url) {
    throw new Error("API method and URL are required.")
  }

  // Perform API request with the provided configuration
  return axiosInstance({
    method,
    url,
    data: bodyData, // Request body (for POST, PUT, PATCH)
    headers,        // Custom headers
    params,         // Query parameters
  })
}
