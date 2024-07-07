import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
const root = ReactDOM.createRoot(document.getElementById('root'));
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const data = localStorage.getItem('user_data')

  
  // setInfo(data);
  // if(data===''){    
  //   return <Navigate to="/login" replace={true} />
  // }
root.render(
  <React.StrictMode>
  {data?(
     <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} columns={16}>
        
        <Grid item xs={4}>
        <Box
      my={4}
      display="flex"
      alignItems="center"
      gap={4}
      p={2}
      sx={{ border: '2px solid grey' }}
    >
      <h3>Dashboard</h3>
    </Box>
          <Paper>              
            <MenuList>              
              <MenuItem ><a href='/dashboard'>Dashboard</a></MenuItem>          
              <MenuItem ><a href='/mybooking'>My Booking</a></MenuItem>
              <MenuItem ><a href='/users'>Users</a></MenuItem>
              <MenuItem ><a href='/logout'>Logout</a></MenuItem>
            </MenuList>                
          </Paper>
       
        </Grid>
        <Grid item xs={12}>
          <Item> <App /></Item>
        </Grid>
      </Grid>
    </Box>
    ): <App />}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
