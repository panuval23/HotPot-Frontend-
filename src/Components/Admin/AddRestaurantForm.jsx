// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { addRestaurant } from "../../store/adminSlice";
// import RestaurantRegisterModel from "../../Models/restaurantregister.model";

// export default function AddRestaurantForm() {
//   const [form, setForm] = useState({ ...RestaurantRegisterModel });
//   const dispatch = useDispatch();
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };
//   const handleAddressChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       address: { ...prev.address, [name]: value },
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(addRestaurant(form));
//     setForm({ ...RestaurantRegisterModel }); 
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-3 border rounded">
//       <h4 className="mb-3">Add Restaurant</h4>
//       <input
//         className="form-control mb-2"
//         name="restaurantName"
//         placeholder="Restaurant Name"
//         value={form.restaurantName}
//         onChange={handleChange}
//       />
//       <input
//         className="form-control mb-2"
//         name="cuisineType"
//         placeholder="Cuisine Type"
//         value={form.cuisineType}
//         onChange={handleChange}
//       />
//       <input
//         className="form-control mb-2"
//         name="location"
//         placeholder="Location"
//         value={form.location}
//         onChange={handleChange}
//       />
//       <input
//         className="form-control mb-2"
//         type="number"
//         name="averagePreparationTime"
//         placeholder="Average Preparation Time (minutes)"
//         value={form.averagePreparationTime}
//         onChange={handleChange}
//       />
//       <input
//         className="form-control mb-2"
//         name="imageUrl"
//         placeholder="Image URL"
//         value={form.imageUrl}
//         onChange={handleChange}
//       />
//       <select
//         className="form-control mb-3"
//         name="isAvailable"
//         value={form.isAvailable}
//         onChange={handleChange}
//       >
//         <option value={true}>Available</option>
//         <option value={false}>Not Available</option>
//       </select>

//       <input
//         className="form-control mb-2"
//         name="ownerName"
//         placeholder="Owner Name"
//         value={form.ownerName}
//         onChange={handleChange}
//       />
//       <input
//         className="form-control mb-2"
//         name="email"
//         type="email"
//         placeholder="Owner Email"
//         value={form.email}
//         onChange={handleChange}
//       />
//       <input
//         className="form-control mb-2"
//         name="gender"
//         placeholder="Gender"
//         value={form.gender}
//         onChange={handleChange}
//       />
//       <input
//         className="form-control mb-3"
//         name="contactNumber"
//         placeholder="Contact Number"
//         value={form.contactNumber}
//         onChange={handleChange}
//       />
//       <input
//         className="form-control mb-2"
//         name="street"
//         placeholder="Street"
//         value={form.address.street}
//         onChange={handleAddressChange}
//       />
//       <input
//         className="form-control mb-2"
//         name="city"
//         placeholder="City"
//         value={form.address.city}
//         onChange={handleAddressChange}
//       />
//       <input
//         className="form-control mb-2"
//         name="state"
//         placeholder="State"
//         value={form.address.state}
//         onChange={handleAddressChange}
//       />
//       <input
//         className="form-control mb-3"
//         name="zipcode"
//         placeholder="Zip Code"
//         value={form.address.zipcode}
//         onChange={handleAddressChange}
//       />

//       <button type="submit" className="btn btn-primary w-100">
//         Add Restaurant
//       </button>
//     </form>
//   );
// }
// src/Components/Admin/AddRestaurantForm.jsx
// import { useState, useEffect } from "react";
// import RestaurantRegisterModel from "../../Models/restaurantregister.model";

// export default function AddRestaurantForm({ initialData, onSubmit, onCancel, submitLabel }) {
//   const [form, setForm] = useState({ ...RestaurantRegisterModel });

//   useEffect(() => {
//     if (initialData) {
//       setForm({
//         ...RestaurantRegisterModel,
//         ...initialData,
//         address: { ...RestaurantRegisterModel.address, ...(initialData.address || {}) },
//       });
//     }
//   }, [initialData]);

//   const handleChange = (e) => {
//     const { name, value, type } = e.target;
//     setForm(prev => ({ ...prev, [name]: type === "number" ? Number(value) : value }));
//   };

//   const handleAddressChange = (e) => {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, address: { ...prev.address, [name]: value } }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (onSubmit) onSubmit(form);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-3 border rounded" style={{ maxWidth: 720 }}>
//       <h4 className="mb-3">{initialData ? "Edit Restaurant" : "Add Restaurant"}</h4>

//       <input className="form-control mb-2" name="restaurantName" placeholder="Restaurant Name" value={form.restaurantName} onChange={handleChange} />
//       <input className="form-control mb-2" name="cuisineType" placeholder="Cuisine Type" value={form.cuisineType} onChange={handleChange} />
//       <input className="form-control mb-2" name="location" placeholder="Location" value={form.location} onChange={handleChange} />
//       <input className="form-control mb-2" type="number" name="averagePreparationTime" placeholder="Avg time (min)" value={form.averagePreparationTime} onChange={handleChange} />
//       <input className="form-control mb-2" name="imageUrl" placeholder="Image URL" value={form.imageUrl} onChange={handleChange} />

//       <select className="form-control mb-3" name="isAvailable" value={form.isAvailable} onChange={handleChange}>
//         <option value={true}>Available</option>
//         <option value={false}>Not Available</option>
//       </select>

//       <input className="form-control mb-2" name="ownerName" placeholder="Owner Name" value={form.ownerName} onChange={handleChange} />
//       <input className="form-control mb-2" name="email" type="email" placeholder="Owner Email" value={form.email} onChange={handleChange} />
//       <input className="form-control mb-2" name="contactNumber" placeholder="Contact Number" value={form.contactNumber} onChange={handleChange} />

//       <hr />
//       <h6>Address</h6>
//       <input className="form-control mb-2" name="street" placeholder="Street" value={form.address.street} onChange={handleAddressChange} />
//       <input className="form-control mb-2" name="city" placeholder="City" value={form.address.city} onChange={handleAddressChange} />
//       <input className="form-control mb-2" name="state" placeholder="State" value={form.address.state} onChange={handleAddressChange} />
//       <input className="form-control mb-3" name="zipcode" placeholder="Zip Code" value={form.address.zipcode} onChange={handleAddressChange} />

//       <div className="d-flex gap-2">
//         <button type="submit" className="btn btn-primary">
//           {submitLabel || (initialData ? "Update Restaurant" : "Add Restaurant")}
//         </button>
//         {onCancel && (
//           <button type="button" className="btn btn-secondary" onClick={onCancel}>
//             Cancel
//           </button>
//         )}
//       </div>
//     </form>
//   );
// }
import { useState, useEffect } from "react";
import RestaurantRegisterModel from "../../Models/restaurantregister.model";

export default function AddRestaurantForm({ initialData, onSubmit, onCancel, submitLabel }) {
  const [form, setForm] = useState({ ...RestaurantRegisterModel });
  const [isExistingUser, setIsExistingUser] = useState(false); // toggle

  useEffect(() => {
    if (initialData) {
      setForm({
        ...RestaurantRegisterModel,
        ...initialData,
        address: { ...RestaurantRegisterModel.address, ...(initialData.address || {}) },
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "number" ? Number(value) : value }));
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
    console.log("Submitting restaurant:", form);
    if (onSubmit) onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border rounded" style={{ maxWidth: 720 }}>
      <h4 className="mb-3">{initialData ? "Edit Restaurant" : "Add Restaurant"}</h4>

      {/* Toggle Existing / New */}
      <div className="mb-3 d-flex gap-3">
        <button type="button"
          className={`btn ${isExistingUser ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setIsExistingUser(true)}>
          Existing User
        </button>
        <button type="button"
          className={`btn ${!isExistingUser ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setIsExistingUser(false)}>
          New User
        </button>
      </div>

      {/* Existing user flow */}
      {isExistingUser && (
        <input className="form-control mb-3"
          type="number"
          name="userId"
          placeholder="Enter Existing User ID"
          value={form.userId || ""}
          onChange={handleChange}
          required />
      )}

      {/* New user flow */}
      {!isExistingUser && (
        <>
          <input className="form-control mb-2" name="username" placeholder="Username"
            value={form.username} onChange={handleChange} required />
          <input className="form-control mb-2" name="ownerName" placeholder="Owner Name"
            value={form.ownerName} onChange={handleChange} />
          <input className="form-control mb-2" name="email" type="email" placeholder="Email"
            value={form.email} onChange={handleChange} />
          <input className="form-control mb-2" name="gender" placeholder="Gender"
            value={form.gender} onChange={handleChange} />
          <input className="form-control mb-3" name="contactNumber" placeholder="Contact Number"
            value={form.contactNumber} onChange={handleChange} required />
        </>
      )}

      {/* Restaurant details (always required) */}
      <input className="form-control mb-2" name="restaurantName" placeholder="Restaurant Name"
        value={form.restaurantName} onChange={handleChange} required />
      <input className="form-control mb-2" name="cuisineType" placeholder="Cuisine Type"
        value={form.cuisineType} onChange={handleChange} />
      <input className="form-control mb-2" name="location" placeholder="Location"
        value={form.location} onChange={handleChange} />
      <input className="form-control mb-2" type="number" name="averagePreparationTime" placeholder="Avg time (min)"
        value={form.averagePreparationTime} onChange={handleChange} />
      <input className="form-control mb-2" name="imageUrl" placeholder="Image URL"
        value={form.imageUrl} onChange={handleChange} />

      <select className="form-control mb-3" name="isAvailable" value={form.isAvailable} onChange={handleChange}>
        <option value={true}>Available</option>
        <option value={false}>Not Available</option>
      </select>

      {/* Address (optional, but allowed) */}
      <hr />
      <h6>Address</h6>
      <input className="form-control mb-2" name="addressLine" placeholder="Address Line"
        value={form.address.addressLine} onChange={handleAddressChange} />
      <input className="form-control mb-2" name="city" placeholder="City"
        value={form.address.city} onChange={handleAddressChange} />
      <input className="form-control mb-2" name="state" placeholder="State"
        value={form.address.state} onChange={handleAddressChange} />
      <input className="form-control mb-2" name="pincode" placeholder="Pincode"
        value={form.address.pincode} onChange={handleAddressChange} />
      <input className="form-control mb-2" name="landmark" placeholder="Landmark"
        value={form.address.landmark} onChange={handleAddressChange} />
      <select className="form-control mb-3" name="addressType" value={form.address.addressType} onChange={handleAddressChange}>
        <option value="Home">Home</option>
        <option value="Work">Work</option>
        <option value="Restaurant">Restaurant</option>
      </select>

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-success">
          {submitLabel || (initialData ? "Update Restaurant" : "Add Restaurant")}
        </button>
        {onCancel && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
