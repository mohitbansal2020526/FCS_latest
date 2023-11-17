import React from 'react'
import Home from './Home';
import DetailedView from './DetailedView';

import MyProperties from './MyProperties'
import TransactionPage from './TransactionPage';
import ContractsPage from './Contracts';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CheckoutFail from './checkoutFail';
import CheckoutSuccess from './CheckoutSuccess';
import Dashboard from '../DashBoard';
const UserPage = () => {
  return (
    <div >
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<DetailedView />} path="/details/:propertyId" />
            <Route element={<MyProperties />} path="/myproperty" />
            <Route element={<TransactionPage />} path="/transaction" />
            <Route element={<ContractsPage />} path="/contracts" />
            <Route element={<CheckoutSuccess />} path="/checkoutSuccess" />
            <Route element={<CheckoutFail />} path="/checkoutFail" />
          
          </Routes>
      </div>
  )
}

export default UserPage