import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import UserProfileCard from './userprofile';
import { FaUserCircle } from "react-icons/fa";

function Navbar() {
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
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navRef]);

  return (
    <nav ref={navRef} className="  bg-[#111827] text-gray-100 shadow border-b border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <div className='text-xl md:text-2xl font-bold'>
         MedRent
      </div>


       <div className='flex gap-4'>
      {/* for small screen */}
            {    
              userData ? (
                <div>
                <ul className='flex md:hidden  gap-2'
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
                <UserProfileCard/>
              )}
              </div>
              ):(<ul className='flex md:hidden gap-1'>
                          <li>
                              <NavLink to="/login" onClick={() => setIsOpen(false)}  className={`hidden md:block py-2 px-3 text-gray-50  rounded bg-[#48af6e] hover:bg-[#54ca7f]  md:hover:bg-transparent md:border-0 md:hover:text-secondary  md:p-0 `}>Login</NavLink>
                              </li>
                              <li>
                              <NavLink to="/register" onClick={() => setIsOpen(false)}  className={`block py-2 px-3 text-gray-50  border hover:bg-gray-700 duration-500 ease-in-out cursor-pointer  rounded-xl`}>Register</NavLink>
                          </li> 
                        </ul>)
                  }
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
            <NavLink to="/" onClick={() => setIsOpen(false)}  className={`block py-2 px-3 text-gray-100  rounded hover:bg-gray-800 md:hover:bg-transparent md:border-0 md:hover:text-secondary  md:p-0 `}>Home</NavLink>
            </li>
            
            <li>
                <NavLink to="/services" onClick={() => setIsOpen(false)}  className={`block py-2 px-3 text-gray-100  rounded hover:bg-gray-800 md:hover:bg-transparent md:border-0 md:hover:text-secondary  md:p-0  `}>Services</NavLink>
            </li>

            <li>
            <NavLink to="/aboutus" onClick={() => setIsOpen(false)}  className={`block py-2 px-3 text-gray-100  rounded hover:bg-gray-800 md:hover:bg-transparent md:border-0 md:hover:text-secondary  md:p-0  `}>Contacts</NavLink>
            </li>
            <li>
            <NavLink to="/aboutus" onClick={() => setIsOpen(false)}  className={`block py-2 px-3 text-gray-100  rounded hover:bg-gray-800 md:hover:bg-transparent md:border-0 md:hover:text-secondary  md:p-0  `}>About Us</NavLink>
            </li>
            <li>
            </li>
          </ul>
          
          {    
      userData ? (
        <div>
        <ul className='hidden md:flex  gap-2'
            onClick={()=>setIsCardVisible(!isCardVisible)}
        >
        <li>
            <button
               onClick={() => setIsOpen(false)}  className={`flex bg items-center gap-2 py-2 px-3 text-gray-50  rounded  } `}>
                <FaUserCircle size={32} className='text-2xl text-[#48af6e] hover:text-[#54ca7f]' />
                <span className='hidden md:block text-gray-300'>{userData?.fullName.split(' ')[0]}</span>
            </button>
            </li>
      </ul>

      {isCardVisible && (
        <UserProfileCard/>
      )}
      </div>
      ):(<ul className='hidden md:flex gap-2'>
      <li>
          <NavLink to="/login" onClick={() => setIsOpen(false)}  className={`block py-2 px-5 text-gray-50   border hover:bg-gray-700 duration-500 ease-in-out cursor-pointer  rounded-xl  `}>Login</NavLink>
          </li>
          <li>
          <NavLink to="/register" onClick={() => setIsOpen(false)}  className={`block py-2 px-3 text-gray-50  border hover:bg-gray-700 duration-500 ease-in-out cursor-pointer  rounded-xl`}>Register</NavLink>
      </li> 
  </ul>)
          }
        </div>

      </div>
    </nav>
  );
}

export default Navbar;