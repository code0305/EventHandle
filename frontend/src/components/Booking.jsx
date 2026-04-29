import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
  Alert
} from "@mui/material";

import { useContext } from "react";
import EventContext from "../context/EventContext";
import toast from "react-hot-toast";

const BookingDialog = ({
  open,
  onClose,
  event,
  userId,
  refreshEvent
}) => {
  const [seats, setSeats] = useState(1);
  const [message, setMessage] = useState("");

  const { Book } = useContext(EventContext);

  const price = event?.pricing?.amount || 0;
  const totalSeats = event?.capacity?.totalSeats;

  const isUnlimited = totalSeats === null;

  const availableSeats =
    isUnlimited ? null : event?.availableSeats;

  const handleBooking = async () => {
    try {
      const res = await Book({
        eventId: event._id,
        userId,
        seats
      });

      toast.success(res.data.message);

      refreshEvent(); // 🔥 refresh seats
      onClose();

    } catch (err) {
      setMessage(err.response?.data?.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>

        <Typography variant="h6"sx={{mb:1,textAlign:"center"}}>
          Book Tickets
        </Typography>

        <Typography sx={{mb:1}}>
          Price: ₹{price}
        </Typography>

        {isUnlimited ? (
          <Typography color="green" sx={{mb:1}}>
            Unlimited Seats
          </Typography>
        ) : availableSeats <= 0 ? (
          <Typography color="error" sx={{mb:1}}>
            Sold Out
          </Typography>
        ) : (
          <>
            <Typography sx={{mb:1}}>
              Available Seats: {availableSeats}
            </Typography>

            {availableSeats < 20 && (
              <Alert severity="warning">
                Limited seats available
              </Alert>
            )}
          </>
        )}

        <TextField
          label="Seats"
          value={seats}
          fullWidth
          inputProps={{
            min: 1,
            max: isUnlimited ? undefined : availableSeats
          }}
          onChange={(e) => {
            setSeats(Number(e.target.value));
            setMessage("");
          }}
          sx={{mb:1}}
        />

        <Typography>
          Total: ₹{seats * price}
        </Typography>

        {message && (
          <Alert severity="info">
            {message}
          </Alert>
        )}

      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          onClick={handleBooking}
          variant="contained"
        >
          Book
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookingDialog;