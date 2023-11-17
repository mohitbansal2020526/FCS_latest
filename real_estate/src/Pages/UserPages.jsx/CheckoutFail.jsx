import React from 'react';

const CheckoutFail = () => {
  return (
    <div className="container mx-auto py-6">
      <div className="max-w-lg mx-auto bg-red-100 p-8 rounded-md shadow-md">
        <h2 className="text-3xl font-semibold text-red-800 mb-4">
          Payment Failed
        </h2>
        <p className="text-gray-700 mb-4">
          We're sorry, but there was an issue processing your payment.
        </p>
        <p className="text-gray-700 mb-4">
          Please check your payment details and try again. If the issue persists,
          contact our support team for assistance.
        </p>
      </div>
    </div>
  );
};

export default CheckoutFail;
