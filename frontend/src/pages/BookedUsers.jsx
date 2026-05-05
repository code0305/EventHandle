import { DataGrid } from "@mui/x-data-grid";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Paper, Typography } from "@mui/material";
import EventContext from "../context/EventContext";

const paginationModel = { page: 0, pageSize: 7 }; 

export default function BookedUsers({id}) {

  const [rows, setRows] = useState([]);
  const {fetchRegistered}=useContext(EventContext)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetchRegistered(id);
        console.log(res.data.bookings);
        const formatted = res.data.bookings.map((item) => ({
          id: item._id,
          name: item.user?.fullName,
          email: item.user?.email,
          seats: item.seatsBooked,
          status: item.bookingStatus,
          date: new Date(item.createdAt).toLocaleString(),
        }));

        setRows(formatted);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchBookings();
  }, [id]);

  const columns = [
    { field: "name", headerName: "User Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "seats", headerName: "Seats", width: 100 },
    { field: "status", headerName: "Status", width: 120 },
    { field: "date", headerName: "Booked At", flex: 1 },
  ];

  return (
    <Paper sx={{ height: 500, width: "100%", padding: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 , textAlign:"center"}}>
        Participants
      </Typography>

      <DataGrid rows={rows} columns={columns} initialState={{ pagination: { paginationModel } }}
  pageSizeOptions={[7, 10]}
  sx={{
    border: 0,
    color: "#e2e8f0",
    display:"flex",
    justifyContent: "center",
    backgroundColor: "#020617",

    "& .MuiDataGrid-columnHeaders": {
      color: "#38bdf8",
      fontSize: "16px",
    },
    "& .MuiDataGrid-columnHeader": {
      backgroundColor: "#0f172a",
    },
    "& .MuiDataGrid-row": {
      backgroundColor: "#020617",
    },

    "& .MuiDataGrid-row:hover": {
      backgroundColor: "#2d3849",
    },

    "& .MuiDataGrid-cell": {
      borderBottom: "1px solid #1e293b",
    },

    // Footer (pagination)
    "& .MuiDataGrid-footerContainer": {
      backgroundColor: "#0f172a",
    },
  }}
/>
    </Paper>
  );
}