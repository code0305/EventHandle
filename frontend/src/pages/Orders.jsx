import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { darkTheme } from '../constants/constant';
import { Button, ThemeProvider } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import EventContext from '../context/EventContext';
import DeleteIcon from '@mui/icons-material/Delete';
import toast from 'react-hot-toast';
import ConfirmDelete from '../components/Warning';
import { useNavigate } from 'react-router-dom';

const paginationModel = { page: 0, pageSize: 7 };


export default function Orders() {
    const{allEvents,deleteEvent}=useContext(EventContext);
      const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleConfirmDelete = () => {
    handleDelete(selectedId); // your existing delete function
    setOpen(false);
  };
  const nav = useNavigate();
    const [data,setData]=useState([]);
    const handleDelete=async(id)=>{
      try {
        const res = await deleteEvent(id);
        const newData = data.filter((item)=>item._id!==id);
        setData(newData);
        toast.success(res?.data?.message);
      } catch (error) {
          if (error.code === "ERR_NETWORK") {
        toast.error("Server is down");
      } else {
        toast.error(error?.response?.data?.message);
      }
    }
    }
    const col=[{field:'id',headerName:'ID',width:10},{field:'Organizer',headerName:'Organizer',flex:1},{field:'Email',headerName:"Organizer Email",flex:1},{field:'Name',headerName:'Event Name',flex:1},{field:'Category',headerName:'Category'},{field:'Amount',headerName:'Amount(Rs)'},{field:'StartDate',headerName:'Start Date'},
      {
        field: 'Status',
        headerName: 'Status',
      },
      {
    field: 'actions',
    headerName: 'Actions',
    flex: 1,
    sortable: false,
    renderCell: (params) => {
      return (
        <>
          <Button
            onClick={() => nav(`/view/${params.row.id}`)}
          >
            View
          </Button>

          <Button
        onClick={() => handleDeleteClick(params.row.id)}
        sx={{ background: "#e40707", color: "white" }}
      >
        <DeleteIcon sx={{ height: "15px", width: "15px" }} />
      </Button>
      <ConfirmDelete
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleConfirmDelete}
      />
        </>
      );
    }
  }
    ];
    const rows=[];
     if (data.length>0) 
      {
      data.map((item, index)=>{
        rows.push({id:item._id,Organizer:item.organizer.name,Email:item.organizer.email,Name:item.title,Category:item.category,Amount:item.pricing.amount,StartDate:item.schedule.startDate.split('T')[0],Status:item.status});
      })
    }

    useEffect(()=>{
      const fetchData = async()=>{
      try {
        const res = await allEvents();
        setData(res);
      } catch (error) {
        console.log(error.message);
      }
      }
      fetchData();
    }
    ,[])
  return (

    <Paper sx={{ height: 500, width: '100%', background: "#020617" }}>
      <DataGrid
  rows={rows}
  columns={col}
  initialState={{ pagination: { paginationModel } }}
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
