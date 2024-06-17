import React, { useState } from 'react';
import toast,{Toaster} from 'react-hot-toast';

function AddInventory({ Equipmemnts, setVisibility }) {
  const [isLoading, setIsLoading] = useState(false);
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    price: '',
    availability: 'in stock',
    itemtype: 'mobility',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleAddNewItem = async (e) => {
    e.preventDefault();
    console.log("wharshappening", newItem);

    try {
      setIsLoading(true);
      const response = await fetch("https://medrent-server.vercel.app/api/addInventory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });
      if (response.ok) {
        toast.success("Item added successfully", {
          duration: 2000,
          position: 'top-center',
        });
        setNewItem({
          title: '',
          description: '',
          price: '',
          availability: 'in stock',
          itemtype: 'mobility',
        });
        window.location.reload();
        // setVisibility(false);
      } else throw new Error("Failed to add item");
    } catch (error) {
      toast.error(error.message, {
        duration: 2000,
        position: 'top-center',
      });
    } finally {
      setIsLoading(false);
    }
    // setEquipmentList(prevList => [
    //   ...prevList,
    //   { ...newItem, id: prevList.length + 1 }
    // ]);
  };

  return (
    <form onSubmit={handleAddNewItem}>
      <div className="mb-2">
        <label className="block text-sm font-semibold">Title</label>
        <input
          type="text"
          name="title"
          value={newItem.title}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-semibold">Description</label>
        <input
          type="text"
          name="description"
          value={newItem.description}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-semibold">Price per Day</label>
        <input
          type="number"
          name="price"
          value={newItem.price}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-semibold">Availability</label>
        <select
          name="availability"
          value={newItem.availability}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        >
          <option value="in stock">In Stock</option>
          <option value="out of stock">Out of Stock</option>
          <option value="limited">Limited</option>
        </select>
      </div>

      <div className="mb-2">
        <label className="block text-sm font-semibold">Type</label>
        <select
          name="itemtype"
          value={newItem.itemtype}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        >
          <option value="mobility">Mobility</option>
          <option value="patient care">Patient care</option>
          <option value="respiratory">Respiratory</option>
        </select>
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setVisibility(false)}
          className="px-4 py-2 bg-gray-500 text-white rounded mr-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 disabled:cursor-not-allowed bg-green-500 text-white rounded"
        >
          {isLoading ? 'Adding...' : 'Add'}
        </button>
      </div>
      <Toaster/>
    </form>
  );
}

export default AddInventory;
