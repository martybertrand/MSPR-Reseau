import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Login from './page/PageAuth';
import HomePage from './page/HomePage';
import AdresseIp from './page/adresseIp';
import { ContactUs } from './page/validatorEmail';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="" exact element={<Login/>} />
          <Route path="adresseip" element={<AdresseIp/>} />
          <Route path="email" element={<ContactUs/>} />
          <Route path="/home" element={<HomePage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;