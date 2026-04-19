
import React, { useState } from 'react'
import { Box, Button, Paper, TextField, ThemeProvider, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { darkTheme } from '../constants/constant';
import { useContext } from 'react';
import UserContext from '../context/UserContext';
import toast from 'react-hot-toast';

export default function UpdatePasswordPage () {
    const {updatePassword}=useContext(UserContext);
    const nav =useNavigate();
    const {help} = useParams();
    const [data, setData] = useState({
       password:"",
       confirmpassword:""
    });
    const handleChange =(e)=>{
        setData({...data,[e.target.name]:e.target.value});
    }
    const handleConfirm =async ()=>{
        try {
          const res = await updatePassword(data,help);
          toast.success(res?.data?.message);
          if (res?.data?.success) {
            setData({
                password:"",
                confirmpassword:""
            })
            nav("/signin");
          }
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
  return (
    <ThemeProvider theme={darkTheme}>
        <Box
        sx={{
            minHeight:"100vh",
            minWidth:"100vw",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            background: "linear-gradient(135deg, #020617, #0f172a, #020617)",
        }}>

            <Paper
            elevation={12}
             sx={{
            minHeight:"200px",
            p:4,
            width:"400px",
            backdropFilter: "blur(10px)",
            background: "rgba(2,6,23,0.7)",
            border: "1px solid rgba(56,189,248,0.2)",
                
            }}>
                <Typography sx={{fontWeight:"bold",mb:3}}>
                    Enter the New Password
                </Typography>
        <TextField
        fullWidth
          id="filled-password-input"
          label="Enter Password"
          type="password"
          onChange={handleChange}
          name='password'
          value={data.password}
          sx={{mb:3}}
        />

        <TextField
        fullWidth
          id="filled-password-input"
          label="Confirm New Password"
          type="password"
          autoComplete="current-password"
          onChange={handleChange}
          name='confirmpassword'
          value={data.confirmpassword}
          sx={{mb:3}}
        />
        <Button onClick={handleConfirm}variant="contained" sx={{fontWeight:"bold",py:2} } fullWidth >Confirm</Button>
        </Paper>
        </Box>
    </ThemeProvider>
  )
}