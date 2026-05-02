import { Box, Button, Paper, TextField, ThemeProvider, Typography } from '@mui/material'
import { useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { darkTheme } from '../constants/constant';
import { useContext } from 'react';
import UserContext from '../context/UserContext';
import toast from 'react-hot-toast';
import { Load } from '../components/Load';

const VerifyCode = () => {
        
    const {verifyToken}=useContext(UserContext);
    const nav = useNavigate();
    const [values, setValues] = useState(["", "", "", "", ""]);
    const inputRefs = useRef([]);

    const handleChange = (index, e) => {
      const value = e.target.value;
      if (!/^\d?$/.test(value)) return;

      values[index] = e.target.value;
      setValues(values);

        if (value && index < values.length - 1) {
          inputRefs.current[index + 1].focus();
        }
    };
    const handleKeyDown = (index, e) => {
  if (e.key === "Backspace" && !values[index] && index > 0) {
    inputRefs.current[index - 1].focus();
  }
};


  const combinedvalue = values.join("");
  const { help } = useParams(); 
  const [loading,setLoading]=useState(false);
  const Accept = async()=>{
    try {
      setLoading(true)
        const res = await verifyToken({combinedvalue,help})
        toast.success(res?.data?.message)
    if (res?.data?.success) {
        setValues(["", "", "", "", ""]);
        nav("/update-password/"+help);
    }   
    } catch (error) {
          if (error.code === "ERR_NETWORK") {
        toast.error("Server is down");
      } else {
        toast.error(error?.response?.data?.message);
      }
    }
    finally{
      setLoading(false);
    }
  }
  if(loading)
  {
    return(
      <Load/>
    )
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
                minHeight:"150px",
                p:4,
                width:"400px",
            backdropFilter: "blur(10px)",
            background: "rgba(2,6,23,0.7)",
            border: "1px solid rgba(56,189,248,0.2)",
                
            }}>
            <Typography sx={{
                mb:5,
                fontWeight:"bold",
                color:"white",
                textAlign:"center",
            }}>Verification Code</Typography>
            
<Box sx={{ display: "flex", gap: "10px" }}>
  {values.map((val, i) => (
    <TextField
      key={i}
      inputRef={(el) => (inputRefs.current[i] = el)}
      value={val}
      onChange={(e) => handleChange(i, e)}
      onKeyDown={(e) => handleKeyDown(i, e)}
      inputProps={{
        maxLength: 1,
        style: { textAlign: "center", fontSize: "20px" }
      }}
      sx={{ width: "60px" }}
    />
  ))}
</Box>
      
      <Button
             fullWidth
             variant='contained'
             size='large'
             sx={{mt:4 ,py:1.3,fontWeight:"bold",}}
             onClick={Accept}
             
            >Confirm</Button>
            </Paper>
        </Box>
    </ThemeProvider>
  )
}

export default VerifyCode