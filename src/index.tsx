import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Providers from "providers";
import { CssBaseline } from "@mui/material";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Providers>
      <CssBaseline />
      <App />
    </Providers>
  </React.StrictMode>
);
