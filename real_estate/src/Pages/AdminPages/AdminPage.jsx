import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminHome from './AdminHome';
import AdminVerification from './AdminVerification';
import ReportPage from './ReportPage';
import NavBar from '../NavBar';

const AdminPage = () => {
  return (
    <div >
          <Routes>
            <Route element={<AdminHome />} path="/" />
            <Route element={<AdminVerification />} path="/verify" />
            <Route element={<ReportPage />} path="/report" />
          </Routes>
      </div>
  );
};

export default AdminPage;