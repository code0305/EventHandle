import { Autocomplete, Box,  Button,  TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import EventContext from '../context/EventContext';
import toast from 'react-hot-toast';
import { red } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { Load } from '../components/Load';

const UpdatePage = ({ id,setchoice }) => {
      const [loading,setLoading]=useState(false);
  
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
      totalSeats: "",
      bannerUrl: ["", ""],
      bannerFiles: [null, null]
    });

    const handleUpdate = async () => {
      try {
        
        setLoading(true);
        const formData = new FormData();

        formData.append("title", eventData.title);
        formData.append("category", eventData.category);
        formData.append("description", eventData.description);

        formData.append("startDate", eventData.startDate);
        formData.append("endDate", eventData.endDate);

        formData.append("modeEvent", eventData.modeEvent);
        formData.append("address", eventData.address);
        formData.append("city", eventData.city);
        formData.append("state", eventData.state);
        formData.append("connectionLink", eventData.connectionLink);

        formData.append("organizerName", eventData.organizerName);
        formData.append("organizerEmail", eventData.organizerEmail);
        formData.append("organizerPhone", eventData.organizerPhone);

        formData.append("pmode", eventData.pmode);
        formData.append("amount", eventData.amount);

        formData.append("totalSeats", eventData.totalSeats);

if (eventData.bannerFiles[0]) {
  formData.append("logo", eventData.bannerFiles[0]);
}

if (eventData.bannerFiles[1]) {
  formData.append("banner", eventData.bannerFiles[1]);
}

        const res = await updateEvent(id, formData);
        toast.success(res?.data?.message);
        setchoice("Events");
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
      finally{
        setLoading(false);
      }
    };

    const handleChange=(e)=>{
        setEventData({...eventData,[e.target.name]:e.target.value})
    }
    const {detailsById,updateEvent}=useContext(EventContext);


    useEffect(()=>{
        const fetchData=async () => {
        try {
        setLoading(true);
        const res = await detailsById(id);
        console.log(res?.data?.data)
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

        totalSeats: res?.data?.data?.capacity?.totalSeats || "",
        bannerUrl: [
          res?.data?.data?.bannerUrl?.[0]?.mediaUrl || "",
          res?.data?.data?.bannerUrl?.[1]?.mediaUrl || ""
        ],
        bannerFiles: [null, null]
      });
        } catch (error) {
          if (error.code === "ERR_NETWORK") {
        toast.error("Server is down");
      } else {
        toast.error(error?.response?.data?.message);
      }

    }finally{
        setLoading(false);
      }
  };
        fetchData();
    },[id])


    if (loading) {
        return (
          <Load/>
      );
      }

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
        label="Event Name"
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
      <Autocomplete
      freeSolo
        options={["Online", "Offline", "Hybrid"]}
        fullWidth
        name='modeEvent'
        value={eventData.modeEvent || ""}
        onChange={(e, newValue) => {
            setEventData({
              ...eventData,
              modeEvent: newValue
            });
          }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Event Mode"
            fullWidth
          />
        )}
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
            
        <Autocomplete
          freeSolo
          fullWidth
          options={["Free"]}
          value={eventData?.amount == 0 ? "Free" : String(eventData?.amount)}
          onChange={(e, newValue) => {
            if (newValue === "Free") {
              setEventData({ ...eventData, amount: 0 });
            } else {
              setEventData({ ...eventData, amount: Number(newValue)});
            }
          }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Ticket Price"
            fullWidth
          />
        )}
        />
        
      {
        eventData.amount != 0 && (
          <TextField
            label="Payment Mode"
            value={eventData.pmode}
            name='pmode'
            onChange={handleChange}
            fullWidth
        />
        )
      }

      <Typography sx={{mt:2,color:"#fff"}} variant="h6">Capacity</Typography>
      <Autocomplete
  freeSolo
  fullWidth
  options={["Unlimited Seats"]}
  value={
    eventData.totalSeats
      ? String(eventData.totalSeats)
      : "Unlimited Seats"
  }
  onChange={(e, newValue) => {
    if (newValue === "Unlimited Seats") {
      setEventData({ ...eventData, totalSeats: 0 });
    } else {
      setEventData({
        ...eventData,
        totalSeats: Number(newValue) || 0
      });
    }
  }}
  onInputChange={(e, newInputValue) => {
    if (newInputValue === "Unlimited Seats" || newInputValue === "") {
      setEventData({ ...eventData, totalSeats: 0 });
    } else if (/^\d*$/.test(newInputValue)) {
      setEventData({
        ...eventData,
        totalSeats: Number(newInputValue)
      });
    }
  }}
  renderInput={(params) => (
    <TextField {...params} label="Total Seats" fullWidth />
  )}
/>  
    <Typography sx={{mt:2,color:"#fff"}} variant="h6">Event Logo</Typography>
    <img src={eventData?.bannerUrl?.[0]} alt="Event Banner" style={{ width: "100%", marginTop: 20, borderRadius: 8 }} />
        <Typography sx={{mt:2,color:"#fff"}} variant="h6">Event Banner</Typography>
    <img src={eventData?.bannerUrl?.[1]} alt="Event Banner" style={{ width: "100%", marginTop: 20, borderRadius: 8 }} />
    </Box>

  <Box sx={{display:"flex",alignItems:"center",justifyContent:"center",gap:6,mt:2}}>
    <Button component="label" variant="contained" sx={{fontWeight:"bold"}} >
  Upload Logo
  <input
    hidden
    type="file"
    onChange={(e) => {
      const file = e.target.files[0];
      const updatedFiles = [...eventData.bannerFiles];
      updatedFiles[0] = file;

      setEventData({
        ...eventData,
        bannerFiles: updatedFiles
      });
    }}
  />
</Button>

<Button component="label" variant="contained" sx={{fontWeight:"bold"}} >
  Upload Banner
  <input
    hidden
    type="file"
    onChange={(e) => {
      const file = e.target.files[0];
      const updatedFiles = [...eventData.bannerFiles];
      updatedFiles[1] = file;

      setEventData({
        ...eventData,
        bannerFiles: updatedFiles
      });
    }}
  />
</Button>
</Box>



    <Box sx={{display:"flex",justifyContent:"space-between",gap:2,mt:2,pr:2}}>
    <Button
    onClick={() => setchoice("Events")}
    >
      Cancel
    </Button >
    <Button variant='contained' sx={{fontWeight:"bold",width:40,px:5}} onClick={handleUpdate}>Update</Button>
    </Box>
    </>
  )
}

export default UpdatePage