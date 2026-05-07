import {
  Box,
  Button,
  Container,
  Typography
} from "@mui/material";

import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {

  const nav = useNavigate();

  return (

    <Box
      sx={{
        minHeight: "100vh",
        background:"linear-gradient(135deg,#020617,#091b74,#1432dd)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        position: "relative",
        px: 2
      }}
    >

      <Box
        sx={{
          position: "absolute",
          width: 350,
          height: 350,
          borderRadius: "50%",
          background: "rgba(12,164,230,0.12)",
          top: -100,
          left: -100,
          filter: "blur(60px)"
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: 250,
          height: 250,
          borderRadius: "50%",
          background: "rgba(20,50,221,0.18)",
          bottom: -80,
          right: -80,
          filter: "blur(60px)"
        }}
      />

      <Container maxWidth="md">
        <Box
          sx={{
            background: "rgba(2,6,23,0.75)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "32px",
            p: {
              xs: 4,
              md: 8
            },
            textAlign: "center",
            color: "white",
            boxShadow:
              "0 20px 80px rgba(0,0,0,0.45)"
          }}
        >

          <Typography
            sx={{
              fontSize: {
                xs: "5rem",
                md: "9rem"
              },
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: 6,
              color: "white"
            }}
          >
            4

            <RocketLaunchIcon
              sx={{
                fontSize: {
                  xs: 70,
                  md: 120
                },
                mx: 1,
                color: "#0ca4e6",
                transform:
                  "rotate(-20deg)"
              }}
            />

            4
          </Typography>

          <Typography
            variant="h3"
            sx={{
              mt: 3,
              fontWeight: "bold",
              color: "#e2e8f0"
            }}
          >
            Page Not Found
          </Typography>

          <Typography
            sx={{
              mt: 2,
              color:"rgba(226,232,240,0.75)",
              maxWidth: 520,
              mx: "auto",
              lineHeight: 1.8,
            }}
          >
            The page you are trying to access
            does not exist.
          </Typography>

          <Button
            variant="contained"
            onClick={() => nav("/")}
            sx={{
              mt: 5,
              px: 5,
              py: 1.5,
              borderRadius: "40px",
              fontWeight: "bold",
              fontSize: "1rem",
              textTransform: "none",
            }}
          >
            Back To Home
          </Button>

        </Box>

      </Container>

    </Box>

  );
};

export default PageNotFound;