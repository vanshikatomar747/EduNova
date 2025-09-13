import { createSlice } from "@reduxjs/toolkit";

// Initial state for profile data
const initialState = {
  user: null,      // Stores logged-in user's profile details
  loading: false,  // Loading state for profile-related actions
};

// Create Redux slice for managing user profile state
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    // Set or update user profile data
    setUser(state, action) {
      state.user = action.payload;
    },

    // Toggle loading state (true/false)
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

// Export actions for dispatching
export const { setUser, setLoading } = profileSlice.actions;

// Export reducer to configure in store
export default profileSlice.reducer;
