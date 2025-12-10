import { toast } from "react-hot-toast";
import { setLoading, setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiConnector";
import { profileEndpoints } from "../apis";
import { logout } from "./authAPI";

const {
  GET_USER_DETAILS_API,
  GET_USER_ENROLLED_COURSES_API,
  GET_INSTRUCTOR_DATA_API,
} = profileEndpoints;

// Fetch user details and update Redux store
export function getUserDetails(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      console.log("Final API URL:", GET_USER_DETAILS_API);
      console.log("Token being sent:", token);
      const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
        Authorization: `Bearer ${token}`,
      });
      console.log("GET_USER_DETAILS API RESPONSE:", response);

      if (!response?.data?.success) {
        throw new Error(response?.data?.message || "Failed to fetch user details");
      }

      // Use user image or generate default avatar
      const userData = response.data.data;
      const userImage = userData.image
        ? userData.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${userData.firstName} ${userData.lastName}`;

      dispatch(setUser({ ...userData, image: userImage }));
    } catch (error) {
      console.error("GET_USER_DETAILS API ERROR:", error);
      toast.error("Could not fetch user details");
      dispatch(logout(navigate)); // Force logout on error
    }

    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
}

// Fetch user's enrolled courses
export async function getUserEnrolledCourses(token) {
  const toastId = toast.loading("Loading...");
  let result = [];

  try {
    const response = await apiConnector("GET", GET_USER_ENROLLED_COURSES_API, null, {
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Failed to fetch enrolled courses");
    }

    result = response.data.data;
  } catch (error) {
    console.error("GET_USER_ENROLLED_COURSES_API ERROR:", error);
    toast.error("Could not fetch enrolled courses");
  }

  toast.dismiss(toastId);
  return result;
}

// Fetch instructor-specific data
export async function getInstructorData(token) {
  const toastId = toast.loading("Loading...");
  let result = [];

  try {
    const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, {
      Authorization: `Bearer ${token}`,
    });
    console.log("GET_INSTRUCTOR_DATA_API RESPONSE:", response);

    result = response?.data?.courses || [];
  } catch (error) {
    console.error("GET_INSTRUCTOR_DATA_API ERROR:", error);
    toast.error("Could not fetch instructor data");
  }

  toast.dismiss(toastId);
  return result;
}
