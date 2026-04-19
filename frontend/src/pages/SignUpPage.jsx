import React, { useState } from "react"
import { Box, Button, Checkbox, Divider, FormControlLabel, Paper, TextField, Typography } from '@mui/material'
import { ThemeProvider} from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import GoogleIcon from '../assets/google.png'
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { darkTheme } from "../constants/constant";
import toast from "react-hot-toast";


export default function SignUpPage(){
    const {handleRegister} = useContext(UserContext);
    const nav = useNavigate();
    const[isValid,setIsValid]=useState(true);
    const [data,setData]=useState({
      fullName:'',email:'',password:''
    });

    const handleChange = (e) =>{
      setData({...data,[e.target.name]:e.target.value});
    }

    const toggle=()=>{
      setIsValid(!isValid)
    }
    const handleSignup =async()=>{
      try {
        const res = await handleRegister(data)
        toast.success(res?.data?.message);
        if(res?.data?.success)
        {
          setData({
            fullName:"",
            email:"",
            password:""
          });
          nav("/Signin");
        }
        
      } catch (error) {
        const message=(error?.response?.data?.message);
        toast.error(message);
      }
    }
    return(
    <ThemeProvider theme={darkTheme}>
        <Box
        sx={{
            minHeight:"100vh",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            background:"linear-gradient(135deg, #020617, #0f172a, #020617)",
        }}>
            <Paper
            elevation={12}
            sx={{
                p:4,
                width:330,
                backdropFilter: "blur(30px)",
                background: "rgba(2,6,23,0.7)",
                border: "2px solid rgba(13, 142, 197, 0.81)",
            }}>
                <Box  mb={1}>
                    <Typography variant='h6' color="primary" sx={{fontWeight:"600",textAlign:"center"}}>Meet Up</Typography>
                    <Typography variant='h4'  sx={{textAlign:"center",fontWeight:"bold"}}>Sign Up</Typography>
                </Box>

                <TextField
                fullWidth
                label="Full Name"
                margin="normal"
                variant='outlined'
                onChange={handleChange}
                name='fullName'
                value= {data.fullName}
                />

                <TextField
                fullWidth
                label="Email"
                margin='normal'
                variant='outlined'
                onChange={handleChange}
                name='email'
                value={data.email}
                />

                <TextField
                fullWidth
                label="Password"
                margin='normal'
                variant='outlined'
                type="password"
                onChange={handleChange}
                name="password"
                value={data.password}
                />
          <Box display="flex" >
            <FormControlLabel control={<Checkbox onClick={toggle}/>}label={<span>
        I agree for processing{" "}
        <span style={{ color: "#38bdf8", cursor: "pointer",fontWeight:"bold"}}>
          Personal Data
        </span>
        </span>
        }/>
          </Box>
        <Button
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 1, py: 1.1, fontWeight: "bold"}}
            onClick={handleSignup}
            disabled={isValid}
          >
            Sign Up
          </Button>
          <Divider><Typography>or</Typography></Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2,mt:1 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => nav("/signin")}
              startIcon={<img src={GoogleIcon} alt="Google Icon" width="20" height="20" />}
              
            >
              Sign in with Google
            </Button>
            </Box>
        </Paper>
        </Box>
    </ThemeProvider>
    );
}



