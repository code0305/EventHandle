import { createTheme } from "@mui/material";

export const mostSpokenLanguages = [
  "English",
  "Mandarin Chinese",
  "Hindi",
  "Spanish",
  "French",
  "Modern Standard Arabic",
  "Bengali",
  "Portuguese",
  "Russian",
  "Urdu"
];
export const categories=["Technology","Education","Entertainment","Business","Sports","Cultural","Community"]
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#0ca4e6" },
    background: {
      default: "#091b74",
      paper: "#1432dd",
    },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#020617',
          color: '#e2e8f0',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: '#020617',
          color: '#e2e8f0',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#1e293b",
          },
        },
      },
    },
  },
});
