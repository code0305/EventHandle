import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { images } from '../constants/constant';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function StarLayout() {
    const nav = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 ,height: {
      xs: 250,
      sm: 300,
      md: 400,
      lg: 600
    },
    marginTop:5}}>
      <Grid container spacing={{ xs: 5, sm:6, md: 7 }} columns={{ xs: 1, sm: 2, md: 3 }}  >
{images.map((item, index) => (
  <Grid key={index} xs={6} sm={4} md={3} sx={{mt:2}}>
    <Item
      sx={{
        width: "100%",
        height: {
      xs: 110,   
      sm: 130,  
      md: 150,  
      lg: 170   
    },
    mr:2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 1,
        flexDirection: "column",
        background:"transparent",
         "&:hover": {
            transform: "scale(1.05)",
            transition: "transform 0.3s ease-in-out",
          },
      }}
    >
      <img
        src={item.src}
        alt={item.name}
        style={{
          maxWidth: "100%",
          maxHeight: "90%",
          objectFit: "cover"
        }}
      />
      <Typography variant="h6" sx={{mt:1}}>
        {item.name}
      </Typography>
    </Item>
  </Grid>
))}
      </Grid>
    </Box>
  );
}
