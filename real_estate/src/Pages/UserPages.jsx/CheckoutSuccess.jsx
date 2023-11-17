import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/authContext';

const CheckoutSuccess = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const propertyId = urlParams.get('propertyId');
    const contractId = urlParams.get('contractId'); // Extract contractId from URL parameters

    if (propertyId && contractId) {
      // Make a request to your newtransaction API here, passing propertyId, contractId, and user.id in the request body
      // Example using fetch:
      fetch('/api/transaction/newtransaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ propertyId: propertyId, contractId:contractId, userId: user.id }),
      })
        .then(response => response.json())
        .then(data => {
        })
        .catch(error => {
          console.error(error);
          // Handle error if needed
        })
        .finally(() => {
          setIsLoading(false); // Set loading to false once the request is complete
        });
    } else {
      setIsLoading(false); // Set loading to false if propertyId or contractId is not available
    }
  }, [user.id]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-6">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="max-w-lg mx-auto bg-green-100 p-8 rounded-md shadow-md">
        <h2 className="text-3xl font-semibold text-green-800 mb-4">
          Payment Successful
        </h2>
        <p className="text-gray-700 mb-4">
          Thank you for your payment! Your transaction was successful.
        </p>
        <p className="text-gray-700 mb-4">
          An email confirmation has been sent to your registered email address.
        </p>
        <p className="text-gray-700">
          If you have any questions or concerns, please contact our support team.
        </p>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
