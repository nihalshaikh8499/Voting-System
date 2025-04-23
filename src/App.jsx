import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Polls from './pages/Polls';
import CreatePoll from './pages/CreatePoll';

const PrivateRoute = ({ children }) => (
  localStorage.getItem('token') ? children : <Navigate to="/login" />
);

export default function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<PrivateRoute><Polls /></PrivateRoute>} />
      <Route path="/create" element={<PrivateRoute><CreatePoll /></PrivateRoute>} />
    </Routes>
  );
}