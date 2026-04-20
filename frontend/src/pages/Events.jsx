import { Box, Card, Typography, Button } from '@mui/material';
import BusinessIcon from "../assets/Business.jpg";

const Events = ({ category }) => {
  return (
    <>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold",color:"white",textAlign:"center" }}>
        {category} Events
      </Typography>

      <Card
        sx={{
          p: 2,
          borderRadius: 1,
          boxShadow: 3,
          m:2
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2
          }}
        >
          {/* Image */}
          <Box
            sx={{
              width: 120,
              height: 120,
              flexShrink: 0,
              borderRadius: 1,
              overflow: "hidden"
            }}
          >
            <img
              src={BusinessIcon}
              alt="Event"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover"
              }}
            />
          </Box>

          {/* Middle Content */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight="bold">
              Event Name
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Event description goes here. Short and clean.
            </Typography>
              <Typography variant="h6" fontWeight="bold">
              ₹499
            </Typography>

          </Box>

          {/* Right Side */}
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
              sx={{ color: "green", mb: 3, display: "block",fontWeight:"bold",fontSize:15 }}
            >
              Status: Available
            </Typography>

            <Button variant="contained" size="small">
              Book
            </Button>
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default Events;