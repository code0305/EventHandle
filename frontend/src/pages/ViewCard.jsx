
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Box, Grid } from '@mui/material';
import axios from 'axios';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ViewCard = ({ search }) => {
  const navigate = useNavigate();
  const [eventData, setEventData] = useState([]);

   const check = localStorage.getItem("mytoken")
  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5001/admin/all", {
        headers: { "auth-token": check }
      });
      setEventData(res.data.data);
    } catch (error) {
          if (error.code === "ERR_NETWORK") {
        toast.error("Server is down");
      } else {
        toast.error(error?.response?.data?.message);
      }
    }
  };

  const filteredEvents = eventData.filter((item) =>
  item.title.toLowerCase().includes(search.toLowerCase())
);

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <Grid container spacing={2}>
      {filteredEvents.length === 0 ? (

        <Typography
          variant="h5"
          sx={{ textAlign: "center", mt: 5, color: "gray" }}
        >
          No such event exists
        </Typography>

    ) :filteredEvents.map((item) => {
        const formatted = new Date(item.schedule.startDate).toLocaleDateString('en-GB');
        return (
          <Grid item xs={12} sm={6} md={4} key={item._id}>
            <Card
            onClick={() => navigate(`/${item._id}`)}
  sx={{
    height:"100%",
    maxHeight: "400px",
    width: "350px",        
    display: "flex",
    flexDirection: "column",
    backdropFilter: "blur(10px)",
    background: "rgba(2,6,23,0.7)"
  }}
>
              <CardHeader
                title={item.title}
                subheader={formatted}
              />

              <CardMedia
                component="img"
                height="144"
                image={`http://localhost:5001/uploads/${item.BannerUrl}`}
                alt="Banner"
              />

              <CardContent>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {item.organizer.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};