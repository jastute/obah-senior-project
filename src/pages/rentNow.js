
// import { NavLink, useParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import toast, { Toaster } from 'react-hot-toast';

// export default function EquipmentRent() {
//   const navigate = useNavigate();
//   const [userData, setUserData] = useState(null);
//   const [equipmentItem, setEquipmentItem] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [renting, setRenting]=useState(false)
//   const [error, setError] = useState(null);
  
//   useEffect(() => {
//     const storedData = sessionStorage.getItem('user');
//     if (storedData) {
//       setUserData(JSON.parse(storedData));
//     } else {
//       // redirect to login
//       alert('Please login to rent equipment');
//       navigate('/login');
//     }
//   }, [navigate]);

//   const { id } = useParams();

//   useEffect(() => {
//     const fetchEquipmentItem = async () => {
//       try {
//         const response = await fetch(`https://medrent-server.vercel.app/api/inventory/${id}`);
//         const data = await response.json();
//         if (response.ok && data.message === 'success') {
//           setEquipmentItem(data.inventory);
//         } else {
//           setError('Failed to fetch equipment item');
//         }
//       } catch (error) {
//         setError('Error fetching equipment item');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEquipmentItem();
//   }, [id]);

//   const [formData, setForm] = useState({
//     startDate: '',
//     rentalPeriod: '',
//     paymentMethod: '',
//     // termsAgreed: false,
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm((prevForm) => ({
//       ...prevForm,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   if (loading) {
//     return <div className='flex justify-center items-center min-h-[60vh]'>Loading...</div>;
//   }

//   if (error) {
//     return <div className='flex justify-center items-center min-h-[60vh]'>{error}</div>;
//   }

//   if (!equipmentItem) {
//     return <div className='flex justify-center items-center min-h-[60vh]'>Item not found</div>;
//   }


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("hell");
//     try {
//       setRenting(true)
//       const response = await fetch('https://medrent-server.vercel.app/api/rent', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           userId: userData.userID,
//           equipmentId: equipmentItem._id,
//           startDate: formData.startDate,
//           rentalPeriod: formData.rentalPeriod,
//           paymentMethod: formData.paymentMethod,
//         }),
//       })

//       if (response.ok) {
//         toast.success('Equipment rented successfully',{
//           duration: 2000,
//           position: 'top-center',
//         });
//         navigate('/user/profile');
//         setForm({
//           startDate: '',
//           rentalPeriod: '',
//           paymentMethod: '',
//           termsAgreed: false,
//         });
//       }
//       else throw new Error('Failed to rent equipment');
//     } catch (error) {
//       console.error('Error:', error);
//       toast.error('Failed to rent equipment', {
//         duration: 2000,
//         position: 'top-center',
//       });
//     }finally{
//       setRenting(false)
//     }
//   };

//   return (
//     <div className="container mx-auto py-8 px-4 md:px-36">
//       <h1 className="text-3xl font-bold mb-6">{equipmentItem.title}</h1>
//       <p className="text-gray-500 mb-4">{equipmentItem.description}</p>
//       <div className="flex justify-between items-center mb-6">
//         <span className="font-semibold">Ksh.{equipmentItem.price}/day</span>
//         <span className={`badge border px-2 rounded-lg font-bold`}>
//           {equipmentItem.availability}
//         </span>
//       </div>
//       <div>
//         <h3 className="text-lg font-semibold mb-2">Rent this equipment</h3>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">Start Date</label>
//             <input
//               type="date"
//               name="startDate"
//               value={formData.startDate}
//               onChange={handleChange}
//               className="border rounded-md p-2 w-full"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">Rental Period (weeks)</label>
//             <input
//               type="number"
//               name="rentalPeriod"
//               value={formData.rentalPeriod}
//               onChange={handleChange}
//               className="border rounded-md p-2 w-full"
//               placeholder="Number of weeks"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">Payment Methods</label>
//             <ul className="list-disc pl-5">
//               <li>M-Pesa (Send to 0721349587)</li>
//               <li>Bank Transfer (Equity Account No: 987654321)</li>
//               <li>Paybill (Business No: 123456, Account No: RENTAL)</li>
//             </ul>
//           </div>
//           <div className="mb-4">
//             <label className="flex items-center">
//               <input
//                 type="checkbox"
//                 name="termsAgreed"
//                 checked={formData.termsAgreed}
//                 onChange={handleChange}
//                 className="mr-2"
//                 required
//               />
//               I agree to the &nbsp; <NavLink to="/terms&condtion" className={"underline"}>terms and conditions</NavLink>
//             </label>
//           </div>
//           {equipmentItem.availability==="out of stock" ? (
//             <div>
//               <button
//                     type="submit"
//                     disabled
//                     className="bg-blue-500 disabled:cursor-not-allowed disabled:bg-gray-400 text-white px-4 py-2 rounded-md"
//                   >
//                   Out of Stock
//               </button>
//             </div>
//             ):(
//             <div>
//               <button
//                 type="submit"
//                 disabled={renting}
//                 className="bg-blue-500 disabled:cursor-not-allowed disabled:bg-gray-400 text-white px-4 py-2 rounded-md"
//               >
//               {renting ? 'Renting...' : 'Rent Now'}
//               </button>
//             </div>
//             )}
//         </form>
//       </div>
//       <Toaster />
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

export default function EquipmentRent() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [equipmentItem, setEquipmentItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentNumber, setPaymentNumber] = useState('2547');
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkoutloading, setCheckoutloading] = useState(false);
  
  const { id } = useParams();

  useEffect(() => {
    const storedData = sessionStorage.getItem('user');
    if (storedData) {
      setUserData(JSON.parse(storedData));
    } else {
      alert('Please login to rent equipment');
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchEquipmentItem = async () => {
      try {
        const response = await fetch(`https://medrent-server.vercel.app/api/inventory/${id}`);
        const data = await response.json();
        if (response.ok && data.message === 'success') {
          setEquipmentItem(data.inventory);
        } else {
          setError('Failed to fetch equipment item');
        }
      } catch (error) {
        setError('Error fetching equipment item');
      } finally {
        setLoading(false);
      }
    };

    fetchEquipmentItem();
  }, [id]);

  const [formData, setForm] = useState({
    startDate: '',
    rentalPeriod: '',
    paymentMethod: '',
    termsAgreed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const calculateTotalPrice = () => {
    if (equipmentItem && formData.rentalPeriod) {
      const price = equipmentItem.price * formData.rentalPeriod * 7; // 7 days in a week
      setTotalPrice(price);
    }
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [formData.rentalPeriod, equipmentItem]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    calculateTotalPrice();
    setIsModalOpen(true);
  };

  const handlePayment = async () => {
    // if not a valid phone number and does not start with 254
    if (!/^254\d{9}$/.test(paymentNumber)) {
      alert('Please enter a valid phone number starting with 254');
      return;
    }
    
    try {
      setCheckoutloading(true);
      const response = await fetch('http://localhost:8000/api/initiate-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: paymentNumber,
          amount: totalPrice,
        }),
      });

      if (response.ok) {
        alert("Payment received, kindly check on your phone to complete payment");
        
        // Add rental to database and show success toast
        const rentalAdded = await addRentalToDatabase();
        setIsModalOpen(false);
        
        if (rentalAdded) {
          toast.success('Equipment rented successfully', {
            duration: 2000,
            position: 'top-center',
          });
          // Use setTimeout to ensure the toast is visible before navigation
          setTimeout(() => {
            navigate('/user/profile');
          }, 1000);
        }
      } else {
        throw new Error('Failed to initiate payment');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to process payment', {
        duration: 2000,
        position: 'top-center',
      });
    }  
  };


  const addRentalToDatabase = async () => {
    try {
      const response = await fetch('https://medrent-server.vercel.app/api/rent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userData.userID,
          equipmentId: equipmentItem._id,
          startDate: formData.startDate,
          rentalPeriod: formData.rentalPeriod,
          paymentMethod: formData.paymentMethod,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add rental to database');
      }
      return true;
    } catch (error) {
      console.error('Error adding rental to database:', error);
      toast.error('Failed to add rental to database', {
        duration: 2000,
        position: 'top-center',
      })
      return false; 
    }finally{
      setCheckoutloading(false);
    }
  };

  if (loading) {
    return <div className='flex justify-center items-center min-h-[60vh]'>Loading...</div>;
  }

  if (error) {
    return <div className='flex justify-center items-center min-h-[60vh]'>{error}</div>;
  }

  if (!equipmentItem) {
    return <div className='flex justify-center items-center min-h-[60vh]'>Item not found</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-36">
      <h1 className="text-3xl font-bold mb-6">{equipmentItem.title}</h1>
      <p className="text-gray-500 mb-4">{equipmentItem.description}</p>
      <div className="flex justify-between items-center mb-6">
        <span className="font-semibold">Ksh.{equipmentItem.price}/day</span>
        <span className={`badge border px-2 rounded-lg font-bold`}>
          {equipmentItem.availability}
        </span>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Rent this equipment</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Rental Period (weeks)</label>
            <input
              type="number"
              name="rentalPeriod"
              value={formData.rentalPeriod}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Number of weeks"
              required
            />
          </div>
          <div className="my-4">
            <span className="text-gray-900 "><b>Total Price:</b> Ksh.{totalPrice}</span>
          </div>
          {/* <div className="mb-4">
            <label className="block text-gray-700 mb-2">Payment Methods</label>
            <ul className="list-disc pl-5">
              <li>M-Pesa (Send to 0721349587)</li>
              <li>Bank Transfer (Equity Account No: 987654321)</li>
              <li>Paybill (Business No: 123456, Account No: RENTAL)</li>
            </ul>
          </div> */}
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="termsAgreed"
                checked={formData.termsAgreed}
                onChange={handleChange}
                className="mr-2"
                required
              />
              I agree to the &nbsp; <NavLink to="/terms&condtion" className="underline">terms and conditions</NavLink>
            </label>
          </div>
          {equipmentItem.availability === "out of stock" ? (
            <button disabled className="bg-gray-300 text-gray-500 px-4 py-2 rounded-md cursor-not-allowed">
              Out of Stock
            </button>
          ) : (
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Proceed to Checkout
            </button>
          )}
        </form>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Checkout</h2>
            <div className="mb-4">
              <p><strong>Equipment:</strong> {equipmentItem.title}</p>
              <p><strong>Equipment:</strong> {equipmentItem.price}/day</p>
              <p><strong>Start Date:</strong> {formData.startDate}</p>
              <p><strong>Rental Period:</strong> {formData.rentalPeriod} weeks</p>
              <p><strong>Total Price:</strong> Ksh.{totalPrice}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Payment Number</label>
              <input
                type="text"
                value={paymentNumber}
                onChange={(e) => setPaymentNumber(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="2547xxxxxxxx"
                // placeholder="Enter your payment number"
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handlePayment}
                disabled={checkoutloading}
                className="px-4 py-2 bg-blue-500 disabled:cursor-not-allowed text-white rounded-md hover:bg-blue-600"
              >
                {checkoutloading ? <p className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]"></p> : "Pay Now"}
              </button>
            </div>
          </div>
        </div>
      )}

      <Toaster />
    </div>
  );
}