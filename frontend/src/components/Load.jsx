import { Box, CircularProgress, ThemeProvider } from '@mui/material'
import React from 'react'
import { darkTheme } from '../constants/constant'

 export const Load =() => {
  return (
    <ThemeProvider theme={darkTheme}>
        <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflowY: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
          background: "linear-gradient(135deg, #020617, #0f172a, #020617)",
        },
        background:"linear-gradient(135deg, #020617, #0f172a, #020617)"
      }}
      >
        <CircularProgress sx={{ height:"50vh", }} aria-label="Loading…" />
        </Box>
      </ThemeProvider>
  )
}

