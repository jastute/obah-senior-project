// import React, { useState } from 'react';
// import AddInventory from './AddInventory';

// const initialEquipmentList = [
//   {
//     id: 1,
//     title: "Wheelchair",
//     description: "Comfortable and durable wheelchair for mobility assistance.",
//     price: 150,
//     availability: "in stock",
//     type: "mobility",
//   },
//   {
//     id: 2,
//     title: "Hospital Bed",
//     description: "Adjustable hospital bed for patient care and recovery.",
//     price: 500,
//     availability: "out of stock",
//     type: "patient care",
//   },
//   {
//     id: 3,
//     title: "Oxygen Concentrator",
//     description: "Portable oxygen device for respiratory support.",
//     price: 350,
//     availability: "limited",
//     type: "respiratory",
//   },
//   {
//     id: 4,
//     title: "Walkers",
//     description: "Sturdy walkers for improved mobility and balance.",
//     price: 100,
//     availability: "in stock",
//     type: "mobility",
//   },
//   {
//     id: 5,
//     title: "Infusion Pump",
//     description: "Precision infusion pump for medication administration.",
//     price: 750,
//     availability: "out of stock",
//     type: "patient care",
//   },
//   {
//     id: 6,
//     title: "Nebulizer",
//     description: "Compact nebulizer for respiratory treatments.",
//     price: 200,
//     availability: "in stock",
//     type: "respiratory",
//   },
// ];

// const Inventory = () => {
//   const [equipmentList, setEquipmentList] = useState(initialEquipmentList);
//   const [isFormVisible, setIsFormVisible] = useState(false);
  

//   const handleAvailabilityChange = (id, newAvailability) => {
//     setEquipmentList(prevList =>
//       prevList.map(item =>
//         item.id === id ? { ...item, availability: newAvailability } : item
//       )
//     );
//   };

//   const handleDelete = id => {
//     setEquipmentList(prevList => prevList.filter(item => item.id !== id));
//   };

//   const handleVisibilityStatus=(state)=>{
//     setIsFormVisible(state)
//   }


//   return (
//     <div className="min-h-screen p-4">
//       <h1 className="text-2xl font-semibold mb-4">Available Inventories</h1>
//       {/* add new inventory button */}
//       <button
//         onClick={() => setIsFormVisible(true)}
//         className="px-4 py-2 bg-blue-500 hover:bg-blue-700 hover:ring-2 text-white rounded mb-4"
//       >
//         Add New Inventory
//       </button>
//       {isFormVisible && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-4 rounded shadow-md w-[90vw] sm:w-3/4 md:w-1/2 lg:w-1/3">
//             <h2 className="text-xl mb-4">Add New Inventory</h2>
//             <AddInventory Equipmemnts={initialEquipmentList} setVisibility={handleVisibilityStatus}/>
//           </div>
//         </div>
//       )}

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border">
//           <thead>
//             <tr className='bg-slate-200'>
//               <th className="py-2 px-4 border-b text-left">ID</th>
//               <th className="py-2 px-4 border-b text-left">Title</th>
//               <th className="py-2 px-4 border-b text-left">Description</th>
//               <th className="py-2 px-4 border-b text-left">Price(day)</th>
//               <th className="py-2 px-4 border-b text-left">Availability</th>
//               <th className="py-2 px-4 border-b text-left">Type</th>
//               <th className="py-2 px-4 border-b text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {equipmentList.map(item => (
//               <tr key={item.id}>
//                 <td className="py-2 px-4 border-b">{item.id}</td>
//                 <td className="py-2 px-4 border-b">{item.title}</td>
//                 <td className="py-2 px-4 border-b">{item.description}</td>
//                 <td className="py-2 px-4 border-b">ksh.{item.price}</td>
//                 <td className="py-2 px-4 border-b">
//                   <select
//                     value={item.availability}
//                     onChange={(e) => handleAvailabilityChange(item.id, e.target.value)}
//                     className="p-1 border rounded"
//                   >
//                     <option value="in stock">In Stock</option>
//                     <option value="out of stock">Out of Stock</option>
//                     <option value="limited">Limited</option>
//                   </select>
//                 </td>
//                 <td className="py-2 px-4 border-b">{item.type}</td>
//                 <td className="py-2 px-4 border-b">
//                   <button
//                     onClick={() => handleDelete(item.id)}
//                     className="px-2 py-1 bg-red-500 text-white rounded"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Inventory;


// import React, { useState, useEffect } from 'react';
// import AddInventory from './AddInventory';
// import toast, { Toaster } from 'react-hot-toast';

// const Inventory = () => {
//   const [equipmentList, setEquipmentList] = useState([]);
//   const [isFormVisible, setIsFormVisible] = useState(false);
//   const [loading, setLoading] = useState(true);

//   // Fetch inventories from the database
//   useEffect(() => {
//     const fetchEquipment = async () => {
//       try {
//         const response = await fetch("https://medrent-server.vercel.app/api/inventory");
//         const data = await response.json();
//         if (data.message === "success") {
//           setEquipmentList(data.inventory);
//         } else {
//           console.error("Failed to fetch equipment");
//         }
//       } catch (error) {
//         console.error("Error fetching equipment:", error);
//       }finally{
//         setLoading(false);
//     };
//     };

//     fetchEquipment();
//   }, []);

//   // Change inventory availability
//   const handleAvailabilityChange = async (id, newAvailability) => {
//     // console.log('Inventory availability changed:', id, newAvailability);
//     try {
//       const response = await fetch(`https://medrent-server.vercel.app/api/update/inventory/${id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ availability: newAvailability }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         // Update the UI or handle success as needed
//         setEquipmentList(prevList =>
//           prevList?.map(item =>
//             item._id === id ? { ...item, availability: newAvailability } : item
//           )
//         );
//         console.log('Inventory availability updated successfully:', data.inventory);
//       } else {
//         console.error('Failed to update inventory availability:', data.message);
//       }
//     } catch (error) {
//       console.error('Error updating inventory availability:', error);
//     }
//   };

//   // Delete an inventory
//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this inventory?')) {
//       return;
//     }
//     try {
//       const response = await fetch(`https://medrent-server.vercel.app/api/delete/inventory/${id}`, {
//         method: 'DELETE',
//       });

//       if (response.ok) {
//         // Update the UI or handle success as needed
//         setEquipmentList(prevList => prevList.filter(item => item._id !== id));
//         toast.success('Inventory deleted successfully',{
//           duration:2000,
//           position:'top-center'
//         });
//         console.log('Inventory deleted successfully');
//       } else throw new Error('Failed to delete inventory');
//     } catch (error) {
//       toast.error('Failed to delete inventory',{
//         duration:2000,
//         position:'top-center'
//       });
//       // console.error('Error deleting inventory:', error);
//     }
//   };

//   // change the visibility of the add new inventory form
//   const handleVisibilityStatus = (state) => {
//     setIsFormVisible(state);
//   };
//   // if loading
//   if (loading) {
//     return <div className='min-h-[70vh] flex justify-center items-center'>Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen p-4">
//       <h1 className="text-2xl font-semibold mb-4">Available Inventories</h1>
//       {/* add new inventory button */}
//       <button
//         onClick={() => setIsFormVisible(true)}
//         className="px-4 py-2 bg-blue-500 hover:bg-blue-700 hover:ring-2 text-white rounded mb-4"
//       >
//         Add New Inventory
//       </button>
//       {isFormVisible && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-4 rounded shadow-md w-[90vw] sm:w-3/4 md:w-1/2 lg:w-1/3">
//             <h2 className="text-xl mb-4">Add New Inventory</h2>
//             <AddInventory Equipmemnts={equipmentList} setVisibility={handleVisibilityStatus} />
//           </div>
//         </div>
//       )}

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border">
//           <thead>
//             <tr className='bg-slate-200'>
//               {/* <th className="py-2 px-4 border-b text-left">ID</th> */}
//               <th className="py-2 px-4 border-b text-left">Title</th>
//               <th className="py-2 px-4 border-b text-left">Description</th>
//               <th className="py-2 px-4 border-b text-left">Price(day)</th>
//               <th className="py-2 px-4 border-b text-left">Availability</th>
//               <th className="py-2 px-4 border-b text-left">Type</th>
//               <th className="py-2 px-4 border-b text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {equipmentList?.map(item => (
//               <tr key={item.id}>
//                 {/* <td className="py-2 px-4 border-b">{item.id}</td> */}
//                 <td className="py-2 px-4 border-b">{item.title}</td>
//                 <td className="py-2 px-4 border-b">{item.description}</td>
//                 <td className="py-2 px-4 border-b">ksh.{item.price}</td>
//                 <td className="py-2 px-4 border-b">
//                   <select
//                     value={item.availability}
//                     onChange={(e) => handleAvailabilityChange(item._id, e.target.value)}
//                     className="p-1 border rounded"
//                   >
//                     <option value="in stock">In Stock</option>
//                     <option value="out of stock">Out of Stock</option>
//                     <option value="limited">Limited</option>
//                   </select>
//                 </td>
//                 <td className="py-2 px-4 border-b">{item.type}</td>
//                 <td className="py-2 px-4 border-b">
//                   <button
//                     onClick={() => handleDelete(item._id)}
//                     className="px-2 py-1 bg-red-500 text-white rounded"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <Toaster/>
//     </div>
//   );
// };

// export default Inventory;



import React, { useState, useEffect } from 'react';
import AddInventory from './AddInventory';
import toast, { Toaster } from 'react-hot-toast';
import { FaDownload } from 'react-icons/fa';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Inventory = () => {
  const [equipmentList, setEquipmentList] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  // Fetch inventories from the database
  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await fetch("https://medrent-server.vercel.app/api/inventory");
        const data = await response.json();
        if (data.message === "success") {
          setEquipmentList(data.inventory);
        } else {
          console.error("Failed to fetch equipment");
        }
      } catch (error) {
        console.error("Error fetching equipment:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipment();
  }, []);

  // Change inventory availability
  const handleAvailabilityChange = async (id, newAvailability) => {
    try {
      const response = await fetch(`https://medrent-server.vercel.app/api/update/inventory/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ availability: newAvailability }),
      });

      const data = await response.json();
      if (response.ok) {
        setEquipmentList(prevList =>
          prevList?.map(item =>
            item._id === id ? { ...item, availability: newAvailability } : item
          )
        );
        console.log('Inventory availability updated successfully:', data.inventory);
      } else {
        console.error('Failed to update inventory availability:', data.message);
      }
    } catch (error) {
      console.error('Error updating inventory availability:', error);
    }
  };

  // Delete an inventory
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this inventory?')) {
      return;
    }
    try {
      const response = await fetch(`https://medrent-server.vercel.app/api/delete/inventory/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setEquipmentList(prevList => prevList.filter(item => item._id !== id));
        toast.success('Inventory deleted successfully', {
          duration: 2000,
          position: 'top-center'
        });
      } else throw new Error('Failed to delete inventory');
    } catch (error) {
      toast.error('Failed to delete inventory', {
        duration: 2000,
        position: 'top-center'
      });
    }
  };

  // change the visibility of the add new inventory form
  const handleVisibilityStatus = (state) => {
    setIsFormVisible(state);
  };

  // Filter equipment list
  const filteredEquipmentList = filter === 'all' 
    ? equipmentList 
    : equipmentList.filter(item => item.availability === filter);

  // Generate and download PDF report
  const downloadPDFReport = () => {
    const doc = new jsPDF();
    
    // Add title to the document
    doc.setFontSize(18);
    doc.text('Inventory Report', 14, 22);
    
    // Define the columns for the table
    const columns = [
      { header: 'Title', dataKey: 'title' },
      { header: 'Description', dataKey: 'description' },
      { header: 'Price (day)', dataKey: 'price' },
      { header: 'Availability', dataKey: 'availability' },
      { header: 'Type', dataKey: 'type' },
    ];

    // Create the table
    doc.autoTable({
      columns: columns,
      body: filteredEquipmentList,
      startY: 30,
      styles: { fontSize: 8 },
      columnStyles: { 0: { cellWidth: 30 } },
      headerStyles: { fillColor: [200, 200, 200], textColor: 20 },
    });

    // Save the PDF
    doc.save('inventory-report.pdf');

    toast.success('PDF report downloaded successfully!', {
      duration: 3000,
      position: 'top-center',
    });
  };

  // if loading
  if (loading) {
    return <div className='min-h-[70vh] flex justify-center items-center'>Loading...</div>;
  }

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl font-semibold mb-4">Available Inventories</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          {/* add new inventory button */}
          <button
            onClick={() => setIsFormVisible(true)}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-700 hover:ring-2 text-white rounded"
          >
            Add New Inventory
          </button>
          {/* filter dropdown */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="all">All</option>
            <option value="in stock">In Stock</option>
            <option value="out of stock">Out of Stock</option>
            <option value="limited">Limited</option>
          </select>
        </div>
        {/* download report button */}
        <button
          onClick={downloadPDFReport}
          className="px-4 py-2 bg-green-500 hover:bg-green-700 hover:ring-2 text-white rounded flex items-center"
        >
          <FaDownload className="mr-2" /> Download Report
        </button>
      </div>
      {isFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-md w-[90vw] sm:w-3/4 md:w-1/2 lg:w-1/3">
            <h2 className="text-xl mb-4">Add New Inventory</h2>
            <AddInventory Equipmemnts={equipmentList} setVisibility={handleVisibilityStatus} />
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className='bg-slate-200'>
              <th className="py-2 px-4 border-b text-left">Title</th>
              <th className="py-2 px-4 border-b text-left">Description</th>
              <th className="py-2 px-4 border-b text-left">Price(day)</th>
              <th className="py-2 px-4 border-b text-left">Availability</th>
              <th className="py-2 px-4 border-b text-left">Type</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEquipmentList?.map(item => (
              <tr key={item._id}>
                <td className="py-2 px-4 border-b">{item.title}</td>
                <td className="py-2 px-4 border-b">{item.description}</td>
                <td className="py-2 px-4 border-b">ksh.{item.price}</td>
                <td className="py-2 px-4 border-b">
                  <select
                    value={item.availability}
                    onChange={(e) => handleAvailabilityChange(item._id, e.target.value)}
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
                    onClick={() => handleDelete(item._id)}
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
      <Toaster/>
    </div>
  );
};

export default Inventory;