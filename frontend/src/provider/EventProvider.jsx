import axios from "axios";
import EventContext from "../context/EventContext";


axios.defaults.withCredentials=true;
const EventProvider =({children})=>{

    const BaseUrl = import.meta.env.VITE_SERVER
    const addEvent =(data)=>{
        try {
            const res = axios.post(`${BaseUrl}/post/create`,data,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            })
            return res
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    const allEvents =async()=>{
        try {
            const res = await axios.get(`${BaseUrl}/post/events`);
            return res.data.data;
        } catch (error) {
            throw error;
        }
    }

    const deleteEvent=async (data) => {
        try {
            return await axios.delete(`${BaseUrl}/post/delete/${data}`);
        } catch (error) {
            throw error;
        }
    }

    const eventData=async(data)=>
    {
        try {
            return await axios.get(`${BaseUrl}/post/event/${data}`);
        } catch (error) {
            throw error;
        }
    }

    const detailsById = async (data) => {
        try {
            
            const res= await axios.get(`${BaseUrl}/post/details/${data}`);
            return res
        } catch (error) {
            throw error;
        }
    }
    const value ={
        addEvent,
        allEvents,
        deleteEvent,
        eventData,
        detailsById
    }
    return(
        <EventContext.Provider value={value}>
            {children}
        </EventContext.Provider>
    )
}

export default EventProvider;
