// components/ReportedPropertiesList.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../context/authContext';

const ReportedPropertiesList = () => {
  const { user } = useContext(AuthContext);
  const [reportedProperties, setReportedProperties] = useState([]);

  useEffect(() => {
    if (user && user.role === 'admin') {
      // Fetch reported properties only if the user is an admin
      fetchReportedProperties();
    }
  }, [user]);

  const fetchReportedProperties = async () => {
    try {
      const response = await axios.get('/api/property/reportedproperties', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setReportedProperties(response.data);
      console.log(response)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Reported Properties List</h2>
      <ul>
        {reportedProperties.map(property => (
          <li key={property._id}>
            <strong>{property.title}</strong> - {property.reports} reports
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReportedPropertiesList;
