import React from 'react';
import Orders from './orders';
import { MdInventory } from "react-icons/md";
import { TiTick } from 'react-icons/ti';
import { RxCrossCircled } from "react-icons/rx";
import { PiWarningDuotone } from "react-icons/pi";
import { NavLink } from 'react-router-dom';

function Dashboard() {
  return (
    <div className='min-h-screen p-2'>
        {/* overview */}
        <div className='flex flex-wrap justify-center md:mt-20'>
            {/* card */}
            <NavLink to={"/admin/inventory"} className='border rounded-md p-4 w-full sm:w-1/2 md:w-1/5  shadow-md  m-2 hover:border-blue-700 transition duration-1000 ease-in-out'>
                <p>Total Inventory</p>
                <span className='flex justify-between py-4'>
                    <p className='text-xl'>16</p>
                    <MdInventory size={30} />
                </span>
            </NavLink>
            <NavLink to={"/admin/inventory"}  className='border rounded-md p-4 w-full sm:w-1/2 md:w-1/5 shadow-md m-2 hover:border-green-700 transition duration-1000 ease-in-out'>
                <p>In Stock</p>
                <span className='flex justify-between py-4'>
                    <p className='text-xl'>16</p>
                    <p className=' bg-green-500 p-2 rounded-full'>
                        <TiTick color='white' size={12} />
                     </p>
                </span>
            </NavLink>
            <NavLink to={"/admin/inventory"}  className='border rounded-md p-4 w-full sm:w-1/2 md:w-1/5 shadow-md   m-2 hover:border-red-700 transition duration-1000 ease-in-out'>
                <p>Out of Stock</p>
                <span className='flex justify-between py-4'>
                    <p className='text-xl'>16</p>
                    <RxCrossCircled size={26} color='red'/>
                </span>
            </NavLink>
            <NavLink to={"/admin/inventory"} className='border rounded-md p-4 w-full sm:w-1/2 md:w-1/5  shadow-md m-2 hover:border-yellow-700 transition duration-1000 ease-in-out'>
                <p>Limited</p>
                <span className='flex justify-between py-4'>
                    <p className='text-xl'>16</p>
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
