import {
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Fade,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
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
import ConfirmBooking from "./Booking";
import BookingDialog from "./Booking";
import UserContext from "../context/UserContext";
import { Load } from "./Load";

const ViewPage = () => {

  const nav =  useNavigate();
  const { detailsById,SubmitFeedback,getForm,UserResponse} = useContext(EventContext);
  const {authUser}=useContext(UserContext);
  const { id } = useParams();
  const [loading,setLoading]= useState(false);
  const [event, setEvent] = useState({});
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [formData, setFormData] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [status, setStatus] = useState("loading");
  const [open, setOpen] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

      const fieldStyle = {
  "& .MuiInputBase-root": {
    color: "white",
    fontSize: "16px",
    borderRadius: "10px"
  },
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "#06b6e2"
    }
  }
};

const fetchData = async () => {
      try {
        setLoading(true);
        const res = await detailsById(id);
        if (res?.data?.success) {
          setEvent(res?.data?.data);
          console.log(res?.data?.data);
        }
      } catch (error) {
        if (error.code === "ERR_NETWORK") {
          toast.error("Server is down");
        } else {
          toast.error(error?.response?.data?.message);
        }
      }
      finally{
        setLoading(false)
      }
    };

const loadFeedbackFlow = async () => {
  try {

    const check = await UserResponse(id);
    console.log(check)
    if (check.success) {
      setShowFeedback(false);
      return;
    }
    const formRes = await getForm(id)
    if (!formRes?.success) {
      setShowFeedback(false); 
      return;
    }
    setShowFeedback(true);
    setFormData(formRes.data);
    

  } catch (err) {
    console.log(err);
  }
};


const FeedbackForm = ({ form, onSubmit }) => {
  const [answers, setAnswers] = useState({});

  const handleChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length !== form.questions.length) {
      toast.error("Please answer all questions");
      return;
    }

  const formatted = Object.keys(answers).map((key) => ({
    questionId: key,
    answer: answers[key]
  }));

  const data = {
    eventId: form.eventId,
    responses: formatted
  }

  SubmitFeedback(data);

  onSubmit();
};

  return (
  <Paper
    sx={{
      p: 4,
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f172a, #020617)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    <Card
      sx={{
        width: "100%",
        maxWidth: 600,
        p: 4,
        borderRadius: 4,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(10px)"
      }}
    >
      <Typography
        variant="h4"
        sx={{ textAlign: "center", fontWeight: "bold", color: "white" }}
      >
        Feedback Form
      </Typography>

      {form?.questions?.map((q) => (
        <Box key={q?.questionId} sx={{ width: "100%" }}>
          
          <Typography
            sx={{
              mb: 1,
              color: "rgba(255,255,255,0.9)",
              fontWeight: 500
            }}
          >
            {q.question}
          </Typography>

          {q?.type?.toLowerCase() === "text" && (
            <TextField
              fullWidth
              size="medium"
              sx={fieldStyle}
              onChange={(e) =>
                handleChange(q?.questionId, e.target.value)
              }
            />
          )}

          {q?.type?.toLowerCase() === "multiline" && (
            <TextField
              fullWidth
              multiline
              rows={5}
              sx={fieldStyle}
              onChange={(e) =>
                handleChange(q?.questionId, e.target.value)
              }
            />
          )}

          {q?.type?.toLowerCase() === "rating" && (
  <FormControl sx={{ mt: 1 }}>
    <RadioGroup
      row
      onChange={(e) =>
        handleChange(q?.questionId, e.target.value)
      }
    >
      <FormControlLabel value="1" control={<Radio />} label=" Bad" />
      <FormControlLabel value="2" control={<Radio />} label=" Okay" />
      <FormControlLabel value="3" control={<Radio />} label=" Good" />
      <FormControlLabel value="4" control={<Radio />} label=" Very Good" />
      <FormControlLabel value="5" control={<Radio />} label=" Best" />
    </RadioGroup>
  </FormControl>
)}
        </Box>
      ))}

      <Button
        variant="contained"
        size="large"
        onClick={handleSubmit}
        sx={{
          mt: 2,
          py: 1.5,
          fontWeight: "bold",
          borderRadius: "30px",
          background: "linear-gradient(135deg, #22c55e, #16a34a)"
        }}
      >
        Submit Feedback
      </Button>
    </Card>
  </Paper>
);
};



  useEffect(() => {
    fetchData();
    loadFeedbackFlow();
  }, [id]);



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



if (loading) {
        return (
          <Load/>
      );
      }



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
                  {
                    event.capacity.registered<20 && (
                      <Typography
                      variant="h6"
                        sx={{
                          color: "rgba(255,255,255,0.95)",
                          mb: 4
                        }}
                      >
                        <span style={{ color: 'red' }}>{event?.capacity?.total - event?.capacity?.registered}</span>seats available!
                      </Typography>
                    )
                  }
                </Typography>
                <BookingDialog
                  open={open}
                  onClose={() => setOpen(false)}
                  event={event}
                  userId={authUser?._id}
                  refreshEvent={fetchData}
                />
                <Button
                  variant="contained"
                  size="large"
                  sx={{ px: 8, py: 2 }}
                  onClick={() => setOpen(true)}
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
          <>
          {showFeedback ? (
      <FeedbackForm
        form={formData}
        onSubmit={() => {
          setShowFeedback(false);
        }}
      />
      
    ) : (
      
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
      <CheckCircleIcon
        sx={{
          fontSize: 80,
          color: "#22c55e",
          mb: 2
        }}
      />

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

      <Typography
        variant="body1"
        sx={{
          color: "rgba(255,255,255,0.7)",
          mb: 4
        }}
      >
        Thank you for being part of this event.
      </Typography>

      <Button
        variant="contained"
        sx={{
          px: 5,
          py: 1.5,
          borderRadius: "30px",
          background: "linear-gradient(135deg, #22c55e, #16a34a)"
        }}
        onClick={()=>nav("/")}
      >
        Explore More Events
      </Button>
    </Box>
  </Box>
      )}
      </>
      )}
      </Box>
    </ThemeProvider>
  );
};

export default ViewPage;
