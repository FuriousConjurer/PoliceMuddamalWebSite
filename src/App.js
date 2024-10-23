// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Dashboard from './webPages/Dashboard';
import MudemaalList from './webPages/MudemaalList';
import NewMudemaalRegistration from './webPages/NewMudemaalRegistration';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/MudemaalList" element={<MudemaalList />} />
        <Route path="/MudemaalRegistration" element={<NewMudemaalRegistration />} />
      </Routes>
    </Router>
  );
}

export default App;
