
import { Box, Button, Checkbox, FormControlLabel, TextField, Typography, Paper } from "@mui/material";
import { ThemeProvider} from "@mui/material/styles";
import { useState } from "react";
import { darkTheme } from "../constants/constant";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";



export default function SignInPage() {
  const nav = useNavigate();
  const {handleLogin} = useContext(UserContext);
  const [form,setForm]=useState({
    email:'',
    password:''
  })

  const handleChange = (e)=>{
    setForm({...form,[e.target.name]:e.target.value})
  }

  const handleConfirm = async() =>{
    try {
      const res = await handleLogin(form);
      toast.success(res?.data?.message);
      if (res?.data?.success) {
        setForm({
            email:'',
            password:''
        })
      }
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong";
    toast.error(message);
    }
    
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #020617, #0f172a, #020617)",
        }}
      >
        <Paper
          elevation={12}
          sx={{
            p: 4,
            width: 380,
            backdropFilter: "blur(10px)",
            background: "rgba(2,6,23,0.7)",
            border: "1px solid rgba(56,189,248,0.2)",
          }}
        >
          <Box mb={2} sx={{textAlign:"center"}}>
            <Typography color="primary" fontWeight={600} mt={1}>
              Meet Up
            </Typography>
            <Typography variant='h4'  sx={{textAlign:"center",fontWeight:"bold"}}>Sign In</Typography>
          </Box>

          <TextField
            fullWidth
            label="Email"
            margin="normal"
            variant="outlined"
            onChange={handleChange}
            name="email"
            value={form.email}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            autoComplete="current-password"
            onChange={handleChange}
            name="password"
            value={form.password}
          />

         <Box sx={{display: "flex",justifyContent: "space-between",alignItems: "center",mt: 2,width: "100%",}}>
            <FormControlLabel control={<Checkbox />}label="Remember me"/>
            <Typography onClick={() => nav("/forgot")}sx={{fontWeight:500,cursor: "pointer",color: "#38bdf8",}}>
              Forgot password?
            </Typography>
          </Box>
          <Button
            fullWidth
            variant="contained"
            size="large"
            sx={{ my: 3, py: 1.3, fontWeight: "bold" }}
            onClick={handleConfirm}
          >
            Sign in
          </Button>

          <Typography align="center" mt={3} color="gray">
            New here? <span style={{ color: "#38bdf8", cursor: "pointer" }} onClick={()=>{nav("/signup")}}>Create account</span>
          </Typography>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}
