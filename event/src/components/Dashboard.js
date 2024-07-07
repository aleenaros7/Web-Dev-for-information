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
  const data = localStorage.getItem('user_data')

  
  if(data===''){    
    return <Navigate to="/login" replace={true} />
  }

  const handleSubmit = async (event) => {
  
   

    const response = await fetch('http://localhost:2000/get_event', {
      method: 'POST',
      body: JSON.stringify({}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const result = await response.json();
   
    setInfo(result);
    


  };
  handleSubmit();

 
  var myObject = JSON.parse(data);

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

    <h2>Events <a href='/add_event'>+Add Event</a></h2>
<Table aria-label="basic table">
  
<thead>
  <tr>
    <th style={{ width: '40%' }}>Name</th>
    <th>Date</th>
    <th>Location</th>
    <th>Contact</th>
    <th>Action</th>
  </tr>
</thead>
<tbody>
{info.map((data, idx) => (

  <tr>
    <td>{data.event_name_aleena}</td>
    <td>{data.event_date_aleena}</td>
    <td>{data.event_location_aleena}</td>
    <td>{data.event_contact_aleena}</td>
    <td><a href={`/dashboard/event/${data._id}`} activeClassName="current">Book</a></td>
  </tr>
))}
</tbody>
</Table>

<Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>Book Event </DialogTitle>
          <DialogContent>Fill in the information of the Booking.</DialogContent>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setOpen(false);
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input autoFocus required />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input required />
              </FormControl>
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
</div>
  );
}