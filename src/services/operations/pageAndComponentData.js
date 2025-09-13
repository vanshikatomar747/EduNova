import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { catalogData } from "../apis";

// Fetch Catalog Page Data by Category ID
export const getCatalogPageData = async (categoryId) => {
  const toastId = toast.loading("Loading..."); // Show loading toast
  let result = [];

  try {
    // API call to fetch catalog data
    const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API, {
      categoryId: categoryId,
    });

    // Check if response is valid and successful
    if (!response?.data?.success) {
      throw new Error("Could not fetch category page data");
    }

    result = response.data; // Store API data
  } catch (error) {
    console.error("CATALOG PAGE DATA API ERROR:", error);
    toast.error(error?.message || "Something went wrong"); // Handle error safely
    result = error.response?.data || {}; // Fallback in case of missing response
  }

  toast.dismiss(toastId); // Hide loading toast
  return result; // Return data (or error object)
};
