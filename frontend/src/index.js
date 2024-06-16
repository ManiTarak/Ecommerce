import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/auth";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Toaster />
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <App className="overflow-y-auto" />
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  </>
);
