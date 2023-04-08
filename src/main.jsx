import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./index.css";
import SaveProvider from "./components/provider/SaveProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <SaveProvider>
    <App />
  </SaveProvider>
);
