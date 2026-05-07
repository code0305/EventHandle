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

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
            <Avatar
              src={authUser?.profilePic?.mediaUrl}
              sx={{ width: 50, height: 80 }}
            >
              {!authUser?.profilePic?.mediaUrl &&
                authUser?.fullName?.charAt(0)?.toUpperCase()}
            </Avatar>

            <Typography
              color="primary"
              fontWeight="bold"
            >
              {authUser?.fullName}
            </Typography>
          </Box>
          </Box>
        </Box>
      )}
      {authUser?.Role==="User"&&(
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
                "Dashboard"
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

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
            <Avatar
              src={authUser?.profilePic?.mediaUrl}
              sx={{ width: 50, height: 60 }}
            >
              {!authUser?.profilePic?.mediaUrl &&
                authUser?.fullName?.charAt(0)?.toUpperCase()}
            </Avatar>

            <Typography
              color="primary"
              fontWeight="bold"
            >
              {authUser?.fullName}
            </Typography>
          </Box>

          </Box>
          </Box>
      )}
    </>

  )
}