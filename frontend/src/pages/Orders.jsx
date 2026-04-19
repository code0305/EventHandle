import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { darkTheme } from '../constants/constant';
import { Button, ThemeProvider } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import EventContext from '../context/EventContext';
import DeleteIcon from '@mui/icons-material/Delete';

const paginationModel = { page: 0, pageSize: 5 };

export default function Orders() {
    const [data,setData]=useState([]);
    
    const col=[{field:'id',headerName:'ID',width:10},{field:'Organizer',headerName:'Organizer',flex:1},{field:'Email',headerName:"Organizer Email",flex:1},{field:'Name',headerName:'Event Name',flex:1},{field:'Category',headerName:'Category'},{field:'Amount',headerName:'Amount'},{field:'PaymentMode',headerName:'Payment Mode'},{field:'StartDate',headerName:'Start Date'},
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
            onClick={() => handleView(params.row)}
          >
            View
          </Button>

          <Button
            onClick={() => handleDelete(params.row)}
            sx={{background:"#e40707",color:'white'}}
          >
            <DeleteIcon sx={{height:"15px",width:"15px"}}/>
          </Button>
        </>
      );
    }
  }
    ];
    const rows=[];
     if (data.length>0) 
      {
      data.map((item, index)=>{
        rows.push({id:index+1,Organizer:item.organizer.name,Email:item.organizer.email,Name:item.title,Category:item.category,Amount:item.pricing.amount,PaymentMode:item.pricing.pmode,StartDate:item.schedule.startDate.split('T')[0],Status:item.status});
      })
    }
    const{AllEvents}=useContext(EventContext);
    useEffect(()=>{
      const fetchData = async()=>{
      try {
        const res = await AllEvents();
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
  pageSizeOptions={[5, 10]}
  sx={{
    border: 0,
    color: "#e2e8f0",
    textAlign: "center",
    // Main background
    backgroundColor: "#020617",

    // Header
    "& .MuiDataGrid-columnHeaders": {
      color: "#38bdf8",
      fontSize: "16px",
    },
    "& .MuiDataGrid-columnHeader": {
      backgroundColor: "#0f172a",
    },
    // Rows
    "& .MuiDataGrid-row": {
      backgroundColor: "#020617",
    },

    // Row hover
    "& .MuiDataGrid-row:hover": {
      backgroundColor: "#2d3849",
    },

    // Cells
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
