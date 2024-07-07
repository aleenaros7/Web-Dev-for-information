import React, { Component } from 'react'; 
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom'; 
import Login from './components/Login'; 
import Dashboard from './components/Dashboard'; 
import Mybooking from './components/Mybooking'; 
import Logout from './components/Logout'; 
import Event_book from './components/Event_book'; 
import Add_event from './components/Add_event';
import Add_user from './components/Add_user';
import Users from './components/Users';
import './App.css'; 

class App extends Component { 
render() { 
	return ( 
	<Router> 
		<div className="App"> 			
		<Routes> 
		<Route exact path='/login' element={< Login />}></Route> 
        <Route exact path='/dashboard' element={< Dashboard />}></Route> 
		<Route exact path='/mybooking' element={< Mybooking />}></Route>
		<Route exact path='/dashboard/event/:id' element={< Event_book />}></Route>
		<Route exact path='/logout' element={< Logout />}></Route>
		<Route exact path='/add_event' element={< Add_event />}></Route>
		<Route exact path='/add_user' element={< Add_user />}></Route>	
		<Route exact path='/users' element={< Users />}></Route>			
		</Routes> 
		</div> 
	</Router> 
); 
} 
} 

export default App;
