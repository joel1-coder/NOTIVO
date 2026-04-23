import React from "react";
import ReactDOM from "react-dom/client";
import App from "./context/App";
import { AuthProvider } from "./context/AuthContext";
import "./styles/auth.css";
import "./styles/dashboard.css";
import "./styles/tasks.css";
import "./styles/pages.css";
import "./styles/invitation.css";
import "./styles/dark-mode.css";
import "./styles/designer.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);