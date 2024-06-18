
import { useState, useEffect, useMemo } from "react";
import {  NavLink } from "react-router-dom";
import EquipmentFilters from "../components/inventoryFilter";

export default function Equipments() {
  const [filters, setFilters] = useState({
    type: [],
    priceRange: [0, 1000],
    availability: [],
  });
 
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [equipmentList, setEquipmentList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await fetch("https://medrent-server.vercel.app/api/inventory");
        const data = await response.json();
        if (data.message === "success") {
          setEquipmentList(data.inventory);
        } else {
          console.error("Failed to fetch equipment");
        }
      } catch (error) {
        console.error("Error fetching equipment:", error);
      }finally{
        setLoading(false);
    };
    };

    fetchEquipment();
  }, []);

  const filteredEquipment = useMemo(() => {
    return equipmentList.filter((item) => {
      const typeMatch = filters.type.length === 0 || filters.type.includes(item.type);
      const priceMatch = item.price >= filters.priceRange[0] && item.price <= filters.priceRange[1];
      const availabilityMatch = filters.availability.length === 0 || filters.availability.includes(item.availability);
      return typeMatch && priceMatch && availabilityMatch;
    });
  }, [filters, equipmentList]);

  const handleFilterChange = (type, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [type]: value,
    }));
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 font-poppins">
      <h1 className="text-3xl font-bold mb-6">Medical Equipment Rental</h1>
       <EquipmentFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        isFiltersVisible={isFiltersVisible}
        setIsFiltersVisible={setIsFiltersVisible}
      />

    {loading ? (
        <div className="text-center min-h-[30vh] flex items-center justify-center">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 min-h-[30vh]">
          {filteredEquipment.length > 0 ? (
            filteredEquipment.map((item) => (
              <NavLink to={`/equipmemts/${item._id}`} key={item._id}>
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
            ))
          ) : (
            <div className="col-span-full text-center min-h-[30vh] flex items-center justify-center">No items found</div>
          )}
        </div>
      )}
    </div>
  )
}

