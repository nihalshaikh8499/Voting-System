// src/pages/LandingPage.jsx
import React from 'react'
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-blue-700 mb-6">Welcome to the Online Voting System</h1>
        <p className="text-gray-700 text-lg mb-8 max-w-xl">
          Participate in secure and transparent elections. Login or Register to get started.
        </p>
        <div className="flex gap-4">
          <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow">Login</Link>
          <Link to="/register" className="bg-gray-200 hover:bg-gray-300 text-blue-700 px-6 py-2 rounded-lg shadow">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
