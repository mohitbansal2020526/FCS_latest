import React, { useState, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import NavBar from '../NavBar';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useContext } from 'react';
import AuthContext from '../../context/authContext';

const Home = () => {
  const [recommendedProperties, setRecommendedProperties] = useState([]);
  const [selectedType, setSelectedType] = useState('All');
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem('token');

  useEffect(() => {
    getRecommendedProperties();
  }, [selectedType]);

  const getRecommendedProperties = async () => {
    try {
      const response = await axios.get(`/api/property/fetchavailablelistings?type=${selectedType.toLowerCase()}`, {
        headers: {
          'auth-token': token,
        },
      });
      setRecommendedProperties(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  const handleViewDetails = (propertyId) => {
    navigate(`/user/details/${propertyId}`);
  }

  return (
    <div>
      <NavBar />
      <div className='mx-10 mt-2'>
        
        <div className='flex my-2 justify-center'>
          <button
            className={`bg-[#9041c1] text-white py-2 px-4 rounded-md mr-2 ${selectedType === 'All' ? 'opacity-75' : ''}`}
            onClick={() => handleTypeChange('All')}
          >
            All
          </button>
          <button
            className={`bg-[#9041c1] text-white py-2 px-4 rounded-md mr-2 ${selectedType === 'Sell' ? 'opacity-75' : ''}`}
            onClick={() => handleTypeChange('Sell')}
          >
            Sell
          </button>
          <button
            className={`bg-[#9041c1] text-white py-2 px-4 rounded-md ${selectedType === 'Rent' ? 'opacity-75' : ''}`}
            onClick={() => handleTypeChange('Rent')}
          >
            Rent
          </button>
        </div>
        <h1 className='font-bold text-2xl text-[#9041c1] mx-2 mt-4'>Properties Available:</h1>
        <div className="flex flex-wrap justify-around mt-2">
          {recommendedProperties.map((property, index) => (
            <div key={index} className="bg-white p-3 rounded-lg shadow-md w-[30%] mb-4 border border-[#9041c1]">
              <img className='rounded-lg' src='/Images/bg.jpg' alt="Failed to Load" />
              <div className='flex justify-center'>
                <p className='mx-1 font-bold'>{property.title}</p>
                <p>|</p>
                <p className='mx-1 font-bold'>{property.location}</p>
                <p>|</p>
                <p className='mx-1 font-bold'>Price: ${property.price}</p>
                <p>|</p>
                <p className='mx-1 font-bold'>Listing Type: {property.listing_type}</p>
                {/* You can add more property details here */}
              </div>
              <div className='flex justify-center'>
                <button className="bg-[#9041c1] text-white py-2 px-4 rounded-md mt-2" onClick={() => handleViewDetails(property._id)}>
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;