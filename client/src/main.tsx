import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./style.scss";
import { AuthContextProvider } from "./context/authContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
