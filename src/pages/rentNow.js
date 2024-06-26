
import { NavLink, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function EquipmentRent() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [equipmentItem, setEquipmentItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [renting, setRenting]=useState(false)
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

  const [formData, setForm] = useState({
    startDate: '',
    rentalPeriod: '',
    paymentMethod: '',
    // termsAgreed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === 'checkbox' ? checked : value,
    }));
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

  // console.log(equipmentItem._id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hell");
    try {
      setRenting(true)
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
      })

      if (response.ok) {
        toast.success('Equipment rented successfully',{
          duration: 2000,
          position: 'top-center',
        });
        navigate('/user/profile');
        setForm({
          startDate: '',
          rentalPeriod: '',
          paymentMethod: '',
          termsAgreed: false,
        });
      }
      else throw new Error('Failed to rent equipment');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to rent equipment', {
        duration: 2000,
        position: 'top-center',
      });
    }finally{
      setRenting(false)
    }
  };

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
              className="border rounded-md p-2 w-full"
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
              className="border rounded-md p-2 w-full"
              placeholder="Number of weeks"
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
                checked={formData.termsAgreed}
                onChange={handleChange}
                className="mr-2"
                required
              />
              I agree to the &nbsp; <NavLink to="/terms&condtion" className={"underline"}>terms and conditions</NavLink>
            </label>
          </div>
          {equipmentItem.availability==="out of stock" ? (
            <div>
              <button
                    type="submit"
                    disabled
                    className="bg-blue-500 disabled:cursor-not-allowed disabled:bg-gray-400 text-white px-4 py-2 rounded-md"
                  >
                  Out of Stock
              </button>
            </div>
            ):(
            <div>
              <button
                type="submit"
                disabled={renting}
                className="bg-blue-500 disabled:cursor-not-allowed disabled:bg-gray-400 text-white px-4 py-2 rounded-md"
              >
              {renting ? 'Renting...' : 'Rent Now'}
              </button>
            </div>
            )}
        </form>
      </div>
      <Toaster />
    </div>
  );
}
