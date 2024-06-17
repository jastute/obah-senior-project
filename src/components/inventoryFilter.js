import React from 'react';
import { useState } from 'react';

const EquipmentFilters = ({ filters, onFilterChange, isFiltersVisible, setIsFiltersVisible }) => {
  const handleFilterChange = (type, value) => {
    onFilterChange(type, value);
  };

  return (
    <div className="mb-6">
      <div className="">
        <div className="accordion-item border-b" value="filters">
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
  );
};

const Slider = ({ min, max, step, defaultValue, onValueChange }) => {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (e) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    onValueChange(newValue);
  };

  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={handleChange}
    />
  );
};

export default EquipmentFilters;
