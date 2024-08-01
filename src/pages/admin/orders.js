
import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { TiTick } from 'react-icons/ti';
import { RxCrossCircled } from 'react-icons/rx';
import { FaTrash, FaDownload } from 'react-icons/fa';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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

  // Delete booking
  const handleDeleteBooking = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        const response = await fetch(`https://medrent-server.vercel.app/api/bookings/${orderId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
          toast.success('Booking deleted successfully!', {
            duration: 3000,
            position: 'top-center',
          });
        } else {
          throw new Error('Failed to delete booking');
        }
      } catch (error) {
        console.error('Error deleting booking:', error);
        toast.error('Failed to delete booking!', {
          duration: 3000,
          position: 'top-center',
        });
      }
    }
  };

  // Generate and download PDF report
  const downloadPDFReport = () => {
    const doc = new jsPDF();
    
    // Add title to the document
    doc.setFontSize(18);
    doc.text('Bookings Report', 14, 22);
    
    // Define the columns for the table
    const columns = [
      { header: 'Customer', dataKey: 'customer' },
      { header: 'Equipment', dataKey: 'equipment' },
      { header: 'Renting Period', dataKey: 'rentingPeriod' },
      { header: 'Phone Number', dataKey: 'phoneNumber' },
      { header: 'Status', dataKey: 'status' },
      { header: 'Pick Up Date', dataKey: 'pickUpDate' },
    ];

    // Create the table
    doc.autoTable({
      columns: columns,
      body: filteredOrders,
      startY: 30,
      styles: { fontSize: 8 },
      columnStyles: { 0: { cellWidth: 30 } },
      headerStyles: { fillColor: [200, 200, 200], textColor: 20 },
    });

    // Save the PDF
    doc.save('bookings-report.pdf');

    toast.success('PDF report downloaded successfully!', {
      duration: 3000,
      position: 'top-center',
    });
  };

  if (loading) {
    return <div className='flex justify-center items-center min-h-30vh'>Loading...</div>;
  }

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl font-semibold mb-4 text-center">Bookings</h1>

      <div className="mb-4 flex justify-between items-center">
        <div>
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
        <button
          onClick={downloadPDFReport}
          className="px-4 py-2 bg-blue-500 text-white rounded flex items-center"
        >
          <FaDownload className="mr-2" /> Download Report
        </button>
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
                  <div className='flex justify-center items-center space-x-2'>
                    {order.status === 'pending' && (
                      <>
                        <button onClick={() => handleChangeStatus(order.id, 'accepted')} className="px-2 py-1 bg-green-500 text-white rounded">Accept</button>
                        <button onClick={() => handleChangeStatus(order.id, 'rejected')} className="px-2 py-1 bg-red-500 text-white rounded">Reject</button>
                      </>
                    )}
                    {order.status === 'accepted' && (
                      <button className="px-2 py-1 bg-green-100 cursor-not-allowed text-white rounded disabled">
                        <TiTick color='green' size={20} />
                      </button>
                    )}
                    {order.status === 'rejected' && (
                      <button className="px-2 py-1 bg-red-100 cursor-not-allowed text-white rounded disabled">
                        <RxCrossCircled size={20} color='red'/>
                      </button>
                    )}
                    <button onClick={() => handleDeleteBooking(order.id)} className="px-3 py-1 bg-red-500 text-white rounded">
                      <FaTrash size={16} />
                    </button>
                  </div>
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