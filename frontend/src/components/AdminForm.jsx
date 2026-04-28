import { Box, Button, Paper, TextField, ThemeProvider, Typography } from '@mui/material'
import React from 'react'
import { darkTheme } from '../constants/constant'
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useContext } from 'react';
import EventContext from '../context/EventContext';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';


const AdminForm = () => {

    const nav = useNavigate();

    const {createForm} = useContext(EventContext);

    const [questions, setQuestions] = useState([]);

    const addQuestion = (type) => {

    setQuestions([...questions,
      {
        questionId: questions.length,
        question: "",
        type: type,
      }
    ]);
  };

        const handleQuestionChange = (index, value) => {
        const updated = [...questions];
        updated[index].question = value;
        setQuestions(updated);
        };

        const deleteQuestion = (index) => {
        const updated = questions.filter((_, i) => i !== index);
        setQuestions(updated);
        };

const {id} = useParams()
const handleComplete = async()=>{
    try {
        const res = await createForm({questions,eventId:id})
        if(res?.data?.success){
            toast.success(res?.data?.message)
            
        }
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        toast.error("Server is down");
      } else {
        toast.error(error?.response?.data?.message);
      }
    }
  };


  return (
    <ThemeProvider theme={darkTheme}>
        <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          background:"linear-gradient(135deg, #020617, #0f172a, #020617)",
          overflowY: "auto",
        alignItems: "center",
        justifyContent: "center",
        }}
      >
        <Paper
          elevation={12}
          sx={{
            p: 4,
            maxHeight: "80vh",    
            overflowY: "auto",
            "&::-webkit-scrollbar": {
            display: "none",
            },
            width: 400,
            backdropFilter: "blur(10px)",
            background: "rgba(2,6,23,0.7)",
            border: "1px solid rgba(56,189,248,0.2)",
          }}
        >
            <Typography sx={{color:"white",fontWeight:"bold",textAlign:"center"}} variant='h5'>Feedback Form</Typography>
          
          <Box sx={{mt:3}}>
            {questions.map((q, index) => (
                <Box key={index} sx={{ mb: 3 }}>

                    <TextField
                    label="Enter Question"
                    fullWidth
                    value={q.question}
                    onChange={(e) => handleQuestionChange(index, e.target.value)}
                    sx={{ mb: 1 }}
                    />
                    <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <Typography sx={{ color: "#38bdf8" }}>
                    Type: {q.type}
                    </Typography>

                    <Button
                        onClick={() => deleteQuestion(index)}
                        sx={{ background: "#ac1e1e", color: "white" }}
                    >
                        <DeleteIcon sx={{ height: "15px", width: "15px" }} />
                    </Button>
                    </Box>
                </Box>
                ))}
            </Box>

        <Box sx={{mt: 2, display:"flex", alignItems:"center",gap:2}} >
            <Button variant="contained" sx={{mt:1,width:70,px:7}} onClick={() => addQuestion("text")}>
              <Typography variant="h7" sx={{fontWeight:"bold"}} >Text</Typography>
            </Button>
            <Button variant="contained" sx={{mt:1,width:70,px:7}} onClick={() => addQuestion("rating")}>
                <Typography variant="h7" sx={{fontWeight:"bold"}} >Rating</Typography>
            </Button>
            <Button variant="contained" sx={{mt:1,width:70,px:7}} onClick={() => addQuestion("multiline")}>
                <Typography variant="h7" sx={{fontWeight:"bold"}}>MultiText</Typography>
            </Button>
            </Box>
        <Button variant="contained" fullWidth sx={{mt:2}} onClick={handleComplete}> <Typography variant="h7" sx={{fontWeight:"bold"}} >Complete</Typography></Button>
        </Paper>
        </Box>
    </ThemeProvider>
  )
}

export default AdminForm