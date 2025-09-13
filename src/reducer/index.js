import { combineReducers } from "@reduxjs/toolkit";

// Import all individual reducers
import authReducer from "../slices/authSlice";
import cartReducer from "../slices/cartSlice";
import courseReducer from "../slices/courseSlice";
import profileReducer from "../slices/profileSlice";
import viewCourseReducer from "../slices/viewCourseSlice";

// Combine all reducers into a single root reducer
const rootReducer = combineReducers({
  auth: authReducer,        // Handles authentication state
  profile: profileReducer,  // Handles user profile state
  course: courseReducer,    // Handles course-related state
  cart: cartReducer,        // Handles shopping cart state
  viewCourse: viewCourseReducer, // Handles course viewing state
});

export default rootReducer;
