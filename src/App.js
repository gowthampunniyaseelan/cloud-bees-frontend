import './App.css';
import UserListPage from './UserListPage';
import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Container, Card, CardContent, CardHeader, Avatar, Grid } from '@material-ui/core';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import UserDetails from './UserDetails';
function App() {
  return (
    <Router>
    
      <AppBar position="static">
        <Toolbar>
        <Typography variant="h6" style={{ fontWeight: 'bold' }}>GitHub User App</Typography>

        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<UserListPage />} />
        <Route path="/user/:username" element={<UserDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
