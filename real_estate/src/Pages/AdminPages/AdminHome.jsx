// AdminDashboard.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../NavBar';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get('/api/auth/allusers');
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="mx-10 mt-6">
        <h1 className="text-3xl font-bold text-[#9041c1] mb-4">All Users</h1>
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr>
              <th className="border bg-[#9041c1] text-white py-2 px-4">Name</th>
              <th className="border bg-[#9041c1] text-white py-2 px-4">Email</th>
              <th className="border bg-[#9041c1] text-white py-2 px-4">Mobile</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="border py-2 px-4">{user.name}</td>
                <td className="border py-2 px-4">{user.email}</td>
                <td className="border py-2 px-4">{user.mobile}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
