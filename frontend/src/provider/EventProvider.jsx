import axios from "axios";
import EventContext from "../context/EventContext";


axios.defaults.withCredentials=true;
const EventProvider =({children})=>{

    const BaseUrl = import.meta.env.VITE_SERVER
    const addEvent = async (data)=>{
        try {
            const res = await axios.post(`${BaseUrl}/post/create`,data,{
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

    const updateEvent = async (id, formData) => {
    try {
    return await axios.put(`${BaseUrl}/post/update/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    } catch (error) {
        throw error;
    }
    };


    const createForm = async (data) => {
        try {
        return await axios.post(`${BaseUrl}/post/form`, data);
        } catch (error) {
            throw error;
        }
    };

    const Book = async(data)=>{
        
        try {
            const res = await axios.post(`${BaseUrl}/post/book`, data);
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
        detailsById,
        updateEvent,
        createForm,
        Book
    }
    return(
        <EventContext.Provider value={value}>
            {children}
        </EventContext.Provider>
    )
}

export default EventProvider;
