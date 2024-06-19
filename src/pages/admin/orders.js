// import React, { useState, useEffect } from 'react';
// import toast, {Toaster} from 'react-hot-toast'; 
// import { TiTick } from 'react-icons/ti';
// import { RxCrossCircled } from "react-icons/rx"; 

// const statusClasses = {
//   accepted: 'bg-green-100 text-green-800',
//   pending: 'bg-yellow-100 text-yellow-800',
//   rejected: 'bg-red-100 text-red-800',
// };

// const Orders = () => {
//   const [filter, setFilter] = useState('All');
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//    useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await fetch('https://medrent-server.vercel.app/api/bookings');
//         const data = await response.json();
//         if (data.message === 'success') {
//           const sortedOrders = data.bookings
//             .map(booking => ({
//               id: booking._id,
//               createdAt: booking.createdAt,
//               customer: booking.user?.fullName,
//               equipment: booking.inventory?.title,
//               rentingPeriod: `${booking.rentalPeriod} weeks`,
//               phoneNumber: booking.user?.phone,
//               status: booking.status,
//               pickUpDate: new Date(booking.startDate).toLocaleDateString(),
//             }))
//             .sort((a, b) => {
//               if (a.status === 'pending') return -1;
//               if (b.status === 'pending') return 1;
//               return 0;
//             });
//           setOrders(sortedOrders);
//         } else {
//           console.error('Failed to fetch orders');
//         }
//       } catch (error) {
//         console.error('Error fetching orders:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);
//   // console.log(orders);

//   const filteredOrders = filter === 'All' ? orders : orders.filter(order => order.status === filter);

  
// // change booking status
//   const handleChangeStatus = async (orderId, newStatus) => {
//     try {
//         const response = await fetch(`https://medrent-server.vercel.app/api/bookings/${orderId}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ status: newStatus }),
//         });

//         const data = await response.json();
//         if (response.ok) {
//           setOrders(prevOrders => prevOrders.map(order => {
//             if (order.id === orderId) {
//               return { ...order, status: newStatus };
//             }
//             return order;
//           }));
//           toast.success(`Booking status updated successfully!`,{
//             duration: 3000,
//             position: 'top-center', 
//           });
//         } else throw new Error(data.message || 'Failed to update booking status');
//     } catch (error) {
//         console.error('Error updating booking status:', error);
//         toast.error(`Failed to update booking status!`,{
//           duration: 3000,
//           position: 'top-center',
//         });
//     }
// };


//   if (loading) {
//     return <div className='flex justify-center items-center min-h-30vh'>Loading...</div>;
//   }

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
//           <option value="pending">Pending</option>
//           <option value="accepted">Accepted</option>
//           <option value="rejected">Rejected</option>
//         </select>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border">
//           <thead>
//             <tr className='bg-slate-200'>
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
//                 <td className="py-2 px-4 border-b ">
//                   {order.status === 'pending' && (
//                     <div className='flex justify-center items-center '>
//                       <button onClick={() => handleChangeStatus(order.id, 'accepted')} className="px-2 py-1 bg-green-500 text-white rounded mr-2">Accept</button>
//                       <button onClick={() => handleChangeStatus(order.id, 'rejected')} className="px-2 py-1 bg-red-500 text-white rounded">Reject</button>
//                     </div>
//                   )}
//                   {order.status === 'accepted' && (
//                     <div className='flex justify-center'>
//                       <button className="px-12 py-1 bg-green-100 cursor-not-allowed text-white rounded mr-2 disabled "> <TiTick color='green' size={20} /></button>
//                     </div>
//                   )}
//                   {order.status === 'rejected' && (
//                     <div className='flex justify-center'>
//                       <button className="px-12 py-1 bg-red-100 cursor-not-allowed text-white rounded mr-2 disabled"><RxCrossCircled size={20} color='red'/></button>
//                     </div>
//                   )}
                
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

// export default Orders;
import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { TiTick } from 'react-icons/ti';
import { RxCrossCircled } from 'react-icons/rx';

const statusClasses = {
  accepted: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  rejected: 'bg-red-100 text-red-800',
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
          const sortedOrders = data.bookings
            .map(booking => ({
              id: booking._id,
              createdAt: booking.createdAt,
              customer: booking.user?.fullName,
              equipment: booking.inventory?.title,
              rentingPeriod: `${booking.rentalPeriod} weeks`,
              phoneNumber: booking.user?.phone,
              status: booking.status,
              pickUpDate: new Date(booking.startDate).toLocaleDateString(),
            }))
            .sort((a, b) => {
              if (a.status === 'pending') return -1;
              if (b.status === 'pending') return 1;
              return 0;
            });
          setOrders(sortedOrders);
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

  // Change booking status
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
        setOrders(prevOrders => {
          const updatedOrders = prevOrders.map(order => {
            if (order.id === orderId) {
              return { ...order, status: newStatus };
            }
            return order;
          });

          // Sort the orders so that pending ones stay at the top
          return updatedOrders.sort((a, b) => {
            if (a.status === 'pending') return -1;
            if (b.status === 'pending') return 1;
            return 0;
          });
        });
        toast.success(`Booking status updated successfully!`, {
          duration: 3000,
          position: 'top-center',
        });
      } else throw new Error(data.message || 'Failed to update booking status');
    } catch (error) {
      console.error('Error updating booking status:', error);
      toast.error(`Failed to update booking status!`, {
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
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
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
                <td className="py-2 px-4 border-b ">
                  {order.status === 'pending' && (
                    <div className='flex justify-center items-center '>
                      <button onClick={() => handleChangeStatus(order.id, 'accepted')} className="px-2 py-1 bg-green-500 text-white rounded mr-2">Accept</button>
                      <button onClick={() => handleChangeStatus(order.id, 'rejected')} className="px-2 py-1 bg-red-500 text-white rounded">Reject</button>
                    </div>
                  )}
                  {order.status === 'accepted' && (
                    <div className='flex justify-center'>
                      <button className="px-12 py-1 bg-green-100 cursor-not-allowed text-white rounded mr-2 disabled "> <TiTick color='green' size={20} /></button>
                    </div>
                  )}
                  {order.status === 'rejected' && (
                    <div className='flex justify-center'>
                      <button className="px-12 py-1 bg-red-100 cursor-not-allowed text-white rounded mr-2 disabled"><RxCrossCircled size={20} color='red'/></button>
                    </div>
                  )}

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Toaster />
    </div>
  );
};

export default Orders;
