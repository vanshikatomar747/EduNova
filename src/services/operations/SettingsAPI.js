import { toast } from "react-hot-toast";
import { setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiConnector";
import { settingsEndpoints } from "../apis";
import { logout } from "./authAPI";

const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
} = settingsEndpoints;

// Update user's display picture
export function updateDisplayPicture(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Updating display picture...");
    try {
      const response = await apiConnector("PUT", UPDATE_DISPLAY_PICTURE_API, formData, {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      });

      if (!response?.data?.success) {
        throw new Error(response?.data?.message || "Failed to update picture");
      }

      dispatch(setUser(response.data.data));
      toast.success("Display picture updated successfully");
    } catch (error) {
      console.error("UPDATE_DISPLAY_PICTURE_API ERROR:", error);
      toast.error("Could not update display picture");
    }
    toast.dismiss(toastId);
  };
}

// Update user's profile information
export function updateProfile(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Updating profile...");
    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
        Authorization: `Bearer ${token}`,
      });

      if (!response?.data?.success) {
        throw new Error(response?.data?.message || "Failed to update profile");
      }

      const updatedUser = response.data.updatedUserDetails;
      const userImage = updatedUser.image
        ? updatedUser.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${updatedUser.firstName} ${updatedUser.lastName}`;

      dispatch(setUser({ ...updatedUser, image: userImage }));
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("UPDATE_PROFILE_API ERROR:", error);
      toast.error("Could not update profile");
    }
    toast.dismiss(toastId);
  };
}

// Change user password
export async function changePassword(token, formData) {
  const toastId = toast.loading("Changing password...");
  try {
    const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Password change failed");
    }

    toast.success("Password changed successfully");
  } catch (error) {
    console.error("CHANGE_PASSWORD_API ERROR:", error);
    toast.error(error?.response?.data?.message || "Could not change password");
  }
  toast.dismiss(toastId);
}

// Delete user profile
export function deleteProfile(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Deleting profile...");
    try {
      const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
        Authorization: `Bearer ${token}`,
      });

      if (!response?.data?.success) {
        throw new Error(response?.data?.message || "Failed to delete profile");
      }

      toast.success("Profile deleted successfully");
      dispatch(logout(navigate)); // Logout after profile deletion
    } catch (error) {
      console.error("DELETE_PROFILE_API ERROR:", error);
      toast.error("Could not delete profile");
    }
    toast.dismiss(toastId);
  };
}
