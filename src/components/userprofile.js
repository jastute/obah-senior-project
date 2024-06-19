// UserProfileCard.js
import React from 'react';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";



const UserProfileCard = () => {

// get the userdata from session storage
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const storedData = sessionStorage.getItem('user');
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  console.log(userData);


 return (
  <div
  className="absolute z-30 right-0 mt-5 md:mt-8 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
>
  <div className="flex flex-col items-center space-y-4 p-6">
    <FaUserCircle size={32} className='text-2xl text-[#48af6e] hover:text-[#54ca7f]' />
    <div className="space-y-1 text-center">
      <h4 className="text-lg font-semibold text-slate-800">{userData?.fullName}</h4>
      <p className="text-sm text-gray-500">{userData?.email}</p>
      <p className="text-sm text-gray-500">{userData?.organisation}</p>
    </div>
    <div className="grid w-full gap-2">
      {userData?.role === 'admin' ? (
        <NavLink
          className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          to="/admin"
        >
          Admin Dashboard
        </NavLink>
      ):(
      <NavLink
        className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        to="/user/profile"
      >
        View Profile
      </NavLink>
      )}
      
      <button onClick={() => {
        if (window.confirm('Are you sure you want to logout?')) {
        sessionStorage.removeItem('user');
        window.location.reload();
        }
      }}
        className="inline-flex h-9 items-center justify-center rounded-md border border-gray-200 bg-red-600 px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-red-500  focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Logout
      </button>
    </div>
  </div>
  </div>
  );
};

export default UserProfileCard;
