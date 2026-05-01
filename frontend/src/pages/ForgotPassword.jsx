import { Box, Button, Paper, TextField, ThemeProvider, Typography } from '@mui/material'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../context/UserContext';
import toast from 'react-hot-toast';
import { darkTheme } from '../constants/constant';
import { Load } from '../components/Load';

const ForgotPassword = () => {
    const {forgotToken} = useContext(UserContext);
    const nav = useNavigate();
    const [email,setEmail] = useState("");

    const[loading,setLoading]=useState(false);

    const Submit=async()=>{
        try {
        const res = await forgotToken(email);
        toast.success(res?.data?.message);
        const help=res?.data?.identity;
        if (res?.data?.success) {
        setLoading(true)
        setEmail("");
        nav(`/verify/${help}`);
        }
    } catch (error) {
          if (error.code === "ERR_NETWORK") {
        toast.error("Server is down");
      } else {
        toast.error(error?.response?.data?.message);
      }
    }
    finally{
        setLoading(false)
    }
    }
    if(loading)
    {
        return(<Load/>);
        
    }
  return (
    <ThemeProvider theme={darkTheme}>
        <Box
        sx={{
            minHeight:"100vh",
            width: "100vw",
            display: "flex",
            alignItems:"center",
            justifyContent:"center",
            background: "linear-gradient(135deg, #020617, #0f172a, #020617)",
        }}>
            <Paper
            elevation={12}
             sx={{
                minHeight:"200px",
                p:4,
                width:"300px",
            backdropFilter: "blur(10px)",
            background: "rgba(2,6,23,0.7)",
            border: "1px solid rgba(56,189,248,0.2)",
                
            }}>
            <Typography sx={{
                mb:5,
                fontWeight:"bold",
                color:"white",
                textAlign:"center",
            }}>Forgot Password</Typography>

            <TextField 
            fullWidth
            label="Enter the Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            ></TextField>
            <Button
             fullWidth
             variant='contained'
             size='large'
             sx={{mt:4 ,py:1.3,fontWeight:"bold",}}
             onClick={Submit}
            >
                Confirm 
            </Button>
            </Paper>
        </Box>
    </ThemeProvider>
  )
}

export default ForgotPassword