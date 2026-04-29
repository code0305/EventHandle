import BusinessIcon from "../assets/Business.jpg"
import TechnologyIcon from "../assets/technology.jpg";
import EducationIcon from "../assets/education.jpg"
import EntertainmentIcon from "../assets/entetainment.webp";
import SportsIcon from '../assets/sports.jpg';
import CulturalIcons from "../assets/Cultural.webp";
import { createTheme } from "@mui/material";

export const mostSpokenLanguages = [
  "English",
  "Mandarin Chinese",
  "Hindi",
  "Spanish",
  "French",
  "Modern Standard Arabic",
  "Bengali",
  "Portuguese",
  "Russian",
  "Urdu"
];

export const images=[
  {name:'Technology',src:TechnologyIcon},
  {name:'Education',src:EducationIcon},
  {name:'Entertainment',src:EntertainmentIcon},
  {name:'Business',src:BusinessIcon},
  {name:'Sports',src:SportsIcon},
  {name:'Cultural',src:CulturalIcons},
]
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#0ca4e6" },
    background: {
      default: "#091b74",
      paper: "#1432dd",
    },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#020617',
          color: '#e2e8f0',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: '#020617',
          color: '#e2e8f0',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#1e293b",
          },
        },
      },
    },
  },
});

export const states = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry'
];

export const languages = [
  {  label: 'English' },
  {  label: 'Spanish' },
  {  label: 'French' },
  {  label: 'German' },
  {  label: 'Italian' },
  {  label: 'Portuguese' },
  {  label: 'Russian' },
  {  label: 'Chinese' },
  {  label: 'Japanese' },
  {  label: 'Korean' }
];