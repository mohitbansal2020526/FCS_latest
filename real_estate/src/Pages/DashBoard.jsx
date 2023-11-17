import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const Dashboard = () => {
  const [contracts, setContracts] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userIdFromToken = decodedToken.user.id;
    setUserId(userIdFromToken);

    if (userIdFromToken) {
      axios
        .get(`/api/contract/seller/${userIdFromToken}`)
        .then((response) => {
          setContracts(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  // Function to handle contract verification
  const verifyContract = (contractId) => {
    // Make an API call to verify the contract using its ID
    axios
      .post(`/api/contract/verify/${contractId}`)
      .then((response) => {
        // Handle the verification result, you can show a message to the user
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Function to handle selling the contract
  const sellContract = (contractId) => {
    // Make an API call to initiate the selling process for the contract
    axios
      .post(`/api/contract/sell/${contractId}`)
      .then((response) => {
        // Handle the selling process result, you can show a message to the user
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-[#9041c1] mb-4">Your Contracts</h2>
      <ul>
        {contracts.map((contract) => (
          <li key={contract._id} className="mb-4 p-4 border border-gray-300 rounded-lg">
            <p className="font-bold">Contract ID:</p>
            <p>{contract._id}</p>
            <p className="font-bold">Type:</p>
            <p>{contract.type}</p>
            <p className="font-bold">Buyer:</p>
            <p>{contract.buyerName}</p>
            <p className="font-bold">Terms:</p>
            <p>{contract.terms}</p>
            <p className="font-bold">Key:</p>
            <p>{contract.signature}</p>

            <button className="bg-green-500 text-white p-2 rounded-lg m-2" onClick={() => verifyContract(contract._id)}>
              Verify
            </button>

            <button className="bg-blue-500 text-white p-2 rounded-lg m-2" onClick={() => sellContract(contract._id)}>
              Sell
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
