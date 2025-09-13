import { createSlice } from "@reduxjs/toolkit";

// Initial state for course-related data
const initialState = {
  step: 1,              // Current step in course creation or editing process
  course: null,         // Stores the current course details
  editCourse: false,    // Flag to indicate if the course is in edit mode
  paymentLoading: false // Loading state for payment actions
};

// Create Redux slice for managing course state
const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    // Set the current step (useful for multi-step forms)
    setStep: (state, action) => {
      state.step = action.payload;
    },

    // Store course details
    setCourse: (state, action) => {
      state.course = action.payload;
    },

    // Enable or disable edit mode
    setEditCourse: (state, action) => {
      state.editCourse = action.payload;
    },

    // Update loading state during payment process
    setPaymentLoading: (state, action) => {
      state.paymentLoading = action.payload;
    },

    // Reset course state to initial values (except payment loading)
    resetCourseState: (state) => {
      state.step = 1;
      state.course = null;
      state.editCourse = false;
    },
  },
});

// Export actions and reducer
export const {
  setStep,
  setCourse,
  setEditCourse,
  setPaymentLoading,
  resetCourseState,
} = courseSlice.actions;

export default courseSlice.reducer;
