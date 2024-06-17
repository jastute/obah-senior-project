import React, { useState } from 'react';
import AddInventory from './AddInventory';

const initialEquipmentList = [
  {
    id: 1,
    title: "Wheelchair",
    description: "Comfortable and durable wheelchair for mobility assistance.",
    price: 150,
    availability: "in stock",
    type: "mobility",
  },
  {
    id: 2,
    title: "Hospital Bed",
    description: "Adjustable hospital bed for patient care and recovery.",
    price: 500,
    availability: "out of stock",
    type: "patient care",
  },
  {
    id: 3,
    title: "Oxygen Concentrator",
    description: "Portable oxygen device for respiratory support.",
    price: 350,
    availability: "limited",
    type: "respiratory",
  },
  {
    id: 4,
    title: "Walkers",
    description: "Sturdy walkers for improved mobility and balance.",
    price: 100,
    availability: "in stock",
    type: "mobility",
  },
  {
    id: 5,
    title: "Infusion Pump",
    description: "Precision infusion pump for medication administration.",
    price: 750,
    availability: "out of stock",
    type: "patient care",
  },
  {
    id: 6,
    title: "Nebulizer",
    description: "Compact nebulizer for respiratory treatments.",
    price: 200,
    availability: "in stock",
    type: "respiratory",
  },
];

const Inventory = () => {
  const [equipmentList, setEquipmentList] = useState(initialEquipmentList);
  const [isFormVisible, setIsFormVisible] = useState(false);
  

  const handleAvailabilityChange = (id, newAvailability) => {
    setEquipmentList(prevList =>
      prevList.map(item =>
        item.id === id ? { ...item, availability: newAvailability } : item
      )
    );
  };

  const handleDelete = id => {
    setEquipmentList(prevList => prevList.filter(item => item.id !== id));
  };

  const handleVisibilityStatus=(state)=>{
    setIsFormVisible(state)
  }


  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl font-semibold mb-4">Available Inventories</h1>
      {/* add new inventory button */}
      <button
        onClick={() => setIsFormVisible(true)}
        className="px-4 py-2 bg-blue-500 hover:bg-blue-700 hover:ring-2 text-white rounded mb-4"
      >
        Add New Inventory
      </button>
      {isFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-md w-[90vw] sm:w-3/4 md:w-1/2 lg:w-1/3">
            <h2 className="text-xl mb-4">Add New Inventory</h2>
            <AddInventory Equipmemnts={initialEquipmentList} setVisibility={handleVisibilityStatus}/>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className='bg-slate-200'>
              <th className="py-2 px-4 border-b text-left">ID</th>
              <th className="py-2 px-4 border-b text-left">Title</th>
              <th className="py-2 px-4 border-b text-left">Description</th>
              <th className="py-2 px-4 border-b text-left">Price(day)</th>
              <th className="py-2 px-4 border-b text-left">Availability</th>
              <th className="py-2 px-4 border-b text-left">Type</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {equipmentList.map(item => (
              <tr key={item.id}>
                <td className="py-2 px-4 border-b">{item.id}</td>
                <td className="py-2 px-4 border-b">{item.title}</td>
                <td className="py-2 px-4 border-b">{item.description}</td>
                <td className="py-2 px-4 border-b">ksh.{item.price}</td>
                <td className="py-2 px-4 border-b">
                  <select
                    value={item.availability}
                    onChange={(e) => handleAvailabilityChange(item.id, e.target.value)}
                    className="p-1 border rounded"
                  >
                    <option value="in stock">In Stock</option>
                    <option value="out of stock">Out of Stock</option>
                    <option value="limited">Limited</option>
                  </select>
                </td>
                <td className="py-2 px-4 border-b">{item.type}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;
