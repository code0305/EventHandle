import { Box, Card, Typography, Button } from '@mui/material';
import BusinessIcon from "../assets/Business.jpg";
import { useContext, useEffect, useState } from 'react';
import EventContext from '../context/EventContext';
import UserContext from '../context/UserContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Events = ({ category,setChoice,setId,search }) => {
  const nav = useNavigate();
  const [data,setData]=useState([]);
  const {eventData,UserResponse}=useContext(EventContext);
  const {authUser}=useContext(UserContext);

const filteredData = data.filter((event) => {
  if (!search) return true;

  const text = search.toLowerCase();

  return (
    event?.title?.toLowerCase().includes(text)
  );
});

const [submittedFeedbacks, setSubmittedFeedbacks] = useState([]);
  useEffect(()=>{
    const fetchData=async()=>{
      try {
        const res = await eventData(category);
        console.log(res?.data?.data)
        setData(res?.data?.data);
      } catch (error) {
          if (error.code === "ERR_NETWORK") {
        toast.error("Server is down");
      } else {
        toast.error(error?.response?.data?.message);
      }
    }
    }
    fetchData();
},[category])

useEffect(() => {

  const checkFeedbacks = async () => {

    try {

      const submitted = [];

      for (const event of data) {

        const res = await UserResponse(event._id);

        if (res?.success) {
          submitted.push(event._id);
        }
      }

      setSubmittedFeedbacks(submitted);

    } catch (err) {
      console.log(err);
    }

  };

  if (data.length > 0) {
    checkFeedbacks();
  }

}, [data]);

  return (
    <>
    {
      filteredData.length===0 ? (
        <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold",color:"white",textAlign:"center" }}>
          No Events Available in {category} Category
        </Typography>
      ) : (
        <>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold",color:"white",textAlign:"center" }}>
        {category} Events
      </Typography>
      {
      filteredData.map((event,index)=>(
        
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
            <Typography variant="h6" fontWeight="bold" onClick={()=>{nav(`/view/${event._id}`)}} sx={{cursor:"pointer"}}>
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
            <Button variant="contained" sx={{mt:1,width:70,px:7}} onClick={() => {
              setId(event?._id);
              setChoice("Update");
            }}>
              <Typography variant="h7" sx={{fontWeight:"bold"}}>Update</Typography>
            </Button>
            <Button variant="contained" sx={{mt:1,width:70,px:7}} onClick={()=>nav(`/create-form/${event?._id}`)}>
              <Typography variant="h7" sx={{fontWeight:"bold"}}>Feedback</Typography>
            </Button>
            
            <Button variant="contained" sx={{mt:1,width:70,px:7}} onClick={() => {
              setId(event?._id);
              setChoice("Booked");
            }}>
              <Typography variant="h7" sx={{fontWeight:"bold"}}>Booked</Typography>
            </Button>
            
            </Box>
                </>
              ):(<>
            
          {
            event?.status==="Completed"?(submittedFeedbacks.includes(event._id) ? (<></>):(<>
            <Button variant="contained" sx={{mt:1,width:130,px:7}} 
        onClick={()=>nav(`/view/${event._id}`)}
        >
            <Typography variant="h7" sx={{fontWeight:"bold"}}>Feedback</Typography>
            </Button>
            </>
            ))
            :(
              <>
              <Button variant="contained" sx={{mt:1,width:130,px:7}} 
        onClick={()=>nav(`/view/${event._id}`)}
        >
            <Typography variant="h7" sx={{fontWeight:"bold"}}>Book</Typography>
            </Button>
            </>)
          }
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