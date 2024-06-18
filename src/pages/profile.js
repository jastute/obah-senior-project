import React from 'react';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

const UserProfile = () => {


    const [user, setUserData] = useState({});
    const [loading, setLoading] = useState(false);
    // const [bookings, setBooking]=useState([])

  useEffect(() => {
    try {
      const userData = sessionStorage.getItem('user');
      if (userData) {
        setUserData(JSON.parse(userData));
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setLoading(false);
    }
  }, [loading]);
  console.log(user);



//   fetch your orders
const [bookings, setBooking] = useState([]);
const [fetching, setFetching] = useState(true);

useEffect(() => {
  const fetchOrders = async () => {
    try {
      const response = await fetch(`https://medrent-server.vercel.app/api/bookings/${user?.userID}`);
      const data = await response.json();
      if (data.message === 'success') {
        setBooking(data.bookings.map(booking => ({
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
        setFetching(false);
    }
  };

  fetchOrders();
}, [user?.userID]);

  

  if (loading) {
    return <div className='flex items-center justify-center min-h-[70vh]'>Loading...</div>;
  }


  return (
    <div className="bg-white rounded-lg shadow-md p-6 min-h-[70vh]">
      <div className="flex items-center mb-4 justify-center">
        <div className="mr-4">
          <img
            src="https://via.placeholder.com/64"
            alt="User Avatar"
            className="w-16 h-16 rounded-full"
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold">{user?.fullName}</h2>
          <p className="text-gray-600">{user?.email}</p>
          <p className="text-gray-600">{user?.organization}</p>
          <p className="text-gray-600">{user?.phone}</p>
          <p className="text-gray-600"><b>User ID:</b> {user?.userID}</p>
        </div>
      </div>

      <div className=' mx-4 md:mx-32'>
        <div>
        <h3 className="text-lg font-semibold mb-2">Bookings</h3>
        {bookings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-gray-100 rounded-lg p-4 shadow-sm"
              >
                <p className="text-gray-600"><b>Equipment:</b> {booking.equipment}</p>
                <p className="text-gray-600">
                  <b>Rental Period:</b> {booking.rentingPeriod}
                </p>
                <p className="text-gray-600"><b>Status:</b> {booking.status}</p>
                <p className="text-gray-600">
                  <b>Pick Up Date:</b> {booking.pickUpDate}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-600">No bookings found.</div>
        )}

        {bookings.length === 0 && (
          <div className="mt-4">
            <NavLink
              to="/equipmemts"
              className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Rent Equipment
            </NavLink>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;