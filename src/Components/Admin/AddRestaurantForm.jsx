
// import { useState, useEffect } from "react";
// import RestaurantRegisterModel from "../../Models/restaurantregister.model";
// import "./AddRestaurantForm.css";

// export default function AddRestaurantForm({ initialData, onSubmit, onCancel, submitLabel }) {
//   const [form, setForm] = useState({ ...RestaurantRegisterModel });
//   const [isExistingUser, setIsExistingUser] = useState(false); // toggle

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
//     setForm((prev) => ({ ...prev, [name]: type === "number" ? Number(value) : value }));
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
//     console.log("Submitting restaurant:", form);
//     if (onSubmit) onSubmit(form);
//   };

//   return (
    
//     <form onSubmit={handleSubmit} className="p-3 border rounded" style={{ maxWidth: 720 }}>
//       <h4 className="mb-3">{initialData ? "Edit Restaurant" : "Add Restaurant"}</h4>

//       {/* Toggle Existing / New */}
//       <div className="mb-3 d-flex gap-3">
//         <button type="button"
//           className={`btn ${isExistingUser ? "btn-primary" : "btn-outline-primary"}`}
//           onClick={() => setIsExistingUser(true)}>
//           Existing User
//         </button>
//         <button type="button"
//           className={`btn ${!isExistingUser ? "btn-primary" : "btn-outline-primary"}`}
//           onClick={() => setIsExistingUser(false)}>
//           New User
//         </button>
//       </div>

//       {/* Existing user flow */}
//       {isExistingUser && (
//         <input className="form-control mb-3"
//           type="number"
//           name="userId"
//           placeholder="Enter Existing User ID"
//           value={form.userId || ""}
//           onChange={handleChange}
//           required />
//       )}

//       {/* New user flow */}
//       {!isExistingUser && (
//         <>
//           <input className="form-control mb-2" name="username" placeholder="Username"
//             value={form.username} onChange={handleChange} required />
//           <input className="form-control mb-2" name="ownerName" placeholder="Owner Name"
//             value={form.ownerName} onChange={handleChange} />
//           <input className="form-control mb-2" name="email" type="email" placeholder="Email"
//             value={form.email} onChange={handleChange} />
//           <input className="form-control mb-2" name="gender" placeholder="Gender"
//             value={form.gender} onChange={handleChange} />
//           <input className="form-control mb-3" name="contactNumber" placeholder="Contact Number"
//             value={form.contactNumber} onChange={handleChange} required />
//         </>
//       )}

//       {/* Restaurant details (always required) */}
//       <input className="form-control mb-2" name="restaurantName" placeholder="Restaurant Name"
//         value={form.restaurantName} onChange={handleChange} required />
//       <input className="form-control mb-2" name="cuisineType" placeholder="Cuisine Type"
//         value={form.cuisineType} onChange={handleChange} />
//       <input className="form-control mb-2" name="location" placeholder="Location"
//         value={form.location} onChange={handleChange} />
//       <input className="form-control mb-2" type="number" name="averagePreparationTime" placeholder="Avg time (min)"
//         value={form.averagePreparationTime} onChange={handleChange} />
//       <input className="form-control mb-2" name="imageUrl" placeholder="Image URL"
//         value={form.imageUrl} onChange={handleChange} />

//       <select className="form-control mb-3" name="isAvailable" value={form.isAvailable} onChange={handleChange}>
//         <option value={true}>Available</option>
//         <option value={false}>Not Available</option>
//       </select>

//       {/* Address (optional, but allowed) */}
//       <hr />
//       <h6>Address</h6>
//       <input className="form-control mb-2" name="addressLine" placeholder="Address Line"
//         value={form.address.addressLine} onChange={handleAddressChange} />
//       <input className="form-control mb-2" name="city" placeholder="City"
//         value={form.address.city} onChange={handleAddressChange} />
//       <input className="form-control mb-2" name="state" placeholder="State"
//         value={form.address.state} onChange={handleAddressChange} />
//       <input className="form-control mb-2" name="pincode" placeholder="Pincode"
//         value={form.address.pincode} onChange={handleAddressChange} />
//       <input className="form-control mb-2" name="landmark" placeholder="Landmark"
//         value={form.address.landmark} onChange={handleAddressChange} />
//       <select className="form-control mb-3" name="addressType" value={form.address.addressType} onChange={handleAddressChange}>
//         <option value="Home">Home</option>
//         <option value="Work">Work</option>
//         <option value="Restaurant">Restaurant</option>
//       </select>

//       <div className="d-flex gap-2">
//         <button type="submit" className="btn btn-success">
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


// import { useState, useEffect } from "react";
// import RestaurantRegisterModel from "../../Models/restaurantregister.model";
// import "./AddRestaurantForm.css";

// export default function AddRestaurantForm({ initialData, onSubmit, onCancel, submitLabel }) {
//   const [form, setForm] = useState({ ...RestaurantRegisterModel });
//   const [isExistingUser, setIsExistingUser] = useState(false);

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
//     setForm((prev) => ({ ...prev, [name]: type === "number" ? Number(value) : value }));
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
//     console.log("Submitting restaurant:", form);
//     if (onSubmit) onSubmit(form);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-3 border rounded restaurant-form">
//       <h4 className="mb-3">{initialData ? "Edit Restaurant" : "Add Restaurant"}</h4>

//       {/* Toggle Existing / New */}
//       <div className="mb-3 d-flex gap-3">
//         <button
//           type="button"
//           className={`btn ${isExistingUser ? "btn-primary" : "btn-outline-primary"}`}
//           onClick={() => setIsExistingUser(true)}
//         >
//           Existing User
//         </button>
//         <button
//           type="button"
//           className={`btn ${!isExistingUser ? "btn-primary" : "btn-outline-primary"}`}
//           onClick={() => setIsExistingUser(false)}
//         >
//           New User
//         </button>
//       </div>

//       {/* Existing user flow */}
//       {isExistingUser && (
//         <input
//           className="form-control mb-3"
//           type="number"
//           name="userId"
//           placeholder="Enter Existing User ID"
//           value={form.userId || ""}
//           onChange={handleChange}
//           required
//         />
//       )}

//       {/* New user flow */}
//       {!isExistingUser && (
//         <>
//           <input
//             className="form-control mb-2"
//             name="username"
//             placeholder="Username"
//             value={form.username}
//             onChange={handleChange}
//             required
//           />
//           <input
//             className="form-control mb-2"
//             name="ownerName"
//             placeholder="Owner Name"
//             value={form.ownerName}
//             onChange={handleChange}
//           />
//           <input
//             className="form-control mb-2"
//             name="email"
//             type="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={handleChange}
//           />
//           <input
//             className="form-control mb-2"
//             name="gender"
//             placeholder="Gender"
//             value={form.gender}
//             onChange={handleChange}
//           />
//           <input
//             className="form-control mb-3"
//             name="contactNumber"
//             placeholder="Contact Number"
//             value={form.contactNumber}
//             onChange={handleChange}
//             required
//           />
//         </>
//       )}

//       {/* Restaurant details */}
//       <input
//         className="form-control mb-2"
//         name="restaurantName"
//         placeholder="Restaurant Name"
//         value={form.restaurantName}
//         onChange={handleChange}
//         required
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
//       <div className="d-flex align-items-center mb-2">
//   <label htmlFor="averagePreparationTime" className="me-2">
//     Average time (min):
//   </label>
//   <input
//     id="averagePreparationTime"
//     className="form-control"
//     type="number"
//     name="averagePreparationTime"
//     value={form.averagePreparationTime}
//     onChange={handleChange}
//   />
// </div>

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

//       {/* Address section */}
//       <hr />
//       <h6>Address</h6>
//       <div className="address-grid">
//         <input
//           className="form-control"
//           name="addressLine"
//           placeholder="Address Line"
//           value={form.address.addressLine}
//           onChange={handleAddressChange}
//         />
//         <input
//           className="form-control"
//           name="city"
//           placeholder="City"
//           value={form.address.city}
//           onChange={handleAddressChange}
//         />
//         <input
//           className="form-control"
//           name="state"
//           placeholder="State"
//           value={form.address.state}
//           onChange={handleAddressChange}
//         />
//         <input
//           className="form-control"
//           name="pincode"
//           placeholder="Pincode"
//           value={form.address.pincode}
//           onChange={handleAddressChange}
//         />
//         <input
//           className="form-control"
//           name="landmark"
//           placeholder="Landmark"
//           value={form.address.landmark}
//           onChange={handleAddressChange}
//         />
//         <select
//           className="form-control"
//           name="addressType"
//           value={form.address.addressType}
//           onChange={handleAddressChange}
//         >
//           <option value="Home">Home</option>
//           <option value="Work">Work</option>
//           <option value="Restaurant">Restaurant</option>
//         </select>
//       </div>

//       <div className="d-flex gap-2 mt-3">
//         <button type="submit" className="btn btn-success">
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
import "./AddRestaurantForm.css";

export default function AddRestaurantForm({ initialData, onSubmit, onCancel, submitLabel }) {
  const [form, setForm] = useState({ ...RestaurantRegisterModel });
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [imageOptions, setImageOptions] = useState([]);

  useEffect(() => {
    if (initialData) {
      setForm({
        ...RestaurantRegisterModel,
        ...initialData,
        address: { ...RestaurantRegisterModel.address, ...(initialData.address || {}) },
      });
    }
  }, [initialData]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const token = localStorage.getItem("token"); // or wherever you store it
        const res = await fetch("http://localhost:5298/api/Admin/logos", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (!res.ok) throw new Error("Failed to load images");
        const data = await res.json();
        console.log("Fetched logos:", data);
        setImageOptions(data);
      } catch (err) {
        console.error("Error fetching images:", err);
      }
    };
  
    fetchImages();
  }, []);
  
  

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
    <form onSubmit={handleSubmit} className="p-3 border rounded restaurant-form">
      <h4 className="mb-3">{initialData ? "Edit Restaurant" : "Add Restaurant"}</h4>

      {/* Toggle Existing / New */}
      <div className="mb-3 d-flex gap-3">
        <button
          type="button"
          className={`btn ${isExistingUser ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setIsExistingUser(true)}
        >
          Existing User
        </button>
        <button
          type="button"
          className={`btn ${!isExistingUser ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setIsExistingUser(false)}
        >
          New User
        </button>
      </div>

      {/* Existing user flow */}
      {isExistingUser && (
        <input
          className="form-control mb-3"
          type="number"
          name="userId"
          placeholder="Enter Existing User ID"
          value={form.userId || ""}
          onChange={handleChange}
          required
        />
      )}

      {/* New user flow */}
      {!isExistingUser && (
        <>
          <input
            className="form-control mb-2"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />
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
            placeholder="Email"
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
            required
          />
        </>
      )}

      {/* Restaurant details */}
      <input
        className="form-control mb-2"
        name="restaurantName"
        placeholder="Restaurant Name"
        value={form.restaurantName}
        onChange={handleChange}
        required
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
      <div className="d-flex align-items-center mb-2">
        <label htmlFor="averagePreparationTime" className="me-2">
          Average time (min):
        </label>
        <input
          id="averagePreparationTime"
          className="form-control"
          type="number"
          name="averagePreparationTime"
          value={form.averagePreparationTime}
          onChange={handleChange}
        />
      </div>

      {/* ✅ Image dropdown instead of textbox */}
      <select
  className="form-control mb-2"
  name="imageUrl"
  value={form.imageUrl || ""}
  onChange={handleChange}
>
  <option value="">Select Image</option>
  {imageOptions.map((url, idx) => (
    <option key={idx} value={url}>
      {url.split("/").pop()} {/* shows filename */}
    </option>
  ))}
</select>


      <select
        className="form-control mb-3"
        name="isAvailable"
        value={form.isAvailable}
        onChange={handleChange}
      >
        <option value={true}>Available</option>
        <option value={false}>Not Available</option>
      </select>

      {/* Address section */}
      <hr />
      <h6>Address</h6>
      <div className="address-grid">
        <input
          className="form-control"
          name="addressLine"
          placeholder="Address Line"
          value={form.address.addressLine}
          onChange={handleAddressChange}
        />
        <input
          className="form-control"
          name="city"
          placeholder="City"
          value={form.address.city}
          onChange={handleAddressChange}
        />
        <input
          className="form-control"
          name="state"
          placeholder="State"
          value={form.address.state}
          onChange={handleAddressChange}
        />
        <input
          className="form-control"
          name="pincode"
          placeholder="Pincode"
          value={form.address.pincode}
          onChange={handleAddressChange}
        />
        <input
          className="form-control"
          name="landmark"
          placeholder="Landmark"
          value={form.address.landmark}
          onChange={handleAddressChange}
        />
        <select
          className="form-control"
          name="addressType"
          value={form.address.addressType}
          onChange={handleAddressChange}
        >
          <option value="Home">Home</option>
          <option value="Work">Work</option>
          <option value="Restaurant">Restaurant</option>
        </select>
      </div>

      <div className="d-flex gap-2 mt-3">
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
