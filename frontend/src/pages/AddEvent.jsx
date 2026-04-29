import React, { useState } from "react";
import {Box,ThemeProvider,Stepper,Step,StepLabel,Button,Typography,TextField,MenuItem,Paper, Select, InputLabel} from "@mui/material";

import { images, darkTheme } from "../constants/constant";
import { useContext } from "react";
import EventContext from "../context/EventContext";
import toast from "react-hot-toast";

const steps = [
  "Event Details",
  "Schedule & Venue",
  "Pricing & Capacity",
  "Review & Submit"
];

const AddEvent = () => {
  const {addEvent} = useContext(EventContext);
  const [activeStep, setActiveStep] = useState(0);
  const [media, setMedia] = useState([]);
  const [eventData, setEventData] = useState({
    description: "",
    title: "",
    category: "",
    modeEvent: "",

    connectionLink: "",
    address: "",
    city: "",
    state: "",
    startDate: "",
    endDate: "",

    paymentmode: "",
    isPaid: "",
    amount: 0,

    limit: "",
    totalSeats: "",

    organizerName: "",
    organizerEmail: "",
    organizerPhone:"",
  });

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    try {
    const form = new FormData();

    form.append("title", eventData.title);
    form.append("category", eventData.category);
    form.append("description", eventData.description);
    form.append("startDate", eventData.startDate);
    form.append("endDate", eventData.endDate);
    form.append("modeEvent",eventData.modeEvent);
    form.append("connectionLink",eventData.connectionLink);
    form.append("address", eventData.address);
    form.append("city", eventData.city);
    form.append("state", eventData.state);

    form.append("organizerName", eventData.organizerName);
    form.append("organizerEmail", eventData.organizerEmail);
    form.append("organizerPhone", eventData.organizerPhone);

if (eventData.isPaid === "Yes") {
  form.append("amount", eventData.amount);
  form.append("pmode", eventData.paymentmode);
} else {
  form.append("amount", 0);
}

    form.append("totalSeats", eventData.totalSeats);

    media.forEach((file)=>{
    form.append("bannerUrl",file)
    })

  const res = await addEvent(form);

  if(res?.data?.success)
  {
    toast.success(res?.data?.message);
setEventData({
    description: "",
    title: "",
    category: "",
    modeEvent: "",
    connectionLink: "",
    address: "",
    city: "",
    state: "",
    startDate: "",
    endDate: "",
    paymentmode: "",
    isPaid: "",
    amount: 0,
    limit: "",
    totalSeats: "",
    organizerName: "",
    organizerEmail: "",
    organizerPhone:"",
});
      setActiveStep(0);
    } 
  }
  catch (error) 
  {
      if (error.code === "ERR_NETWORK") {
        toast.error("Server is down");
      } else {
        toast.error(error?.response?.data?.message);
      }
    }
  };
  const handleChange =(e)=>{
    setEventData({...eventData,[e.target.name]:e.target.value})
  }
  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box sx={{display:"flex",flexDirection:"column" ,gap:2}}>
            <TextField
        label="Event Title"
        onChange={handleChange}
        name="title"
        value={eventData.title}
        fullWidth
        sx={{mt:1}}/>

      <TextField label="Description" name="description" multiline rows={3} value={eventData.description}onChange={handleChange} fullWidth sx={{mt:1}} />
        <TextField
        select
        name="category"
        label="Category"
        value={eventData.category}
        onChange={handleChange}
        sx={{mt:1}}
        fullWidth
        >
        {images.map((item) => (
          <MenuItem key={item.name} value={item.name}>{item.name}</MenuItem>
        ))}
      </TextField>
            <TextField
              label="Organizer Name"
              value={eventData.organizerName}
              name="organizerName"
              onChange={handleChange}
              sx={{mt:1}}
              fullWidth
            />

            <TextField
              label="Organizer Email"
              value={eventData.organizerEmail}
              name="organizerEmail"
              onChange={handleChange}
              sx={{mt:1}}
              fullWidth
            />
            <TextField
              label="Organizer Phone Number"
              value={eventData.organizerPhone}
              name="organizerPhone"
              onChange={handleChange}
              sx={{mt:1}}
              fullWidth
            />
          </Box>
        );

      case 2:
        return (
          <Box sx={{display:"flex",flexDirection:"column" ,gap:2}}>
            <TextField
            select
            label="Is Paid?"
            fullWidth
            value={eventData.isPaid}
            onChange={handleChange}
            sx={{mt:1}}
            name="isPaid"
          >
            <MenuItem value="No">Free</MenuItem>
            <MenuItem value="Yes">Paid</MenuItem>
          </TextField>

          {eventData.isPaid === "Yes" && (
            <>
            <TextField select label="Payment Mode" name="paymentmode" fullWidth  onChange={handleChange} value={eventData.paymentmode}>
              <MenuItem value="Online">Online</MenuItem>
              <MenuItem value="On-spot">On-spot</MenuItem>
            </TextField>
            <TextField
              label="Amount"
              name="amount"
              fullWidth
              onChange={handleChange}
              sx={{mt:1}}
              value={eventData.amount}
            />
            </>
          )}

            <TextField
            select
            label="Limit Participants?"
            fullWidth
            value={eventData.limit}
            onChange={handleChange}
            sx={{mt:1}}
            name="limit"
          >
            <MenuItem value="No">No</MenuItem>
            <MenuItem value="Yes">Yes</MenuItem>
          </TextField>

          {eventData.limit === "Yes" && (
            <TextField
              label="Total Seats"
              name="totalSeats"
              fullWidth
              onChange={handleChange}
              sx={{mt:1}}
              value={eventData.totalSeats}
            />
          )}
          </Box>
        );

      case 1:
        return (
          <Box sx={{display:"flex",flexDirection:"column" ,gap:2}}>
       <TextField select label="Event Type" name="modeEvent" fullWidth  onChange={handleChange} value={eventData.modeEvent}>
       {["Online","Offline","Hybrid"].map((item) => (
          <MenuItem key={item} value={item}>{item}</MenuItem>
        ))}
      </TextField>

      {eventData.modeEvent === "Online" && (
        <TextField label="Meeting Link" name="connectionLink" fullWidth  onChange={handleChange} sx={{mt:1}} value={eventData.connectionLink}/>
      )}

      {eventData.modeEvent === "Offline" && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField label="Address" name="address" fullWidth  onChange={handleChange} sx={{mt:1}} value={eventData.address}/>
          <TextField label="City" name="city" fullWidth  onChange={handleChange} sx={{mt:1}} value={eventData.city} />
          <TextField label="State" name="state" fullWidth  onChange={handleChange} sx={{mt:1}} value={eventData.state} />
        </Box>
      )}

      {eventData.modeEvent === "Hybrid" && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField label="Meeting Link" name="connectionLink" fullWidth  onChange={handleChange} sx={{mt:1}} value={eventData.connectionLink} />
          <TextField label="Address" name="address" fullWidth  onChange={handleChange} sx={{mt:1}} value={eventData.address} />
          <TextField label="City" name="city" fullWidth  onChange={handleChange} sx={{mt:1}} value={eventData.city} />
          <TextField label="State" name="state" fullWidth  onChange={handleChange} sx={{mt:1}} value={eventData.state} />
        </Box>
      )}

      <TextField
      type="date"
      label="Start Date"
      fullWidth
      onChange={handleChange}
      sx={{mt:1}}
      name="startDate"
      value={eventData.startDate}
    />

    <TextField
      type="date"
      label="End Date"
      name="endDate"
      value={eventData.endDate}
      fullWidth
      onChange={handleChange}
      sx={{mt:1}}
    />

    <Button variant="contained" component="label" sx={{mt:1}}

        fullWidth>
      <Typography sx={{fontWeight:500 ,color:"#f3f0f0"}} > Pic && Banner</Typography>
      <input
        type="file"
        label="Banner Image"
        hidden
        multiple
        onChange={(e)=>setMedia([...e.target.files])}
      />
    </Button>
    </Box>
        );

      case 3:
  return (
    <Paper sx={{ p: 3 ,backdropFilter: "blur(10px)",background: "rgba(2,6,23,0.7)",gap:1}}>
      <Typography variant="h5" sx={{mb:2,textAlign:"center"}}>
        Review Event Details
      </Typography>

      <Typography><b>Title:</b> {eventData.title}</Typography>
      <Typography><b>Category:</b> {eventData.category}</Typography>
      <Typography><b>Description:</b>{eventData.description}</Typography>
      <Typography sx={{mt:2}} variant="h6">Schedule</Typography>
      <Typography><b>Start Date:</b> {eventData.startDate}</Typography>
      <Typography><b>End Date:</b> {eventData.endDate}</Typography>

      <Typography sx={{mt:2}} variant="h6">Venue</Typography>
      <Typography><b>Type:</b> {eventData.modeEvent}</Typography>
      {
        eventData.modeEvent ==="Offline" && (
          <Box>
            <Typography><b>Address:</b> {eventData.address}</Typography>
            <Typography><b>City:</b> {eventData.city}</Typography>
            <Typography><b>State:</b> {eventData.state}</Typography>
          </Box>
        )
      }
      {
        eventData.modeEvent ==="Hybrid" && (
          <Box>
            <Typography><b>Meeting Link:</b> {eventData.connectionLink}</Typography>
            <Typography><b>Address:</b> {eventData.address}</Typography>
            <Typography><b>City:</b> {eventData.city}</Typography>
            <Typography><b>State:</b> {eventData.state}</Typography>
          </Box>
        )
      }
            {
        eventData.modeEvent ==="Online" && (
          <Box>
            <Typography><b>Meeting Link:</b> {eventData.connectionLink}</Typography>
          </Box>
        )
      }
      <Typography sx={{mt:2}} variant="h6">Organizer</Typography>
      <Typography><b>Name:</b> {eventData.organizerName}</Typography>
      <Typography><b>Email:</b> {eventData.organizerEmail}</Typography>
      <Typography><b>Phone Number:</b> {eventData.organizerPhone}</Typography>
      <Typography sx={{mt:2}} variant="h6">Pricing</Typography>
      {
        eventData.isPaid ==="Yes" && (
          <Box>
            <Typography><b>Payment Mode:</b> {eventData.paymentmode}</Typography>
            <Typography><b>Ticket Price:</b> ₹{eventData.amount}</Typography>
          </Box>
        )
      }
      {
        eventData.isPaid ==="No" && (
          <Typography><b>Ticket Price Free</b></Typography>
        )
      }

      <Typography sx={{mt:2}} variant="h6">Capacity</Typography>
      {
        eventData.limit === "Yes" && (
          <Typography><b>Total Seats:</b> {eventData.totalSeats}</Typography>
        )
      }
      {
        eventData.limit === "No" && (
          <Typography><b>Unlimited Seats</b></Typography>
        )
      }
      
    </Paper>
  );

      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #020617, #0f172a, #020617)",
        }}
      >
        <Paper
          elevation={12}
          sx={{
            p: 4,
            width: 600,
            backdropFilter: "blur(10px)",
            background: "rgba(2,6,23,0.7)",
            border: "1px solid rgba(56,189,248,0.2)",
          }}
        >
        <Typography
          variant="h5"
          color="white"
          sx={{display:"flex",alignItems:"center",justifyContent:"center",mb:3}}
          
        >
          Create Event
        </Typography>

        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{mt:4}}>{renderStepContent()}</Box>

        <Box
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            <Typography sx={{fontWeight:600}}>Back</Typography>
            
          </Button>

          <Box sx={{flexGrow:1}} />

          <Button
            sx={{width:80}}
            onClick={
              activeStep === steps.length - 1
                ? handleSubmit
                : handleNext
            }
          >
            {activeStep === steps.length - 1
              ? <Typography sx={{fontWeight:600,maxwidth:"900px"}}>Complete</Typography>
              : <Typography sx={{fontWeight:600,}}>Next</Typography>}
          </Button>
        </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default AddEvent;