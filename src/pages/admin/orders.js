// import React, { useState } from 'react';

// const orders = [
//   { id: 'ORD001', customer: 'John Doe', equipment: 'Wheelchair', rentingPeriod: '1 week', phoneNumber: '123-456-7890', status: 'Accepted', pickUpDate: '2024-06-15', total: '$15' },
//   { id: 'ORD002', customer: 'Jane Smith', equipment: 'Hospital Bed', rentingPeriod: '2 weeks', phoneNumber: '234-567-8901', status: 'Pending', pickUpDate: '2024-06-16', total: '$50' },
//   { id: 'ORD003', customer: 'Bob Johnson', equipment: 'Oxygen Concentrator', rentingPeriod: '3 days', phoneNumber: '345-678-9012', status: 'Rejected', pickUpDate: '2024-06-17', total: '$35' },
//   { id: 'ORD004', customer: 'Alice Brown', equipment: 'Crutches', rentingPeriod: '1 month', phoneNumber: '456-789-0123', status: 'Accepted', pickUpDate: '2024-06-18', total: '$20' },
//   { id: 'ORD005', customer: 'Charlie Davis', equipment: 'Portable Oxygen', rentingPeriod: '1 week', phoneNumber: '567-890-1234', status: 'Pending', pickUpDate: '2024-06-19', total: '$40' },
//   { id: 'ORD006', customer: 'Eve Wilson', equipment: 'Electric Wheelchair', rentingPeriod: '2 days', phoneNumber: '678-901-2345', status: 'Accepted', pickUpDate: '2024-06-20', total: '$60' },
//   { id: 'ORD007', customer: 'Frank Miller', equipment: 'Walker', rentingPeriod: '1 week', phoneNumber: '789-012-3456', status: 'Pending', pickUpDate: '2024-06-21', total: '$25' },
//   { id: 'ORD008', customer: 'Grace Lee', equipment: 'Nebulizer', rentingPeriod: '5 days', phoneNumber: '890-123-4567', status: 'Rejected', pickUpDate: '2024-06-22', total: '$30' },
//   { id: 'ORD009', customer: 'Henry Clark', equipment: 'Patient Lift', rentingPeriod: '3 weeks', phoneNumber: '901-234-5678', status: 'Accepted', pickUpDate: '2024-06-23', total: '$70' },
//   { id: 'ORD010', customer: 'Isabel Young', equipment: 'Scooter', rentingPeriod: '10 days', phoneNumber: '012-345-6789', status: 'Pending', pickUpDate: '2024-06-24', total: '$55' },
//   { id: 'ORD011', customer: 'Jack King', equipment: 'Hospital Bed', rentingPeriod: '2 weeks', phoneNumber: '123-456-7890', status: 'Accepted', pickUpDate: '2024-06-25', total: '$50' },
// ];

// const statusClasses = {
//   Accepted: 'bg-green-100 text-green-800',
//   Pending: 'bg-yellow-100 text-yellow-800',
//   Rejected: 'bg-red-100 text-red-800',
// };

// const Orders = () => {
//   const [filter, setFilter] = useState('All');

//   const filteredOrders = filter === 'All' ? orders : orders.filter(order => order.status === filter);

//   return (
//     <div className="min-h-screen p-4">
//       <h1 className="text-2xl font-semibold mb-4 text-center">Bookings</h1>

//       <div className="mb-4">
//         <label htmlFor="statusFilter" className="mr-2">Filter by Status:</label>
//         <select
//           id="statusFilter"
//           className="p-2 border rounded"
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//         >
//           <option value="All">All</option>
//           <option value="Pending">Pending</option>
//           <option value="Accepted">Accepted</option>
//           <option value="Rejected">Rejected</option>
//           {/* <option value="Attended">Attended</option> */}
//           {/* Add more status options as needed */}
//         </select>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border">
//           <thead>
//           <tr className='bg-slate-200'>
//               <th className="py-2 px-4 border-b text-left">Order&nbsp;ID</th>
//               <th className="py-2 px-4 border-b text-left">Customer</th>
//               <th className="py-2 px-4 border-b text-left">Equipment</th>
//               <th className="py-2 px-4 border-b text-left">Renting Period</th>
//               <th className="py-2 px-4 border-b text-left">Phone Number</th>
//               <th className="py-2 px-4 border-b text-left">Status</th>
//               <th className="py-2 px-4 border-b text-left">Pick Up Date</th>
//               <th className="py-2 px-4 border-b text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredOrders.map(order => (
//               <tr key={order.id}>
//                 <td className="py-2 px-4 border-b">{order.id}</td>
//                 <td className="py-2 px-4 border-b">{order.customer}</td>
//                 <td className="py-2 px-4 border-b">{order.equipment}</td>
//                 <td className="py-2 px-4 border-b">{order.rentingPeriod}</td>
//                 <td className="py-2 px-4 border-b">{order.phoneNumber}</td>
//                 <td className="py-2 px-4 border-b">
//                   <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusClasses[order.status]}`}>
//                     {order.status}
//                   </span>
//                 </td>
//                 <td className="py-2 px-4 border-b">{order.pickUpDate}</td>
//                 <td className="py-2 px-4 border-b">
//                   {order.status === 'Pending' && (
//                     <>
//                       <button className="px-2 py-1 bg-blue-500 text-white rounded mr-2">Accept</button>
//                       <button className="px-2 py-1 bg-red-500 text-white rounded">Reject</button>
//                     </>
//                   )}
//                   {order.status === 'Accepted' && (
//                     <>
//                       <button className="px-2 py-1 bg-gray-300 cursor-not-allowed text-white rounded mr-2 disabled">Accepted</button>
//                     </>
//                   )}
//                   {order.status === 'Rejected' && (
//                     <>
//                       <button className="px-2 py-1 bg-gray-300 cursor-not-allowed text-white rounded mr-2 disabled">Rejected</button>
//                     </>
//                   )}
                
//                   {/* Add more actions based on status if needed */}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Orders;



import React, { useState, useEffect } from 'react';
import toast, {Toaster} from 'react-hot-toast';  

const statusClasses = {
  Accepted: 'bg-green-100 text-green-800',
  Pending: 'bg-yellow-100 text-yellow-800',
  Rejected: 'bg-red-100 text-red-800',
};

const Orders = () => {
  const [filter, setFilter] = useState('All');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('https://medrent-server.vercel.app/api/bookings');
        const data = await response.json();
        if (data.message === 'success') {
          setOrders(data.bookings.map(booking => ({
            id: booking._id,
            customer: booking.user?.fullName, 
            equipment: booking.inventory?.title, 
            rentingPeriod: `${booking.rentalPeriod} weeks`, 
            phoneNumber: booking.user?.phone, 
            status: booking.status,
            pickUpDate: new Date(booking.startDate).toLocaleDateString(),
            
          })));
        } else {
          console.error('Failed to fetch orders');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);
  // console.log(orders);

  const filteredOrders = filter === 'All' ? orders : orders.filter(order => order.status === filter);

  
// change booking status
  const handleChangeStatus = async (orderId, newStatus) => {
    try {
        const response = await fetch(`https://medrent-server.vercel.app/api/bookings/${orderId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: newStatus }),
        });

        const data = await response.json();
        if (response.ok) {
          setOrders(prevOrders => prevOrders.map(order => {
            if (order.id === orderId) {
              return { ...order, status: newStatus };
            }
            return order;
          }));
          toast.success(`Booking status updated successfully!`,{
            duration: 3000,
            position: 'top-center', 
          });
        } else throw new Error(data.message || 'Failed to update booking status');
    } catch (error) {
        console.error('Error updating booking status:', error);
        toast.error(`Failed to update booking status!`,{
          duration: 3000,
          position: 'top-center',
        });
    }
};


  if (loading) {
    return <div className='flex justify-center items-center min-h-30vh'>Loading...</div>;
  }

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl font-semibold mb-4 text-center">Bookings</h1>

      <div className="mb-4">
        <label htmlFor="statusFilter" className="mr-2">Filter by Status:</label>
        <select
          id="statusFilter"
          className="p-2 border rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className='bg-slate-200'>
              <th className="py-2 px-4 border-b text-left">Customer</th>
              <th className="py-2 px-4 border-b text-left">Equipment</th>
              <th className="py-2 px-4 border-b text-left">Renting Period</th>
              <th className="py-2 px-4 border-b text-left">Phone Number</th>
              <th className="py-2 px-4 border-b text-left">Status</th>
              <th className="py-2 px-4 border-b text-left">Pick Up Date</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr key={order.id}>
                <td className="py-2 px-4 border-b">{order.customer}</td>
                <td className="py-2 px-4 border-b">{order.equipment}</td>
                <td className="py-2 px-4 border-b">{order.rentingPeriod}</td>
                <td className="py-2 px-4 border-b">{order.phoneNumber}</td>
                <td className="py-2 px-4 border-b">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusClasses[order.status]}`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-2 px-4 border-b">{order.pickUpDate}</td>
                <td className="py-2 px-4 border-b flex">
                  {order.status === 'pending' && (
                    <>
                      <button onClick={() => handleChangeStatus(order.id, 'accepted')} className="px-2 py-1 bg-green-500 text-white rounded mr-2">Accept</button>
                      <button onClick={() => handleChangeStatus(order.id, 'rejected')} className="px-2 py-1 bg-red-500 text-white rounded">Reject</button>
                    </>
                  )}
                  {order.status === 'accepted' && (
                    <>
                      <button className="px-2 py-1 bg-gray-300 cursor-not-allowed text-white rounded mr-2 disabled">Accepted</button>
                    </>
                  )}
                  {order.status === 'rejected' && (
                    <>
                      <button className="px-2 py-1 bg-gray-300 cursor-not-allowed text-white rounded mr-2 disabled">Rejected</button>
                    </>
                  )}
                
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

export default Orders;
