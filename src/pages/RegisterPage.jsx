// src/pages/RegisterPage.jsx
import React,{ useState } from 'react';
// import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user', // default role
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Register:', formData);
    // try {
    //   const res = await API.post('/auth/register', formData);
    //   console.log('Registered:', res.data);
    //   navigate('/login'); // redirect to login after registration
    // } catch (err) {
    //   console.error('Register error:', err.response?.data?.message || err.message);
    // }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Register</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            className="w-full border px-4 py-2 rounded-lg"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            className="w-full border px-4 py-2 rounded-lg"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            className="w-full border px-4 py-2 rounded-lg"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Register As</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
