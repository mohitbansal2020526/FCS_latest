import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from './context/authContext';

const Ekyc = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser,user } = useContext(AuthContext);

  const handleEkycSubmit = async () => {
    // try {
    //   const response = await axios.post(
    //     // 'https://192.168.3.39:5000/kyc',
    //     '/api/auth/ekyc',
    //     { email, password }
    //   );

    //   console.log(response.data.status)

    //   if (response.data.status === 'success') {
        // const userData = {
        //   role: 'IIITD',
        // };
        // setUser(userData);
        // console.log(user)
        navigate('/login');
    //   } else {
    //     console.error('Authentication failed');
    //   }
    // } catch (error) {
    //   console.error('Error during eKYC:', error);
    // }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          eKYC Form
        </h2>
        <form onSubmit={handleEkycSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Ekyc;
