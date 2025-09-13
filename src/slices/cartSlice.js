import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

// Initial state loaded from localStorage for persistence
const initialState = {
  cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
  total: localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")) : 0,
  totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
};

// Cart slice manages cart items, total price, and item count
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add a course to the cart
    addToCart: (state, action) => {
      const course = action.payload;
      const index = state.cart.findIndex((item) => item._id === course._id);

      // If course already exists in cart, prevent duplicate entry
      if (index >= 0) {
        toast.error("Course already in cart");
        return;
      }

      // Add new course to cart
      state.cart.push(course);
      state.totalItems += 1;
      state.total += course.price;

      // Persist cart state in localStorage
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("total", JSON.stringify(state.total));
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));

      toast.success("Course added to cart");
    },

    // Remove a course from the cart
    removeFromCart: (state, action) => {
      const courseId = action.payload;
      const index = state.cart.findIndex((item) => item._id === courseId);

      // If course exists in cart, remove it and update totals
      if (index >= 0) {
        state.totalItems -= 1;
        state.total -= state.cart[index].price;
        state.cart.splice(index, 1);

        // Update localStorage
        localStorage.setItem("cart", JSON.stringify(state.cart));
        localStorage.setItem("total", JSON.stringify(state.total));
        localStorage.setItem("totalItems", JSON.stringify(state.totalItems));

        toast.success("Course removed from cart");
      }
    },

    // Reset the entire cart
    resetCart: (state) => {
      state.cart = [];
      state.total = 0;
      state.totalItems = 0;

      // Clear localStorage
      localStorage.removeItem("cart");
      localStorage.removeItem("total");
      localStorage.removeItem("totalItems");
    },
  },
});

// Export actions and reducer
export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
