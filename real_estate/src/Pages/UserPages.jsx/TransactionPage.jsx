import React, { useEffect, useState } from "react";
import axios from "axios";

const MyProperties = () => {
  const [transactions, setTransactions] = useState([]);
  const [propertyNames, setPropertyNames] = useState({});
  const [propertyLocations, setPropertyLocations] = useState({});
  const [propertyDescriptions, setPropertyDescriptions] = useState({});
  const [sellerNames, setSellerNames] = useState({});
  const [buyerNames, setBuyerNames] = useState({});
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/transaction/gettransaction', {
          headers: {
            'auth-token': token,
          },
        });
        const transactionData = response.data;

        await fetchPropertyDetails(transactionData);
        await sellerDetails(transactionData);
        await buyerDetails(transactionData);

        setTransactions(transactionData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [token]); // Added token as a dependency

  const fetchPropertyDetails = async (transactions) => {
    try {
      const propertyTitles = {};
      const propertyLocationList = {};
      const propertyDescriptionList = {};
      await Promise.all(
        transactions.map(async (transact) => {
          const propertyResponse = await axios.get(`/api/property/fetchproperty/${transact.property}`, {
            headers: {
              'auth-token': token,
            },
          });
          propertyTitles[transact.property] = propertyResponse.data.title;
          propertyLocationList[transact.property] = propertyResponse.data.location;
          propertyDescriptionList[transact.property] = propertyResponse.data.description;
        })
      );

      setPropertyNames(propertyTitles);
      setPropertyLocations(propertyLocationList);
      setPropertyDescriptions(propertyDescriptionList);
    } catch (error) {
      console.error("Error fetching property details:", error.message);
    }
  };

  const sellerDetails = async (transactions) => {
    try {
      const sellerDetails = {};

      await Promise.all(
        transactions.map(async (transact) => {
          const sellerResponse = await axios.get(`/api/auth/getuser/${transact.prevowner}`, {
            headers: {
              'auth-token': token,
            },
          });
          sellerDetails[transact.prevowner] = sellerResponse.data.name;
        })
      );

      setSellerNames(sellerDetails);
    } catch (error) {
      console.error("Error fetching seller details:", error.message);
    }
  };

  const buyerDetails = async (transactions) => {
    try {
      const buyerDetails = {};

      await Promise.all(
        transactions.map(async (transact) => {
          const buyerResponse = await axios.get(`/api/auth/getuser/${transact.newowner}`, {
            headers: {
              'auth-token': token,
            },
          });
          buyerDetails[transact.newowner] = buyerResponse.data.name;
        })
      );

      setBuyerNames(buyerDetails);
    } catch (error) {
      console.error("Error fetching buyer details:", error.message);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-semibold text-[#9041c1] mb-6">My Transaction's History</h1>
      <table className="w-full bg-white border border-gray-300 shadow-md rounded-lg">
        <thead className="bg-[#9041c1] text-white">
          <tr>
            <th className="py-2 px-4 text-left">Property Name</th>
            <th className="py-2 px-4 text-left">Location</th>
            <th className="py-2 px-4 text-left">Description</th>
            <th className="py-2 px-4 text-left">Seller</th>
            <th className="py-2 px-4 text-left">Buyer</th>
            <th className="py-2 px-4 text-left">Listed For</th>
            <th className="py-2 px-4 text-left">Price</th>
            <th className="py-2 px-4 text-left">Transaction Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transact, index) => (
            <tr key={index}>
              <td className="py-2 px-4">{propertyNames[transact.property]}</td>
              <td className="py-2 px-4">{propertyLocations[transact.property]}</td>
              <td className="py-2 px-4">{propertyDescriptions[transact.property]}</td>
              <td className="py-2 px-4">{sellerNames[transact.prevowner]}</td>
              <td className="py-2 px-4">{buyerNames[transact.newowner]}</td>
              <td className="py-2 px-4">{transact.type}</td>
              <td className="py-2 px-4">{transact.amount}</td>
              <td className="py-2 px-4">{transact.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyProperties;