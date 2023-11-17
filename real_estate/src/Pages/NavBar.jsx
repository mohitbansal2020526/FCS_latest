import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/authContext';

const NavBar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { user } = useContext(AuthContext);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <nav className="bg-white p-5 shadow md:flex md:items-center md:justify-between">
      <div>
        <span className="text-2xl font-bold text-[#9041c1] flex items-center">
          <Link to="/">
            <img className="h-10 inline mr-2 rounded-full" src="/Images/real_estate.webp" alt="Failed to load" />
          </Link>
          <div>
            <Link to="/" className='hover:text-[#ffdd62] duration-500'>REAL ESTATE</Link>
          </div>
        </span>
      </div>

      <ul className="md:flex md:items-center">
        {user && user.role === 'admin' && (
          <>
            <li className="mx-4">
              <Link to="/admin" className="text-xl text-[#9041c1] hover:text-[#ffdd62] duration-500">Admin Dashboard</Link>
            </li>
            <li className="mx-4">
              <Link to="/admin/report" className="text-xl text-[#9041c1] hover:text-[#ffdd62] duration-500">Moderate Listings</Link>
            </li>
            <li className="mx-4">
              <Link to="/admin/verify" className="text-xl text-[#9041c1] hover:text-[#ffdd62] duration-500">Verify Contracts</Link>
            </li>
          </>
        )}

        {user && user.role === 'user' && (
          <>
            <li className="mx-4">
              <Link to="/user/myproperty" className="text-xl text-[#9041c1] hover:text-[#ffdd62] duration-500">My Listed Properties</Link>
            </li>
            <li className="mx-4">
              <Link to="/user/transaction" className="text-xl text-[#9041c1] hover:text-[#ffdd62] duration-500">Transactions</Link>
            </li>
            <li className="mx-4">
              <Link to="/user/contracts" className="text-xl text-[#9041c1] hover:text-[#ffdd62] duration-500">Contracts</Link>
            </li>
            <li className="mx-4">
              <Link to="/user/help" className="text-xl text-[#9041c1] hover:text-[#ffdd62] duration-500">HELP</Link>
            </li>
          </>
        )}

        <div className={`relative ${isDropdownOpen ? 'z-10' : ''}`}>
          <button
            type="button"
            className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            onClick={toggleDropdown}
          >
            <img className="w-8 h-8 rounded-full" src="Images/User.jpg" alt="user photo" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 -mr-3 bg-white border border-gray-200 rounded-lg shadow dark:border-gray-600">
              <ul className="py-2">
                <li>
                  <Link to="/user/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/user/settings" className="block px-4 py-2 text-sm text-gray-700 hover.bg-gray-100 dark:hover.bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                    Settings
                  </Link>
                </li>
                <li>
                  <Link to="/user/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default NavBar;
