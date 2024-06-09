import { useState, useMemo } from "react"
import { Link, NavLink } from "react-router-dom"

const Slider = ({ min, max, step, defaultValue, onValueChange }) => {
  const [value, setValue] = useState(defaultValue)

  const handleChange = (e) => {
    const newValue = Number(e.target.value)
    setValue(newValue)
    onValueChange(newValue)
  }

  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={handleChange}
    />
  )
}

export default function Equipments() {
  const [filters, setFilters] = useState({
    type: [],
    priceRange: [0, 1000],
    availability: [],
  })

  const [isFiltersVisible, setIsFiltersVisible] = useState(false)

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

  const filteredEquipment = useMemo(() => {
    return equipmentList.filter((item) => {
      const typeMatch = filters.type.length === 0 || filters.type.includes(item.type)
      const priceMatch = item.price >= filters.priceRange[0] && item.price <= filters.priceRange[1]
      const availabilityMatch = filters.availability.length === 0 || filters.availability.includes(item.availability)
      return typeMatch && priceMatch && availabilityMatch
    })
  }, [filters])

  const handleFilterChange = (type, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [type]: value,
    }))
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">Medical Equipment Rental</h1>
      <div className="mb-6">
        <div className="">
          <div className="accordion-item  border-b" value="filters">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setIsFiltersVisible(!isFiltersVisible)}
            >
              <div className="text-lg font-semibold">Filters</div>
              <div className={`transition-transform ${isFiltersVisible ? "rotate-180" : ""} duration-700 ease-in-out`}>
                ▼
              </div>
            </div>
              <div className={`mt-4 ${isFiltersVisible ? "block" : "hidden"} duration-500 ease-in-out pb-5`}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Equipment Type</h3>
                    <div className="grid gap-2">
                      <label className="flex items-center gap-2 font-normal">
                        <input
                          type="checkbox"
                          checked={filters.type.includes("mobility")}
                          onChange={(e) =>
                            handleFilterChange(
                              "type",
                              e.target.checked ? [...filters.type, "mobility"] : filters.type.filter((t) => t !== "mobility"),
                            )
                          }
                        />
                        Mobility
                      </label>
                      <label className="flex items-center gap-2 font-normal">
                        <input
                          type="checkbox"
                          checked={filters.type.includes("patient care")}
                          onChange={(e) =>
                            handleFilterChange(
                              "type",
                              e.target.checked
                                ? [...filters.type, "patient care"]
                                : filters.type.filter((t) => t !== "patient care"),
                            )
                          }
                        />
                        Patient Care
                      </label>
                      <label className="flex items-center gap-2 font-normal">
                        <input
                          type="checkbox"
                          checked={filters.type.includes("respiratory")}
                          onChange={(e) =>
                            handleFilterChange(
                              "type",
                              e.target.checked
                                ? [...filters.type, "respiratory"]
                                : filters.type.filter((t) => t !== "respiratory"),
                            )
                          }
                        />
                        Respiratory
                      </label>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Price Range</h3>
                    <Slider
                      min={0}
                      max={1000}
                      step={5}
                      defaultValue={0}
                      onValueChange={(value) => handleFilterChange("priceRange", [0, value])}
                    />
                    <div className="flex justify-between text-sm text-gray-500 w-1/3">
                      <span>Ksh.{filters.priceRange[0]}</span>
                      <span>Ksh.{filters.priceRange[1]}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Availability</h3>
                    <div className="grid gap-2">
                      <label className="flex items-center gap-2 font-normal">
                        <input
                          type="checkbox"
                          checked={filters.availability.includes("in stock")}
                          onChange={(e) =>
                            handleFilterChange(
                              "availability",
                              e.target.checked
                                ? [...filters.availability, "in stock"]
                                : filters.availability.filter((a) => a !== "in stock"),
                            )
                          }
                        />
                        In Stock
                      </label>
                      <label className="flex items-center gap-2 font-normal">
                        <input
                          type="checkbox"
                          checked={filters.availability.includes("out of stock")}
                          onChange={(e) =>
                            handleFilterChange(
                              "availability",
                              e.target.checked
                                ? [...filters.availability, "out of stock"]
                                : filters.availability.filter((a) => a !== "out of stock"),
                            )
                          }
                        />
                        Out of Stock
                      </label>
                      <label className="flex items-center gap-2 font-normal">
                        <input
                          type="checkbox"
                          checked={filters.availability.includes("limited")}
                          onChange={(e) =>
                            handleFilterChange(
                              "availability",
                              e.target.checked
                                ? [...filters.availability, "limited"]
                                : filters.availability.filter((a) => a !== "limited"),
                            )
                          }
                        />
                        Limited Availability
                      </label>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredEquipment.map((item) => (
         <NavLink to={`/equipmemts/${item.id}`} key={item.id}>
             <div className="card border rounded-md p-4 shadow-md cursor-pointer">
            <div className="card-content">
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-500 mb-4">{item.description}</p>
              <div className="flex justify-between items-center">
                <span className="font-semibold">Ksh.{item.price}/day</span>
                <span className={`badge border px-2 rounded-lg font-bold`}>
                  {item.availability}
                </span>
              </div>
            </div>
          </div>
         </NavLink>
        ))}
      </div>
    </div>
  )
}
