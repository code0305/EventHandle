import React, { useContext, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Tooltip
} from '@mui/material';
import { CameraAlt as CameraAltIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme, languages, states } from '../constants/constant';
import UserContext from '../context/UserContext';
import toast from 'react-hot-toast';

const OnboardingPage = () => {

  const nav = useNavigate();
  const {onboard} = useContext(UserContext);

  const [formData, setFormData] = useState({
    fullName: '',
    profilePic: null,
    language: '',
    state: '',
    phoneNumber: ''
  });

  const [profilePicPreview, setProfilePicPreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profilePic: file }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  
  const handleSubmit = async (e) => {
    try {
    e.preventDefault();
    const form = new FormData();
    form.append("fullName", formData.fullName);
    form.append("profilePic", formData.profilePic);
    form.append("language", formData.language);
    form.append("phoneNumber", formData.phoneNumber);  
    form.append("state", formData.state);  
    const res = await onboard(form);
    if(res?.data?.success)
    {
      toast.success(res?.data?.message)
      nav("/")
    }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }

  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #020617, #0f172a, #020617)"
        }}
      >
        <Paper
          elevation={12}
          sx={{
            p: 4,
            width: 480,
            backdropFilter: "blur(10px)",
            background: "rgba(2,6,23,0.7)",
            border: "1px solid rgba(56,189,248,0.2)"
          }}
        >
          <Box component="form" onSubmit={handleSubmit}>
            
            {/* 🔹 Profile Section */}
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                mb: 3
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                Onboarding Page
              </Typography>

              <Box sx={{ position: 'relative' }}>
                <Avatar
                  src={profilePicPreview}
                  sx={{
                    width: 120,
                    height: 120,
                    border: '4px solid',
                    borderColor: 'grey.200',
                    bgcolor: profilePicPreview ? 'transparent' : 'grey.300'
                  }}
                >
                  {!profilePicPreview &&
                    formData.fullName?.charAt(0)?.toUpperCase()}
                </Avatar>

                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="profile-pic-upload"
                  type="file"
                  onChange={handleProfilePicChange}
                />

                <Tooltip title="Upload profile picture">
                  <label htmlFor="profile-pic-upload">
                    <Button
                      component="span"
                      size="small"
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        color: 'white',
                        '&:hover': {
                          bgcolor: 'primary.dark'
                        }
                      }}
                    >
                      <CameraAltIcon />
                    </Button>
                  </label>
                </Tooltip>
              </Box>
            </Box>

            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              margin="normal"
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Language</InputLabel>
              <Select
                name="language"
                value={formData.language}
                label="Language"
                onChange={handleInputChange}
              >
                <MenuItem value="">
                  <em>Select your state</em>
                </MenuItem>
                {languages.map((lang) => (
                  <MenuItem key={lang.label} value={lang.label}>
                    {lang.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>State</InputLabel>
              <Select
                name="state"
                value={formData.state}
                label="State"
                onChange={handleInputChange}
              >
                <MenuItem value="">
                  <em>Select your state</em>
                </MenuItem>
                {states.map((state) => (
                  <MenuItem key={state} value={state}>
                    {state}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              margin="normal"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 4, py: 1.5 }}
            >
              Complete Profile
            </Button>

          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default OnboardingPage;