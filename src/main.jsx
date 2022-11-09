import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "@mui/material/styles";
import createTheme from "@mui/material/styles/createTheme";
import CssBaseline from "@mui/material/CssBaseline";
import responsiveFontSizes from "@mui/material/styles/responsiveFontSizes";
import { BrowserRouter, HashRouter } from "react-router-dom";


const theme = responsiveFontSizes(createTheme());

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <HashRouter>
        <App />
       </HashRouter>
    </ThemeProvider>
  </>
);
