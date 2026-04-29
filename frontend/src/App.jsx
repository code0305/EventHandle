import React from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import SignInPage from './pages/SignInPage'
import { Toaster } from "react-hot-toast";
import SignUpPage from './pages/SignUpPage';
import ForgotPassword from './pages/ForgotPassword';
import VerifyCode from './pages/VerifyCode';
import UpdatePasswordPage from './pages/UpdatePasswordPage';
import HomePage from './pages/HomePage';
import { useEffect } from 'react';
import { useContext } from 'react';
import UserContext from './context/UserContext';
import { useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { darkTheme } from './constants/constant';
import Events from './pages/Events';
import AdminForm from './components/AdminForm';
import ViewPage from './components/ViewPage';
import OnboardingPage from './pages/OnboardingPage';

const App = () => {
  const {  authUser, Info } = useContext(UserContext);

  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    try {
      await Info();
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);
  if (loading) {
    return (
      <ThemeProvider theme={darkTheme}>
        <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflowY: "auto",
          scrollbarWidth: "none", // Firefox
          "&::-webkit-scrollbar": {
          background: "linear-gradient(135deg, #020617, #0f172a, #020617)",
        },
        background:"linear-gradient(135deg, #020617, #0f172a, #020617)"
      }}
      >
        <CircularProgress sx={{ height:"50vh", }} aria-label="Loading…" />
        </Box>
      </ThemeProvider>
  );
  }

  return (
    <>
    <Toaster position="top-center"
        toastOptions={{
          style: {
            background: "#020617",
            color: "#fff",
            
            fontFamily:"sans-serif",
            fontWeight:"bold",
          },
          error:{
            icon:null,
            style:{
              background:"#e71919",
            }
          },
          success:{
            icon:null,
            style:{
              background:"#1377a1"
            }
            }
            }}/>
    <BrowserRouter>
    <Routes>
      <Route path='/signin' element={!authUser?<SignInPage/>:(authUser.isOnboarded ? (<Navigate to="/"/>):(<Navigate to="/onboard"/>))}/>
      <Route path='/signup'element={!authUser ? (<SignUpPage />) : authUser.isOnboarded ? (<Navigate to="/" /> ) : (<Navigate to="/onboard" />)}/>
      <Route path='/onboard' element={!authUser ? (
      <Navigate to="/signin" />) : authUser.isOnboarded ? (<Navigate to="/" />) : (<OnboardingPage />)}/>
      <Route path='/forgot' element={<ForgotPassword/>}/>
      <Route path="/verify/:help" element={<VerifyCode/>}/>
      <Route path="/update-password/:help" element={<UpdatePasswordPage/>}/>
      {/* <Route path='/' element={authUser.isOnboarded ?<HomePage/>:(authUser.isOnboarded ?(<Navigate to="/onboard"/>):(<Navigate to='/signin'/>))}/> */}
        <Route path ='/' element={!authUser ? <Navigate to="/signin"/>:(authUser.isOnboarded ? <HomePage/> : (<Navigate to ="/onboard"/>))} />
      <Route path='/event' element={<Events/>}/>
      <Route path ='/create-form/:id' element={<AdminForm/>}/>
      <Route path='/view/:id' element={<ViewPage/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App