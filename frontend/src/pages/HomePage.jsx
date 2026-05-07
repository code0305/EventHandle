import { Box, ThemeProvider } from "@mui/material"
import { darkTheme } from "../constants/constant";
import { SideBar } from "../components/SideBar";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import AddEvent from "./AddEvent";
import Orders from "./Orders";
import StarLayout from "../components/StarLayout";
import Events from "./Events";
import UpdatePage from "./UpdatePage";
import BookedUsers from "./BookedUsers";

const HomePage=()=>{
    
    const [choice,setChoice]=useState("Dashboard");
    const {Info,authUser,setAuthUser} = useContext(UserContext);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [id,setID]=useState(null);
    const handleClick=(category)=>{
      setSelectedCategory(category);
      setChoice("Events");
    }
    const [search,setSearch]=useState("");
    useEffect(() => {
    if (!Info) return;

    const UserDetails = async () => {
        try {
        const info = await Info();
        setAuthUser(info.data.data);
        } catch (error) {
          if (error.code === "ERR_NETWORK") {
        toast.error("Server is down");
      } else {
        toast.error(error?.response?.data?.message);
      }
    }
    };

    UserDetails();
    }, []);
    
    const renderPage=()=>{
    switch(choice)
    {
       case "Add Events": return <AddEvent/>;
                        break;
        case"Dashboard": return <StarLayout setSelectedCategory={setSelectedCategory} setChoice={setChoice}/>;
                        break;
       case "Orders": return <Orders/>;
                        break;
      case "Events":
                    return <Events category={selectedCategory}  setId={setID} setChoice={setChoice} search={search} />;
                    break;

      case "Booked": return<BookedUsers id={id} setChoice={setChoice}/>
                    break;            
      case "Update": return <UpdatePage id={id} setchoice={setChoice}/>;
                    break;
    }
  }
    return (
    <ThemeProvider theme={darkTheme}>
        <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          background:"linear-gradient(135deg, #020617, #0f172a, #020617)",
          overflow: "hidden"
        }}
      >
    <SideBar authUser={authUser} active={choice} setActive={setChoice}/>
    <Box
    sx={{
      flex: 1,             
      display: "flex",
      flexDirection: "column", 
      minWidth: 0, 
      borderWidth: "10%"
    }}
  >
        <Navbar setSearch={setSearch} setAuthUser={setAuthUser}/>
        <Box
            sx={{
              flex: 1,
              p: 1,
              overflowY: "auto",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {renderPage()}
          </Box>
        </Box>

      </Box>
    </ThemeProvider>
    )
}

export default HomePage;