import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthScreen from './components/AuthScreen';
import RegisterScreen from './components/RegisterScreen';
import Congrats from './components/Congrats';
import Login from './components/Login'; 
import Forgot from './components/forgot';
import Home from './components/Home'; 
import Profile from './components/Profile'; // Импорт компонента Profile
import Upload from './components/Upload'; // Импорт компонента Upload
import Orders from './components/Orders';
import Zakaz from './components/Zakaz';
import Loved from './components/loved';
import Payment from './components/Payment';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/congrats" element={<Congrats />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} /> {/* Маршрут для Profile */}
        <Route path="/upload" element={<Upload />} /> {/* Добавлен маршрут для Upload */}
        <Route path="/orders" element={<Orders />} />
        <Route path="/zakaz" element={<Zakaz />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/loved" element={<Loved />} />
      </Routes>
    </Router>
  );
}

export default App;
