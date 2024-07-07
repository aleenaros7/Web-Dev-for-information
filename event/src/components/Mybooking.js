import * as React from 'react';
import Badge from '@mui/joy/Badge';
import Box from '@mui/joy/Box';
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
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
export default function ColorInversionHeader() {
  const [color, setColor] = React.useState('primary');
  const [open, setOpen] = React.useState(false);
  const [event_info, setEvent_info] = React.useState([]);
  const [event_status, setEvent_status] = React.useState([]);
  const data = localStorage.getItem('user_data')

  
  if(data===''){    
    return <Navigate to="/login" replace={true} />
  }

  const handleSubmit = async (event) => {
    const user_data = localStorage.getItem('user_data')
    var myObject = JSON.parse(user_data);
 
  const response = await fetch('http://localhost:2000/get_myevents', {
      method: 'POST',
      body: JSON.stringify({user_id:myObject._id,user_role:myObject.user_role}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const result = await response.json();
    //   console.log(result);
      setEvent_info(result);
    


  };


  const approve_dec = async (e) => {
    let id = e.target.getAttribute('data-id')
    let status = e.target.getAttribute('data-status')
 
    const user_data = localStorage.getItem('user_data')
    var myObject = JSON.parse(user_data);
    
  const response = await fetch('http://localhost:2000/approve_decline', {
      method: 'POST',
      body: JSON.stringify({booking_id:id,event_status:status}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const result = await response.json();
  
    setEvent_status(result);
    
  };

  let message;
  if(event_status.message){
  message='<div style="color:green">'+event_status.message+'</div>';
 
  
  }
  handleSubmit();

  var myObject = JSON.parse(data);
  let checkrole
  if(myObject.user_role==1){
    checkrole=''
  }else{
    checkrole=2
  }

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

    <h2>My Booking</h2>
    <span dangerouslySetInnerHTML={{ __html: message }} />
<Table aria-label="basic table">
  
<thead>
  <tr>
    <th style={{ width: '40%' }}>Name</th>
    <th>Date</th>
    <th>Location</th>
    <th>Contact</th>
    <th hidden={checkrole}>Action</th>
  </tr>
</thead>
<tbody>
{event_info.map((data, idx) => (

  <tr>
    <td>{data.events_detail.event_contact_aleena}</td>
    <td>{data.events_detail.event_date_aleena}</td>
    <td>{data.events_detail.event_location_aleena}</td>
    <td>{data.events_detail.event_contact_aleena}</td>
    <td hidden={checkrole}><a data-id={data._id} data-status="approved" onClick={approve_dec}>{data.event_status=='approved'?data.event_status:"Approve"}</a> |<a data-id={data._id} data-status="declined" onClick={approve_dec}>{data.event_status=='declined'?data.event_status:"Decline"}</a> </td>
  </tr>
))}
</tbody>
</Table>

</div>
  );
}