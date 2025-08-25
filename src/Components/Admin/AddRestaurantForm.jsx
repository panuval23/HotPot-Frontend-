import { useState } from "react";
import { useDispatch } from "react-redux";
import { addRestaurant } from "../../store/adminSlice";
import RestaurantRegisterModel from "../../Models/restaurantregister.model";

export default function AddRestaurantForm() {
  const [form, setForm] = useState({ ...RestaurantRegisterModel });
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      address: { ...prev.address, [name]: value },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addRestaurant(form));
    setForm({ ...RestaurantRegisterModel }); 
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border rounded">
      <h4 className="mb-3">Add Restaurant</h4>
      <input
        className="form-control mb-2"
        name="restaurantName"
        placeholder="Restaurant Name"
        value={form.restaurantName}
        onChange={handleChange}
      />
      <input
        className="form-control mb-2"
        name="cuisineType"
        placeholder="Cuisine Type"
        value={form.cuisineType}
        onChange={handleChange}
      />
      <input
        className="form-control mb-2"
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={handleChange}
      />
      <input
        className="form-control mb-2"
        type="number"
        name="averagePreparationTime"
        placeholder="Average Preparation Time (minutes)"
        value={form.averagePreparationTime}
        onChange={handleChange}
      />
      <input
        className="form-control mb-2"
        name="imageUrl"
        placeholder="Image URL"
        value={form.imageUrl}
        onChange={handleChange}
      />
      <select
        className="form-control mb-3"
        name="isAvailable"
        value={form.isAvailable}
        onChange={handleChange}
      >
        <option value={true}>Available</option>
        <option value={false}>Not Available</option>
      </select>

      <input
        className="form-control mb-2"
        name="ownerName"
        placeholder="Owner Name"
        value={form.ownerName}
        onChange={handleChange}
      />
      <input
        className="form-control mb-2"
        name="email"
        type="email"
        placeholder="Owner Email"
        value={form.email}
        onChange={handleChange}
      />
      <input
        className="form-control mb-2"
        name="gender"
        placeholder="Gender"
        value={form.gender}
        onChange={handleChange}
      />
      <input
        className="form-control mb-3"
        name="contactNumber"
        placeholder="Contact Number"
        value={form.contactNumber}
        onChange={handleChange}
      />
      <input
        className="form-control mb-2"
        name="street"
        placeholder="Street"
        value={form.address.street}
        onChange={handleAddressChange}
      />
      <input
        className="form-control mb-2"
        name="city"
        placeholder="City"
        value={form.address.city}
        onChange={handleAddressChange}
      />
      <input
        className="form-control mb-2"
        name="state"
        placeholder="State"
        value={form.address.state}
        onChange={handleAddressChange}
      />
      <input
        className="form-control mb-3"
        name="zipcode"
        placeholder="Zip Code"
        value={form.address.zipcode}
        onChange={handleAddressChange}
      />

      <button type="submit" className="btn btn-primary w-100">
        Add Restaurant
      </button>
    </form>
  );
}
