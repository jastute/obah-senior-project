import { useParams } from 'react-router-dom'

const equipmentList = [
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
]

export default function EquipmentRent() {

const params=useParams()
const {id}=params

  const equipmentItem = equipmentList.find((item) => item.id === parseInt(id))

  if (!equipmentItem) {
    return <div>Item not found</div>
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
            <label className="block text-gray-700 mb-2">Name/Organisation Name</label>
            <input
              type="text"
              className="border rounded-md p-2 w-full"
              placeholder="Your name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="border rounded-md p-2 w-full"
              placeholder="Your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Rental Period (days)</label>
            <input
              type="number"
              className="border rounded-md p-2 w-full"
              placeholder="Number of days"
            />
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
  )
}
