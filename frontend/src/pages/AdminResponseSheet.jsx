import { useContext, useRef, useState } from "react";
import EventContext from "../context/EventContext";

import {Box,Typography,Paper,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Chip,TextField,InputAdornment,Avatar,Stack,Divider,Button} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import AssignmentIcon from "@mui/icons-material/Assignment";

import { ThemeProvider } from "@mui/material/styles";
import { darkTheme } from "../constants/constant";
import { Load } from "../components/Load";
import toast from "react-hot-toast";


const AdminResponseSheet = ({setchoice}) => {

  const { getResponse } = useContext(EventContext);
  const [headers, setHeaders] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const done = useRef(null);
  const [eventName, setEventName] = useState("");

  const fetchResponses = async () => {

    try {
      setLoading(true);
      if (!eventName.trim()) return;
      const res = await getResponse(eventName);
      console.log(res)
      setHeaders(res.data.headers);
      setRows(res.data.rows);

    }

      catch (error) {
      toast.error(error.response.data.message)
      setHeaders([]);
      setRows([]);
    }
 finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          minHeight: "100vh",
          p: 4,
          background:
            "linear-gradient(135deg, #020617, #0f172a, #020617)",
        }}
      >

        <Paper
          elevation={12}
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 2,
            backdropFilter: "blur(10px)",
            background: "rgba(2,6,23,0.7)",
            border: "1px solid rgba(56,189,248,0.2)",
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
          >
            <Avatar
              sx={{
                width: 45,
                height: 45,
                bgcolor: "rgba(56,189,248,0.15)",
                border:
                  "1px solid rgba(56,189,248,0.3)",
              }}
            >
              <AssignmentIcon
                sx={{ color: "#38bdf8" }}
                fontSize="large"
              />
            </Avatar>

            <Box>
              <Typography
                variant="h4"
                fontWeight="bold"
              >
                Feedback Response Sheet
              </Typography>
            </Box>
          </Stack>
        </Paper>

        <Paper
          elevation={10}
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 2,
            backdropFilter: "blur(10px)",
            background: "rgba(2,6,23,0.7)",
            border: "1px solid rgba(56,189,248,0.15)",
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            justifyContent="space-between"
            alignItems={{ xs: "stretch", md: "center" }}
          >
            <TextField
  fullWidth
  placeholder="Enter Event Name"
  value={eventName}
  onChange={(e) =>
    setEventName(e.target.value)
  }
  onKeyDown={(e)=>{
    if(e.key==="Enter")
    {
      fetchResponses();
    }
  }}    
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <SearchIcon
          sx={{ color: "#38bdf8" }}
        />
      </InputAdornment>
    ),
  }}
/>

            <Button
              variant="contained"
              onClick={fetchResponses}
              sx={{
                py:1,
                height: "56px",
                px: 5,
                fontWeight: "bold",
              }}
            >
              Search
            </Button>

            <Chip
              label={`Responses: ${rows.length}`}
              color="primary"
              sx={{
                fontWeight: "bold",
                px: 1,
                py: 2.5,
              }}
            />
          </Stack>
        </Paper>

        {loading ? (

          <Load/>

        ) : (

          <Paper
            elevation={12}
            sx={{
              overflow: "hidden",
              backdropFilter: "blur(10px)",
              background: "rgba(2,6,23,0.7)",
              border:
                "1px solid rgba(56,189,248,0.15)",
            }}
          >{
            headers.length === 0 ? (<>
            <Typography
        variant="h6"
        sx={{
          color: "#94a3b8",
          textAlign: "center",
          py: 6,
        }}
      >
        Feedback Form Not Found
      </Typography>
            </>
          ):(<><TableContainer sx={{ maxHeight: "75vh" }}>
              <Table stickyHeader>

                <TableHead>
                  <TableRow>
                    {headers.map((header, index) => (
                      <TableCell
                        key={index}
                        sx={{
                          backgroundColor: "#0ca4e6",
                          color: "white",
                          fontWeight: "bold",
                          minWidth: 180,
                        }}
                      >
                        {header}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>

                  {rows.length > 0 ? (

                    rows.map((row, rowIndex) => (

                      <TableRow
                        key={rowIndex}
                        hover
                        sx={{
                          "&:hover": {
                            backgroundColor:
                              "rgba(56,189,248,0.08)",
                          },
                        }}
                      >
                        {headers.map((header, colIndex) => (

                          <TableCell
                            key={colIndex}
                            sx={{
                              color: "#e2e8f0",
                            }}
                          >
                            {String(
                              row[header] || "-"
                            )}
                          </TableCell>

                        ))}
                      </TableRow>

                    ))

                  ) : (

                    <TableRow>
                      <TableCell
                        colSpan={headers.length || 1}
                        align="center"
                        sx={{ py: 8 }}
                      >
                        <Typography variant="h6">
                          No Responses Found
                        </Typography>

                        <Divider sx={{ my: 2 }} />

                        <Typography
                          variant="body2"
                          sx={{
                            color: "#94a3b8",
                          }}
                        >
                          Enter event name to fetch responses
                        </Typography>
                      </TableCell>
                    </TableRow>

                  )}

                </TableBody>

              </Table>
            </TableContainer>
            </>)
          }
            
          </Paper>

        )}
      </Box>
    </ThemeProvider>
  );
};

export default AdminResponseSheet;