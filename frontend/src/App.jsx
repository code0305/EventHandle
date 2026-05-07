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
import { useState } from 'react';
import Events from './pages/Events';
import AdminForm from './components/AdminForm';
import ViewPage from './components/ViewPage';
import OnboardingPage from './pages/OnboardingPage';
import UserContext from './context/UserContext';
import { Load } from './components/Load';
import PageNotFound from './components/ErrorPath';

const App = () => {
  const {  authUser, Info } = useContext(UserContext);

  const [loading, setLoading] = useState(false);

useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true)
      await Info();
    } catch (error) {
      console.log(error.message);
    }
    finally{
      setLoading(false)
    }
  };

  fetchData();
}, []);
  if (loading) {
    return (
      <Load/>
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
      <Route path ='/' element={!authUser ? <Navigate to="/signin"/>:(authUser.isOnboarded ? <HomePage/> : (<Navigate to ="/onboard"/>))} />
      <Route path='/event' element={<Events/>}/>
      <Route path ='/create-form/:id' element={<AdminForm/>}/>
      <Route path='/view/:id' element={<ViewPage/>}/>
      <Route path='*' element={<PageNotFound/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App