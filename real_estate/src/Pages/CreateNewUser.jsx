import React, { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import AuthContext from "../context/authContext";// Import useNavigate
import {jwtDecode }from 'jwt-decode'; 

const CreateUser = () =>{
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobile, setMobile] = useState("");
    const {login,user} =useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        if (name && email && password && mobile) {
          try {
            const response = await axios.post('/api/auth/createuser', {
              email,
              name,
              password,
              mobile
            });
      
            if (response.data.success) {
              const decodedToken = jwtDecode(response.data.authtoken); // Decode the JWT token
              localStorage.setItem('token', response.data.authtoken);
              const userData = {
                role: decodedToken.user['role'],
                id: decodedToken.user['id'],
                // Add other user data as needed
              };
              
              login(userData);             
              navigate('/user');

            } else {
              alert('Sorry a user with this email already exists');
            }
          } catch (error) {
            console.error(error);
            alert('An error occurred while Singing Up.');
          }
        } else {
          alert('Please fill in all the fields');
        }
      };

    return(

        <div className='flex justify-center items-center h-screen'>
        <div className='bg-white border-2 border-[#9041c1] shadow-sm px-4 py-2 rounded-lg'>
            <form onSubmit={handleSubmit} className="w-[280px]">
                <div className='flex justify-center'>
                    <img className="h-10 inline mr-2 rounded-full" src="/Images/real_estate.webp" alt="Failed to load" />
                </div>
                <div className='flex justify-center'>
                <h1 className='text-2xl font-bold text-[#9041c1] mt-2'>Create Account</h1>
                </div>
                <div className="flex flex-col text-black py-2">
                    <label className="text-[#9041c1]">Name</label>
                    <input
                        className="text-black rounded-lg bg-white mt-2 p-2 border-2 border-[#9041c1]0 focus:bg-gray-200 focus:outline-none"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="flex flex-col text-black py-2">
                    <label className="text-[#9041c1]">Email Id</label>
                    <input
                        className="text-black rounded-lg bg-white mt-2 p-2 border-2 border-[#9041c1]0 focus:bg-gray-200 focus:outline-none"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="flex flex-col text-black py-2">
                    <label className="text-[#9041c1]">Password</label>
                    <input
                        className="text-black rounded-lg bg-white mt-2 p-2 border-2 border-[#9041c1] focus:bg-gray-200 focus:outline-none"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="flex flex-col text-black py-2">
                    <label className="text-[#9041c1]">Phone number</label>
                    <input
                        className="text-black rounded-lg bg-white mt-2 p-2 border-2 border-[#9041c1] focus:bg-gray-200 focus:outline-none"
                        type="number"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                    />
                </div>

                <div className="flex-auto mt-1">
                    <button
                        type="submit"
                        className="w-full my-5 py-2 bg-[#9041c1] shadow-lg shadow-[#9041c1]/50 hover:shadow-[#9041c1]/40 text-white font-semibold rounded-lg"
                    >
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
        
    </div>
    );
}

export default CreateUser;