import axios from "axios";
import { useContext } from "react";
import AuthContext from '../context/authContext'; // Update the path

const PayButton = () => {
  const { user } = useContext(AuthContext);
  const handleCheckout = () => {
    axios
      .post('/api/payment/newpayment/6553c64efe37c7fe80dea0be')
      .then((response) => {
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <button onClick={() => handleCheckout()}>Check out</button>
    </>
  );
};

export default PayButton;