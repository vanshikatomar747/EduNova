import { createSlice } from "@reduxjs/toolkit";

// Initial authentication state
const initialState = {
  signupData: null, // Stores signup form data temporarily
  loading: false,   // Indicates loading state for auth operations
  token: localStorage.getItem("token") 
    ? JSON.parse(localStorage.getItem("token")) 
    : null, // Persisted token from localStorage
};

// Auth slice manages authentication-related state
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Store signup data (e.g., user info before OTP verification)
    setSignupData(state, action) {
      state.signupData = action.payload;
    },
    // Toggle loading state for async auth actions
    setLoading(state, action) {
      state.loading = action.payload;
    },
    // Update JWT token in state (and can also update localStorage if needed)
    setToken(state, action) {
      state.token = action.payload;
    },
  },
});

// Export actions for dispatch
export const { setSignupData, setLoading, setToken } = authSlice.actions;

// Export reducer to configure in the store
export default authSlice.reducer;
