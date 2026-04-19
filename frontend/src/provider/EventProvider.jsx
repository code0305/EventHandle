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

    const AllEvents =async()=>{
        try {
            const res = await axios.get(`${BaseUrl}/post/events`);
            return res.data.data;
        } catch (error) {
            throw error;
        }
    }
    const value ={
        addEvent,
        AllEvents
    }
    return(
        <EventContext.Provider value={value}>
            {children}
        </EventContext.Provider>
    )
}

export default EventProvider;
