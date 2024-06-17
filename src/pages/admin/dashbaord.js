import React, { useState, useEffect } from 'react';
import Orders from './orders';
import { MdInventory } from "react-icons/md";
import { TiTick } from 'react-icons/ti';
import { RxCrossCircled } from "react-icons/rx";
import { PiWarningDuotone } from "react-icons/pi";
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
      try {
        const storedData = sessionStorage.getItem('user');
        if (storedData) {
            // if user has no admin role, redirect to home
            if (JSON.parse(storedData).role !== 'admin') {
                navigate('/');
            }
        } else {
          navigate('/login');
        }
    } catch (error) {
        navigate('/');
    }finally {
        setLoading(false);
    }
  }, [navigate, loading]);


  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch('https://medrent-server.vercel.app/api/inventory');
        const data = await response.json();
        if (response.ok) {
          setInventory(data.inventory);
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        console.error('Error fetching inventory:', error);
      }
    };

    fetchInventory();
  }, []);

  const totalInventory = inventory.length;
  const inStockCount = inventory.filter(item => item.availability === 'in stock').length;
  const outOfStockCount = inventory.filter(item => item.availability === 'out of stock').length;
  const limitedCount = inventory.filter(item => item.availability === 'limited').length;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='min-h-screen p-2'>
        {/* overview */}
        <div className='flex flex-wrap justify-center md:mt-20'>
            {/* card */}
            <NavLink to={"/admin/inventory"} className='border rounded-md p-4 w-full sm:w-1/2 md:w-1/5  shadow-md  m-2 hover:border-blue-700 transition duration-1000 ease-in-out'>
                <p>Total Inventory</p>
                <span className='flex justify-between py-4'>
                    <p className='text-xl'>{totalInventory}</p>
                    <MdInventory size={30} />
                </span>
            </NavLink>
            <NavLink to={"/admin/inventory"}  className='border rounded-md p-4 w-full sm:w-1/2 md:w-1/5 shadow-md m-2 hover:border-green-700 transition duration-1000 ease-in-out'>
                <p>In Stock</p>
                <span className='flex justify-between py-4'>
                    <p className='text-xl'>{inStockCount}</p>
                    <p className=' bg-green-500 p-2 rounded-full'>
                        <TiTick color='white' size={12} />
                     </p>
                </span>
            </NavLink>
            <NavLink to={"/admin/inventory"}  className='border rounded-md p-4 w-full sm:w-1/2 md:w-1/5 shadow-md   m-2 hover:border-red-700 transition duration-1000 ease-in-out'>
                <p>Out of Stock</p>
                <span className='flex justify-between py-4'>
                    <p className='text-xl'>{outOfStockCount}</p>
                    <RxCrossCircled size={26} color='red'/>
                </span>
            </NavLink>
            <NavLink to={"/admin/inventory"} className='border rounded-md p-4 w-full sm:w-1/2 md:w-1/5  shadow-md m-2 hover:border-yellow-700 transition duration-1000 ease-in-out'>
                <p>Limited</p>
                <span className='flex justify-between py-4'>
                    <p className='text-xl'>{limitedCount}</p>
                    <PiWarningDuotone color='orange' size={30} />
                </span>
            </NavLink>
        </div>
        <div className='mt-24'>
            <Orders />
        </div>
    </div>
  );
}

export default Dashboard;
