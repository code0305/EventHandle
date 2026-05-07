
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useContext } from 'react';
import UserContext from '../context/UserContext';
import toast from 'react-hot-toast';
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


export default function Navbar({setSearch,setAuthUser}) {
  const nav = useNavigate();
   const {Logout}= useContext(UserContext);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const logout = async () => {
          try {
            const res = await Logout();
            toast.success(res?.data?.message)
            setAuthUser(null);
            nav("/signin");
          } catch (error) {
            console.log("Error Logout:"+error);
          }};

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
    anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem
  sx={{
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.05)"
    }
  }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p onClick={logout}>Logout</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box>
      <AppBar
        position="static"
        sx={{
            background: "transparent",
            boxShadow: "none",
            borderBottom: "1px solid rgba(255,255,255,0.1)"
        }}
        >
          <Container maxWidth="lg">
        <Toolbar sx={{display:"flex", alignItems: "center",justifyContent:"space-between"}}>
          <Search sx={{width: {  sm: "200px", md: "300px" , lg:"350px"}}}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder=" Search Events"
              inputProps={{ 'aria-label': '  search' }}
              onChange={(e) => setSearch(e.target.value) }
              
            />
          </Search>
          <Box/>
          <Box sx={{ display: { xs: 'none', md: 'flex',gap:1 } }}>
            <IconButton
              size="small"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Button
            onClick={logout}
  sx={{
    ml:3,
    textTransform: "none",
    fontWeight: 600,
    px: 3,
    py:1,
    borderRadius: "50px",
    background: "linear-gradient(135deg,#2563eb,#06b6d4)",
    color: "white",
    "&:hover": {
      background: "linear-gradient(135deg,#1d4ed8,#0891b2)"
    }
  }}
>
  Logout
</Button>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="small"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
                sx={{
                "&:focus": {
                backgroundColor: "transparent"
                },
                "&:hover": {
                backgroundColor: "rgba(255,255,255,0.08)"
                }
            }}
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
        </Container>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}