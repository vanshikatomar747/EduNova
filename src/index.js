import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import rootReducer from "./reducer";
import {configureStore} from "@reduxjs/toolkit"
import { Toaster } from "react-hot-toast";

// Configure Redux store
const store = configureStore({
  reducer:rootReducer,
});

// Create root and render app
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
  <Provider store = {store}>
    <BrowserRouter>
        <App />
        <Toaster/>
      </BrowserRouter>
  </Provider>    
  </React.StrictMode>
);
