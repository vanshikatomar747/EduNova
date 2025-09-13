import { createSlice } from "@reduxjs/toolkit";

// Initial state for course viewing data
const initialState = {
  courseSectionData: [],   // Stores course sections and their content
  courseEntireData: [],    // Stores complete course details
  completedLectures: [],   // Tracks lectures completed by the user
  totalNoOfLectures: 0,    // Total lectures count
};

// Create Redux slice for managing course viewing state
const viewCourseSlice = createSlice({
  name: "viewCourse",
  initialState,
  reducers: {
    // Set course sections data
    setCourseSectionData: (state, action) => {
      state.courseSectionData = action.payload;
    },

    // Set complete course data
    setEntireCourseData: (state, action) => {
      state.courseEntireData = action.payload;
    },

    // Set total number of lectures
    setTotalNoOfLectures: (state, action) => {
      state.totalNoOfLectures = action.payload;
    },

    // Set list of completed lectures
    setCompletedLectures: (state, action) => {
      state.completedLectures = action.payload;
    },

    // Add a lecture to completed lectures list
    updateCompletedLectures: (state, action) => {
      state.completedLectures = [...state.completedLectures, action.payload];
    },
  },
});

// Export actions for dispatching
export const {
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
  setCompletedLectures,
  updateCompletedLectures,
} = viewCourseSlice.actions;

// Export reducer to configure in store
export default viewCourseSlice.reducer;
