import * as React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
  } from "react-router-dom";
export default function logout() {
   
    const data = localStorage.getItem('user_data')
   
      localStorage.setItem('user_data', '');
      window.location.href = "/login";
  // return <Navigate to="/login" replace={false} />

  
  
  }
  