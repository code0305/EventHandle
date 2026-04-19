import axios from "axios"
import UserContext from "../context/UserContext"
import { useState } from "react";
import { useCallback } from "react";
axios.defaults.withCredentials = true;


const UserProvider = ({children}) => {

    const BaseUrl=import.meta.env.VITE_SERVER

    const [authUser, setAuthUser] = useState(null);

    const handleRegister = async(data)=>{
    try {
        const res = await axios.post(`${BaseUrl}/auth/signup`,data);
        return res;
    } catch (error) {
        throw error;
    } 
    }

    const handleLogin =async(data)=>{
        try {
            const res = await axios.post(`${BaseUrl}/auth/signin`,data);
            setAuthUser(res?.data);
            return res;
        } catch (error) {
            throw error;
        }
    }


    const forgotToken = async(data)=>{
        try {
            return await axios.post(`${BaseUrl}/auth/reset`,{email:data});
        } catch (error) {
            throw error;
        }
    }

    const verifyToken = async (data) => {
        try {
            return  await axios.post(`${BaseUrl}/auth/verify/${data.help}`, { combinedvalue: data.combinedvalue });
        } catch (error) {
            throw error;
        }
    }

    const updatePassword = async (data,help) => {
        try {
            return await axios.post(`${BaseUrl}/auth/update-password/${help}`,data);
        } catch (error) {
            throw error;
        }
    }

    const Info = useCallback(async () => {
    try {
        const res = await axios.get(`${BaseUrl}/auth/info`);
        setAuthUser(res?.data?.data);
        return res;
    } catch (error) {
        throw error;
    }
    }, []);

    const Logout = async () => {
        try {
            const res = axios.post(`${BaseUrl}/auth/logout`)
            setAuthUser(res?.data);
            return res;
        } catch (error) {
            throw error;
        }
    }

    

    const value ={
        authUser,
        setAuthUser,
        handleLogin,
        handleRegister,
        forgotToken,
        verifyToken,
        updatePassword,
        Info,
        Logout
    }
    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;