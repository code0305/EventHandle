import { Avatar, Box, Button, Typography } from '@mui/material'

export const SideBar = ({authUser , active , setActive}) => {
  return (
    <>
    { authUser?.Role==="Admin" && (
    <Box>
        <Box
          sx={{
            width: { xs: 100,  sm: 110 ,md:120},
            height: "100vh",
            bgcolor: "#020617",
            borderRight: "1px solid rgba(255,255,255,0.1)",
            p: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
          <Box>
            <Typography
              color="primary"
              fontWeight="bold"
              sx={{ cursor: "pointer", mb: 1 }}
            >
              Meet Up
            </Typography>
            
            <Typography sx={{ fontWeight: "bold", color: "white" }}>
              {authUser?.Role}
            </Typography>
          </Box>
            <Box mt={5}>
              {[
                "Dashboard",
                "Orders",
                "Add Events",
                "Reports"
              ].map((item) => (
                <Button
                  key={item}
                  fullWidth
                  onClick={() => {
                        setActive(item);
                      }}
                  sx={{
                    my:1,
                    justifyContent: "flex-start",
                    color: active === item ? "white" : "#38bdf8",
                    borderRadius: 2,
                    fontWeight: "bold",
                    backgroundColor: active === item ? "rgba(3,165,235,0.74)": "transparent",
                    "&:hover": {
                      backgroundColor:"rgba(5, 65, 90, 0.74)",
                      color: "#fff"
                    }
                  }}
                >
                  {item}
                </Button>
              ))}
            </Box>

          {/* Bottom Section */}
          <Box>
            <Box sx={{display:"flex" ,alignItems:"center", mb:3 }}>
              {/* <Avatar
                src={`http://localhost:5001/uploads/${authUser?.profilePic}`}
                sx={{ width: 40, height: 40 }}
              /> */}
              <Typography
                color="primary"
                fontWeight="bold"
                sx={{ ml: 2,mb:3 }}
              >
                {authUser?.fullName}
              </Typography>
            </Box>
            </Box>
          </Box>
        </Box>
      )}
      {authUser?.Role==="User"&&(
        <Box>
        <Box
          sx={{
            width: 260,
            height: "100vh",
            bgcolor: "#020617",
            borderRight: "1px solid rgba(255,255,255,0.1)",
            p: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
          <Box>
            <Typography
              color="primary"
              fontWeight="bold"
              sx={{ cursor: "pointer", mb: 1 }}
            >
              Meet Up
            </Typography>
            
            <Typography sx={{ fontWeight: "bold", color: "white" }}>
              {authUser?.Role}
            </Typography>

          </Box>
          </Box>
          </Box>
      )}
    </>

  )
}