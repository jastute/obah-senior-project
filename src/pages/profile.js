
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { TiTick } from 'react-icons/ti';
import { RxCrossCircled } from "react-icons/rx";
import { GrInProgress } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [user, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [bookings, setBooking] = useState([]);
  const [fetching, setFetching] = useState(true);
  const navigate=useNavigate()

  useEffect(() => {
    try {
      const userData = sessionStorage.getItem('user');
      if (userData) {
        setUserData(JSON.parse(userData));
      }else{
        navigate('/login')
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`https://medrent-server.vercel.app/api/bookings/${user?.userID}`);
        const data = await response.json();
        if (data.message === 'success') {
          setBooking(data.bookings.map(booking => {
            const rentalPeriodWeeks = parseFloat(booking.rentalPeriod);
            const rentalPeriodDays = rentalPeriodWeeks * 7;
            const pricePerDay = parseFloat(booking.inventory?.price);
            const totalPrice = pricePerDay * rentalPeriodDays;
            return {
              id: booking._id,
              customer: booking.user?.fullName,
              equipment: booking.inventory?.title,
              price: booking.inventory?.price,
              rentingPeriod: `${rentalPeriodWeeks} weeks`,
              phoneNumber: booking.user?.phone,
              status: booking.status,
              pickUpDate: new Date(booking.startDate).toLocaleDateString(),
              totalPrice
            };
          }));
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
    <div className="bg-white rounded-lg shadow-md p-6 min-h-[70vh] font-poppins">
      <div className="flex flex-col md:flex-row justify-around mb-4">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="mr-4">
            <img
              src="https://via.placeholder.com/64"
              alt="User Avatar"
              className="min-w-16 min-h-16 rounded-full"
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
        {bookings.length > 0 && <div className="  md:w-1/3 md:border-l-2 md:pl-12 mx-2 mt-7">
          <h3 className="text-lg font-semibold mb-2">Payment Guide</h3>
          <p className="text-gray-600 mb-2"><b>N/B:</b> Half of the payment should be done upon delivery of the equipment while the rest will be made within the period you have rented</p>
          <ul className="text-gray-600">
            <li><span className='font-semibold'>M-Pesa </span>(Send to 0721349587)</li>
            <li> <span className='font-semibold'>Bank Transfer </span> (Equity Account No: 987654321)</li>
            <li><span className='font-semibold'>Paybill </span> (Business No: 123456, Account No: MEDRENT)</li>
          </ul>
        </div>}
      </div>

      <div className=' mx-2 md:mx-32 lg:mx-40'>
        <h3 className="text-lg font-semibold mb-2">Bookings</h3>
        {bookings.length > 0 ? (
          <div className="flex flex-wrap gap-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden min-w-64 w-72">
                <div className="bg-[#111827] text-white p-4 flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    {/* <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg> */}
                    {booking.status === 'pending' ? <GrInProgress className="w-5 h-5 text-yellow-500" />: booking.status === 'accepted' ? <TiTick className="w-6 h-6 text-green-500" /> : <RxCrossCircled className="w-6 h-6 text-red-500" />}
                    <span>{booking.status}</span>
                  </span>
                  <span>{booking.equipment}</span>
                </div>
                <div className="p-4">
                  <div className="mb-2">
                    <span className="font-semibold">Rental Period:</span> {booking.rentingPeriod}
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold">Price per Day:</span> Ksh.{booking.price}
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold">Total Price:</span> Ksh.{booking.totalPrice.toFixed(2)}
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold">Pick-up Date:</span> {booking.pickUpDate}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : fetching ? (
          <div className="text-gray-600 min-h-[20vh] mt-4">loading...</div>
        ) : (
          <div>
            <div className="text-gray-600">No bookings found.</div>
            <div className="mt-4">
              <NavLink
                to="/equipments"
                className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Rent Equipment
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
