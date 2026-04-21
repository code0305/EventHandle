import { Autocomplete, Box,  TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import EventContext from '../context/EventContext';
import toast from 'react-hot-toast';

const UpdatePage = ({ id }) => {

    const [eventData, setEventData] = useState({
  title: "",
  category: "",
  description: "",
  startDate: "",
  endDate: "",
  modeEvent: "",
  address: "",
  city: "",
  state: "",
  connectionLink: "",
  organizerName: "",
  organizerEmail: "",
  organizerPhone: "",
  pmode: "",
  amount: "",
  totalSeats: ""
});
    const handleChange=(e)=>{
        setEventData({...eventData,[e.target.name]:e.target.value})
    }
    const {detailsById}=useContext(EventContext);
    useEffect(()=>{
        const fetchData=async () => {
        try {
        const res = await detailsById(id);
        setEventData({
        title: res?.data?.data?.title || "",
        category: res?.data?.data?.category || "",
        description: res?.data?.data?.description || "",

        startDate: res?.data?.data?.schedule?.startDate?.slice(0, 10) || "",
        endDate: res?.data?.data?.schedule?.endDate?.slice(0, 10) || "",

        modeEvent: res?.data?.data?.venue?.modeEvent || "",
        address: res?.data?.data?.venue?.address || "",
        city: res?.data?.data?.venue?.city || "",
        state: res?.data?.data?.venue?.state || "",
        connectionLink: res?.data?.data?.venue?.connectionLink || "",

        organizerName: res?.data?.data?.organizer?.name || "",
        organizerEmail: res?.data?.data?.organizer?.email || "",
        organizerPhone: res?.data?.data?.organizer?.phone || "",

        pmode: res?.data?.data?.pricing?.pmode || "",
        amount: res?.data?.data?.pricing?.amount || "",

        totalSeats: res?.data?.data?.capacity?.totalSeats || ""
      });
        } catch (error) {
            toast.error(error?.response?.data);
        }
        }
        fetchData();
    },[id])

  return (
    <>
        <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          width: "100%",
          maxWidth: "600px",
          margin: "auto"
        }}
      >
      <Typography variant="h5" sx={{color:"#fff"}}>Update Event</Typography>

      <TextField
        label="Title"
        value={eventData.title}
        name='title'
        onChange={handleChange}
        fullWidth
        />
        <TextField
            label="Category"
            value={eventData.category}
            name='category'
            onChange={handleChange}
            fullWidth
        />

       <TextField
            label="Description"
            value={eventData.description}
            name='description'
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
        />
      <Typography sx={{ mt:2,color:"#fff" }} variant="h6">
        Schedule
      </Typography>
      <TextField
            label="Start Date"
            value={eventData.startDate}
            name='startDate'
            onChange={handleChange}
            fullWidth
        />
        <TextField
            label="End Date"
            value={eventData.endDate}
            name='endDate'
            onChange={handleChange}
            fullWidth
        />

      <Typography sx={{mt:2,color:"#fff",gap:1}} variant="h6">Venue</Typography>
      <TextField
            label="Event Mode"
            value={eventData.modeEvent}
            name='modeEvent'
            onChange={handleChange}
            fullWidth
        />
      {
        eventData.modeEvent ==="Offline" && (
          <>
            <TextField
            label="Address"
            value={eventData.address}
            name='address'
            onChange={handleChange}
            fullWidth
        />
        <TextField
            label="City"
            value={eventData.city}
            name='city'
            onChange={handleChange}
            fullWidth
        />
        <TextField
            label="State"
            value={eventData.state}
            name='state'
            onChange={handleChange}
            fullWidth
        />
          </>
        )
      }
      {
        eventData.modeEvent ==="Hybrid" && (
          <>
            <TextField
            label="Meeting Link"
            value={eventData.connectionLink}
            name='connectionLink'
            onChange={handleChange}
            fullWidth
        />
        <TextField
            label="Address"
            value={eventData.address}
            name='address'
            onChange={handleChange}
            fullWidth
        />
        <TextField
            label="City"
            value={eventData.city}
            name='city'
            onChange={handleChange}
            fullWidth
        />
        <TextField
            label="State"
            value={eventData.state}
            name='state'
            onChange={handleChange}
            fullWidth
        />
        </>
        )
      }
            {
        eventData.modeEvent ==="Online" && (
          <>
            <TextField
            label="Meeting Link"
            value={eventData.connectionLink}
            name='connectionLink'
            onChange={handleChange}
            fullWidth
            />
          </>
        )
      }
      <Typography sx={{mt:2,color:"#fff"}} variant="h6">Organizer</Typography>

      <TextField
            label="Organizer Name"
            value={eventData.organizerName}
            name='organizerName'
            onChange={handleChange}
            fullWidth
        />
        <TextField
            label="Organizer Email"
            value={eventData.organizerEmail}
            name='organizerEmail'
            onChange={handleChange}
            fullWidth
        />
        <TextField
            label="Organizer Phone"
            value={eventData.organizerPhone}
            name='organizerPhone'
            onChange={handleChange}
            fullWidth
        />
      
      <Typography sx={{mt:2,color:"#fff"}} variant="h6">Pricing</Typography>
            <TextField
            label="Payment Mode"
            value={eventData.pmode}
            name='pmode'
            onChange={handleChange}
            fullWidth
        />
        <TextField
            label="Ticket Price"
            value={eventData.amount}
            name='amount'
            onChange={handleChange}
            fullWidth
        />
        
      {
        eventData.amount === 0 && (
          <Typography><b>Ticket Price Free</b></Typography>
        )
      }

      <Typography sx={{mt:2,color:"#fff"}} variant="h6">Capacity</Typography>
      <Autocomplete
      freeSolo
      fullWidth
      options={["Unlimited Seats"]}
      value={
        eventData.totalSeats? (eventData.totalSeats): "Unlimited Seats"
      }
      onChange={handleChange}
      onInputChange={(e, newInputValue) => {
        if (newInputValue === "Unlimited Seats") {
          setEventData({ ...eventData, totalSeats: null });
        } else {
          setEventData({ ...eventData, totalSeats: newInputValue });
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Total Seats"
          fullWidth
        />
      )}
    />
    </Box>
    </>
  )
}

export default UpdatePage