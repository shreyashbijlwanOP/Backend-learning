import React from "react";

import ReactDOM from "react-dom/client";

import "./index.css";

import Router from "./Router/Router";

import { Provider } from "react-redux";

import store from "./store/store";

import { ToastContainer } from "react-toastify";

// Css For React Tostify
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <Router />
    </Provider>
  </React.StrictMode>
);
