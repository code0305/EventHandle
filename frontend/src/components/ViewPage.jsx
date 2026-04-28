import {
  Box,
  Button,
  Container,
  Fade,
  Paper,
  ThemeProvider,
  Typography
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { darkTheme } from "../constants/constant";
import EventContext from "../context/EventContext";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ViewPage = () => {

  const nav = useNavigate
  const { detailsById } = useContext(EventContext);
  const { id } = useParams();

  const [event, setEvent] = useState({});
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [status, setStatus] = useState("loading");

  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await detailsById(id);
        if (res?.data?.success) {
          setEvent(res?.data?.data);
          console.log(res?.data?.data);
          toast.success("Welcome");
        }
      } catch (error) {
        if (error.code === "ERR_NETWORK") {
          toast.error("Server is down");
        } else {
          toast.error(error?.response?.data?.message);
        }
      }
    };
    fetchData();
  }, [id, detailsById]);

  useEffect(() => {
  if (!event?.schedule?.startDate || !event?.schedule?.endDate) return;

  const startTime = new Date(event?.schedule?.startDate).getTime();
  const end = new Date(event?.schedule?.endDate);
  end.setHours(23, 59, 59, 999);
  const endTime = end.getTime();

  const interval = setInterval(() => {
    const now = new Date().getTime();

    if (now < startTime) {
      setStatus("countdown");

      const diff = startTime - now;

      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60)
      });
    } else if (now >= startTime && now <= endTime) {
      setStatus("started");
    } else {
      setStatus("completed");
    }
  }, 1000);

  return () => clearInterval(interval);
}, [event]);

  const handleBookNow = () => {
    toast.success("Proceed to booking!");
  };

  return (
    <ThemeProvider theme={darkTheme}>

      <Box
        sx={{
          width: "100%",
          height: "100vh",   
          overflowY: "auto",
          background:"linear-gradient(135deg, #020617, #0f172a, #020617)",
          "&::-webkit-scrollbar": {display: "none"},
          scrollbarWidth: "none",
          msOverflowStyle: "none"
        }}
      >

        

        {status === "countdown" && (
          <>
          <Box>
          <img
            src={
              event?.bannerUrl?.[1]?.mediaUrl
            }
            alt="Event Banner"
            style={{
              width: "100%",
              height: "auto",
              display: "block"
            }}
          />
        </Box>
  <Box sx={{ py: 6, textAlign: "center" }}>
    <Typography variant="h4" sx={{ color: "white", mb: 3 }}>
      Registeration Ends In
    </Typography>

    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 3,
        flexWrap: "wrap",
        
      }}
    >
      {["days", "hours", "minutes", "seconds"].map((unit) => (
        <Box
          key={unit}
          sx={{
            p: 3,
            minWidth: 80,
            borderRadius: 2,
            background: "rgba(255,255,255,0.1)",
            color: "white"
          }}
        >
          <Typography variant="h5">
            {countdown[unit]}
          </Typography>
          <Typography variant="caption">
            {unit.toUpperCase()}
          </Typography>
        </Box>
      ))}
    </Box>
    <Box sx={{ py: 6, px: 2 }}>
          <Container maxWidth="lg">
            <Fade in timeout={1400}>
              <Paper
                elevation={0}
                sx={{
                  p: 6,
                  textAlign: "center",
                  borderRadius: "30px",
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(20px)"
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    color: "white",
                    fontWeight: 800,
                    mb: 2
                  }}
                >
                  {event?.title || "Ready to Join the Magic?"}
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    color: "rgba(255,255,255,0.95)",
                    mb: 4
                  }}
                >
                  Secure your spot now before it's gone forever!
                </Typography>

                <Button
                  variant="contained"
                  size="large"
                  onClick={handleBookNow}
                  sx={{ px: 8, py: 2 }}
                >
                  <Typography sx={{fontWeight:"bold"}}>BOOK  NOW</Typography>
                  
                </Button>
              </Paper>
            </Fade>
          </Container>
    </Box>
  </Box>
  </>
)}

        {status === "started" && (
  <Box sx={{ py: 6, px: 2, textAlign: "center", display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center" }}>

    <Typography
      variant="h3"
      sx={{
        color: "white",
        fontWeight: 800,
        mb: 4
      }}
    >
      {event?.title}
    </Typography>

    <Container maxWidth="sm">
      <Fade in timeout={1000}>
        <Paper
          sx={{
            p: 4,
            borderRadius: "20px",
            background: "linear-gradient(135deg, #ef4444, #b91c1c)",
            color: "white",
            boxShadow: "0 15px 40px rgba(239,68,68,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            position: "relative",
            overflow: "hidden"
          }}
        >
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "white",
              animation: "pulseDot 1.2s infinite"
            }}
          />

          <Typography variant="h5" sx={{ fontWeight: "bold", letterSpacing: 1 }}>
            LIVE NOW
          </Typography>

          <Box
            sx={{
              position: "absolute",
              width: "200%",
              height: "200%",
              background: "radial-gradient(circle, rgba(255,255,255,0.15), transparent)",
              animation: "rotateGlow 6s linear infinite"
            }}
          />
        </Paper>
      </Fade>
    </Container>

    <Typography
      variant="h6"
      sx={{
        color: "rgba(255,255,255,0.7)",
        mt: 4
      }}
    >
      The event is currently happening. Join now!
    </Typography>

    <style>
      {`
        @keyframes pulseDot {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }

        @keyframes rotateGlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
    </style>

  </Box>
)}

        {status === "completed" && (
  <Box
    sx={{
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      background: "linear-gradient(135deg, #0f172a, #020617)"
    }}
  >
    <Box
      sx={{
        p: 6,
        borderRadius: "24px",
        background: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(20px)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        maxWidth: 400,
        width: "90%"
      }}
    >
      {/* ✅ Icon */}
      <CheckCircleIcon
        sx={{
          fontSize: 80,
          color: "#22c55e",
          mb: 2
        }}
      />

      {/* 🎯 Title */}
      <Typography
        variant="h4"
        sx={{
          color: "white",
          fontWeight: 700,
          mb: 2
        }}
      >
        Event Completed
      </Typography>

      {/* 💬 Subtitle */}
      <Typography
        variant="body1"
        sx={{
          color: "rgba(255,255,255,0.7)",
          mb: 4
        }}
      >
        Thank you for being part of this event. Stay tuned for more!
      </Typography>

      {/* 🔘 Button (optional) */}
      <Button
        variant="contained"
        sx={{
          px: 5,
          py: 1.5,
          borderRadius: "30px",
          background: "linear-gradient(135deg, #22c55e, #16a34a)"
        }}
        onClick={nav("/")}
      >
        Explore More Events
      </Button>
    </Box>
  </Box>
)}

      </Box>
    </ThemeProvider>
  );
};

export default ViewPage;
