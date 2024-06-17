
import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import UserProfileCard from './userprofile';

function AdminNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const navRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // get the userdata from session storage
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const storedData = sessionStorage.getItem('user');
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);


  // Close the menu when the user scrolls the page
  useEffect(() => {
    const handleScroll = () => {
      setIsOpen(false);
      setIsCardVisible(false);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close the menu when the user clicks outside the Navbar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsCardVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navRef]);

  return (
    <nav ref={navRef} className="  bg-[#111827] text-gray-100 shadow border-b border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
      <div className='text-xl md:text-2xl font-bold'>
         Admin
      </div>

       <div className='flex  md:hidden gap-4'>
       <ul className='flex  gap-2'
                    onClick={()=>setIsCardVisible(!isCardVisible)}
                >
                <li>
                    <button
                      onClick={() => setIsOpen(false)}  className={`flex bg items-center gap-2 py-2 px-3 text-gray-50  rounded  } `}>
                        <FaUserCircle size={32} className='text-2xl text-[#48af6e] hover:text-[#54ca7f]' />
                        <span className='hidden md:block text-gray-300'>Profile</span>
                    </button>
                    </li>
              </ul>

              {isCardVisible && (
                // <UserProfileCard />
                // <div className='absolute top-14 right-0 h-40 w-40 bg-white-500 shadow-lg rounded-md bg-slate-50 z-10'>
                //     <h1 className='text-black'>Hello</h1>
                // </div>
                <div className='absolute right-0 top-12 shadow-lg flex md:hidden'>
                <UserProfileCard />
                </div>
              )}
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
          aria-controls="navbar-default"
          aria-expanded={isOpen ? 'true' : 'false'}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
        </div>
        <div className={`w-full md:flex items-center gap-40 md:w-auto ${isOpen ? 'block' : 'hidden'} `} id="navbar-default">
          <ul className="font-medium  flex flex-col p-4 md:p-0 mt-4 border bg-[#111827]  border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 text-gray-100 md:b-primary">
            <li>
            <NavLink to="/admin" onClick={() => setIsOpen(false)}  className={`block py-2 px-3 text-gray-100  rounded hover:bg-gray-800 md:hover:bg-transparent md:border-0 md:hover:text-secondary  md:p-0 `}>Dashboard</NavLink>
            </li>
            
            <li>
                <NavLink to="/admin/inventory" onClick={() => setIsOpen(false)}  className={`block py-2 px-3 text-gray-100  rounded hover:bg-gray-800 md:hover:bg-transparent md:border-0 md:hover:text-secondary  md:p-0  `}>Inventory</NavLink>
            </li>

            <li>
            <NavLink to="/admin/users" onClick={() => setIsOpen(false)}  className={`block py-2 px-3 text-gray-100  rounded hover:bg-gray-800 md:hover:bg-transparent md:border-0 md:hover:text-secondary  md:p-0  `}>Users</NavLink>
            </li>
            <li>
            </li>
          </ul>
          
          <ul className='flex  gap-2'
                    onClick={()=>setIsCardVisible(!isCardVisible)}
                >
                <li>
                    <button
                      onClick={() => setIsOpen(false)}  className={`flex bg items-center gap-2 py-2 px-3 text-gray-50  rounded  } `}>
                        <FaUserCircle size={32} className='text-2xl text-[#48af6e] hover:text-[#54ca7f]' />
                        <p className='font-semibold'>Admin</p>
                    </button>
                    </li>
              </ul>

              {isCardVisible && (
                <div className='hidden absolute md:block right-0  shadow-lg'>
                <UserProfileCard />
                </div>
              )}
        </div>

      </div>
    </nav>
  );
}

export default AdminNav;