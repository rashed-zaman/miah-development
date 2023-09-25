import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: grey[900],
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#11cb5f",
    },
  },
  typography: {
    fontFamily: 'Jost'
  }
});

export default function LayoutForm({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
