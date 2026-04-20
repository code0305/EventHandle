import { Box, Card, Typography, Button } from '@mui/material';
import BusinessIcon from "../assets/Business.jpg";
import { useContext, useEffect, useState } from 'react';
import EventContext from '../context/EventContext';
import UserContext from '../context/UserContext';

const Events = ({ category }) => {
  const [data,setData]=useState([]);
  const {eventData}=useContext(EventContext);
  const {authUser}=useContext(UserContext);
  useEffect(()=>{
    const fetchData=async()=>{
      try {
        const res = await eventData(category);
        setData(res?.data?.data);
      } catch (error) {
        console.log(error?.response?.data)
      }
    }
    fetchData();
},[])
  return (
    <>
    {
      data.length===0 ? (
        <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold",color:"white",textAlign:"center" }}>
          No Events Available in {category} Category
        </Typography>
      ) : (
        <>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold",color:"white",textAlign:"center" }}>
        {category} Events
      </Typography>
      {
      data.map((event,index)=>(
        <Card 
        sx={{
          p: 2,
          borderRadius: 1,
          boxShadow: 3,
          m:2
        }}
        key={index}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2
          }}
        >
          <Box
            sx={{
              width: 120,
              height: 150,
              flexShrink: 0,
              borderRadius: 1,
              overflow: "hidden"
            }}
          >
            <img
              src={event?.bannerUrl[0].mediaUrl}
              alt="Event"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover"
              }}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight="bold">
              {event?.title}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {event?.description}
            </Typography>
              <Typography variant="h6" fontWeight="bold" sx={{mt:1}}>
              {event?.pricing?.amount===0 ? "Free" : `₹${event?.pricing?.amount}`}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 1
            }}
          >
            <Typography
              variant="caption"
              sx={{ color: "green", mb: 3,mr:3, display: "block",fontWeight:"bold",fontSize:15 }}
            >
              {event?.status}
            </Typography>

            {
              authUser.Role==="Admin"?(
                <>
                <Box sx={{display:"flex",gap:2}}>
            <Button variant="contained" sx={{mt:1,width:70,px:7}}>
              <Typography variant="h7" sx={{fontWeight:"bold"}}>Update</Typography>
            </Button>
            <Button variant="contained" sx={{mt:1,width:70,px:7}}>
              <Typography variant="h7" sx={{fontWeight:"bold"}}>Report</Typography>
            </Button>
            </Box>
                </>
              ):(<>
            <Button variant="contained" sx={{mt:1,width:130}}>
              <Typography variant="h7" sx={{fontWeight:"bold"}}>Book</Typography>
            </Button>
              </>)
            }

          </Box>
        </Box>
      </Card>
      ))
    }
      </>
      )
    }
    </>
  );
};

export default Events;