import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import Index from "./Index";
import { createTheme, ThemeProvider } from "@mui/material";



// Import the functions you need from the SDKs you need

const theme = createTheme({
  typography: {
    fontFamily: "Quicksand ,san-serif",
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Index />
    </BrowserRouter>

  </ThemeProvider>
);
