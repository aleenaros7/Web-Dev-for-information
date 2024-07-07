import * as React from 'react';

import Badge from '@mui/joy/Badge';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Dropdown from '@mui/joy/Dropdown';
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';
import ListDivider from '@mui/joy/ListDivider';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import NotificationsIcon from '@mui/icons-material/Notifications';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Table from '@mui/joy/Table';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
// import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
export default function ColorInversionHeader() {
  const [color, setColor] = React.useState('primary');
  const [open, setOpen] = React.useState(false);
  const [event_id, setEvent] = React.useState();
   const [info, setInfo] = React.useState([])
   const [info_event, setEvent_info] = React.useState([])
  const data = localStorage.getItem('user_data')

  
  // setInfo(data);
  if(data===''){    
    return <Navigate to="/login" replace={true} />
  }

  const handleSubmit = async (event) => {
    const data2 = localStorage.getItem('user_data')
    const pathname = window.location.pathname; 
    const lastPart = pathname.split("/").pop(); //this will give you register.
    var myObject2 = JSON.parse(data2);
    event.preventDefault();
    const data_frm = new FormData(event.currentTarget);
   

    const response = await fetch('http://localhost:2000/add_event', {
      method: 'POST',
      body: JSON.stringify({
        event_name_aleena:data_frm.get('event_name_aleena'),
        event_date_aleena:data_frm.get('event_date_aleena'),
        event_location_aleena:data_frm.get('event_location_aleena'),
        event_contact_aleena:data_frm.get('event_contact_aleena'),
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const result = await response.json();
    // console.log(result.message);


    setEvent_info(result);

    setTimeout(() => {
        window.location.reload();
      }, 3000);
    


  };


  const get_ev = async (event) => { 
   

    const response = await fetch('http://localhost:2000/get_event', {
      method: 'POST',
      body: JSON.stringify({}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const result = await response.json();
    //  console.log(result);
    setInfo(result);
    


  };

  let message;
  if(info_event.message){
  message='<div style="color:green">'+info_event.message+'</div>';  
  }



  var myObject = JSON.parse(data);
  if(myObject.user_role !=1){
    return <Navigate to="/dashboard" replace={true} />
  }else{
  return (

    
    <div>
       
    <Sheet
      variant="solid"
      color={color}
      invertedColors
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexGrow: 1,
        p: 2,
        borderRadius: { xs: 0, sm: 'sm' },
        minWidth: 'min-content',
        ...(color !== 'warning' && {
          background: (theme) =>
            `linear-gradient(to top, ${theme.vars.palette[color][600]}, ${theme.vars.palette[color][500]})`,
        }),
      }}
    >
     
      <Box sx={{ flex: 1, display: 'flex', gap: 1, px: 2 }}>
        
      </Box>
      <Box sx={{ display: 'flex', flexShrink: 0, gap: 2 }}>
       
        <Input
          placeholder="Search"
          variant="soft"
          size="sm"
          endDecorator={
            <Typography
              component="span"
              variant="outlined"
              level="body-xs"
              sx={{ bgcolor: 'background.surface', mx: 0 }}
            >
            </Typography>
          }
          sx={{
            '--Input-paddingInline': '12px',
            width: 160,
            display: { xs: 'none', lg: 'flex' },
          }}
        />
        <Badge badgeContent={2} variant="solid" color="danger">
          <IconButton variant="soft" sx={{ borderRadius: '50%' }}>
            <NotificationsIcon />
          </IconButton>
        </Badge>
      </Box>

      
    </Sheet>

    <h2>Add Event</h2>
 
  <span dangerouslySetInnerHTML={{ __html: message }} />

    <form
            onSubmit={handleSubmit}
          >
            <Stack spacing={2}>
           
              <FormControl>
           
                <FormLabel>Event Name</FormLabel>
                <Input name="event_name_aleena" autoFocus required />
              </FormControl>
              <FormControl>
                <FormLabel>Event Date</FormLabel>
                {/* <Input name="event_date_aleena" required /> */}
                <Input
                type="date"
                name="event_date_aleena"  required />
              </FormControl>

              <FormControl>
                <FormLabel>Event Location</FormLabel>
                <Input name="event_location_aleena" required />
              </FormControl>
              <FormControl>
                <FormLabel>Contact Number</FormLabel>
                <Input type="number" name="event_contact_aleena" required />
              </FormControl>

              <Button type="submit">Add</Button>
            </Stack>
          </form>

</div>
  );
        }
}