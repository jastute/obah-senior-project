// import { NavLink, useParams } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom';
// import { useState, useEffect } from 'react';

// const equipmentList = [
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
// ]



// export default function EquipmentRent() {

//   const navigate = useNavigate();
//   const [userData, setUserData] = useState(null);
//   useEffect(() => {
//     const storedData = sessionStorage.getItem('user');
//     if (storedData) {
//       setUserData(JSON.parse(storedData));
//     }
//     else{
//       // redirect to login
//       alert('Please login to rent equipment')
//       navigate('/login')
//     }
//   }, []);


// const params=useParams()
// const {id}=params


//   const equipmentItem = equipmentList.find((item) => item.id === parseInt(id))

//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     phoneNumber: '',
//     address: '',
//     startDate: '',
//     rentalPeriod: '',
//     specialInstructions: '',
//     paymentMethod: '',
//     termsAgreed: false,
//   })

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target
//     setForm((prevForm) => ({
//       ...prevForm,
//       [name]: type === 'checkbox' ? checked : value,
//     }))
//   }

//   if (!equipmentItem) {
//     return <div>Item not found</div>
//   }

//   return (
//     <div className="container mx-auto py-8 px-4 md:px-6">
//       <h1 className="text-3xl font-bold mb-6">{equipmentItem.title}</h1>
//       <p className="text-gray-500 mb-4">{equipmentItem.description}</p>
//       <div className="flex justify-between items-center mb-6">
//         <span className="font-semibold">Ksh.{equipmentItem.price}/day</span>
//         <span className={`badge border px-2 rounded-lg font-bold`}>
//           {equipmentItem.availability}
//         </span>
//       </div>
      
  
//        <div>
//         <h3 className="text-lg font-semibold mb-2">Rent this equipment</h3>
//         <form>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">Start Date</label>
//             <input
//               type="date"
//               name="startDate"
//               value={form.startDate}
//               onChange={handleChange}
//               className="border rounded-md p-2 w-full"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">Rental Period (days)</label>
//             <input
//               type="number"
//               className="border rounded-md p-2 w-full"
//               placeholder="Number of days"
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
//                 checked={form.termsAgreed}
//                 onChange={handleChange}
//                 className="mr-2"
//                 required
//               />
//               I agree to the <NavLink to="terms&condition">terms and conditions</NavLink>
//             </label>
//           </div>
//           <button
//             type="submit"
//             className="bg-blue-500 text-white px-4 py-2 rounded-md"
//           >
//             Rent Now
//           </button>
//         </form>
//       </div>
//     </div>
//   )
// }

import { NavLink, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function EquipmentRent() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [equipmentItem, setEquipmentItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const storedData = sessionStorage.getItem('user');
    if (storedData) {
      setUserData(JSON.parse(storedData));
    } else {
      // redirect to login
      alert('Please login to rent equipment');
      navigate('/login');
    }
  }, [navigate]);

  const { id } = useParams();

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

  const [form, setForm] = useState({
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!equipmentItem) {
    return <div>Item not found</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
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
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              className="border rounded-md p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Rental Period (days)</label>
            <input
              type="number"
              name="rentalPeriod"
              value={form.rentalPeriod}
              onChange={handleChange}
              className="border rounded-md p-2 w-full"
              placeholder="Number of days"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Payment Methods</label>
            <ul className="list-disc pl-5">
              <li>M-Pesa (Send to 0721349587)</li>
              <li>Bank Transfer (Equity Account No: 987654321)</li>
              <li>Paybill (Business No: 123456, Account No: RENTAL)</li>
            </ul>
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="termsAgreed"
                checked={form.termsAgreed}
                onChange={handleChange}
                className="mr-2"
                required
              />
              I agree to the <NavLink to="terms&condition">terms and conditions</NavLink>
            </label>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Rent Now
          </button>
        </form>
      </div>
    </div>
  );
}
