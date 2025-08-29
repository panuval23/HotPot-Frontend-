// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchMenuItems,
//   addMenuItem,
//   updateMenuItem,
//   deleteMenuItem,
// } from "../../store/menuSlice";
// import {
//   MenuItemCreateDTO,
//   MenuItemUpdateDTO,
// } from "../../Models/menu.model";
// import "./Menu.css";

// export default function Menu() {
//   const dispatch = useDispatch();
//   const { list, loading, error } = useSelector((state) => state.menu);

//   // Local form state
//   const [form, setForm] = useState({
//     categoryID: "",
//     name: "",
//     description: "",
//     price: "",
//     availabilityTime: "",
//     isVeg: false,
//     tasteInfo: "",
//     nutritionalInfo: "",
//     imageUrl: "",
//     inStock: true,
//     isActive: true,
//   });

//   const [editMode, setEditMode] = useState(false);
//   const [editMenuId, setEditMenuId] = useState(null);

//   useEffect(() => {
//     dispatch(fetchMenuItems({ page: 1, size: 20 }));
//   }, [dispatch]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleAdd = (e) => {
//     e.preventDefault();
//     const dto = new MenuItemCreateDTO(
//       parseInt(form.categoryID),
//       form.name,
//       form.description,
//       parseFloat(form.price),
//       form.availabilityTime,
//       form.isVeg,
//       form.tasteInfo,
//       form.nutritionalInfo,
//       form.imageUrl,
//       form.inStock,
//       form.isActive
//     );
//     dispatch(addMenuItem(dto));
//     resetForm();
//   };

//   const handleEdit = (item) => {
//     setEditMode(true);
//     setEditMenuId(item.menuItemID);
//     setForm(item);
//   };

//   const handleUpdate = (e) => {
//     e.preventDefault();
//     const dto = new MenuItemUpdateDTO(
//       parseInt(form.categoryID),
//       form.name,
//       form.description,
//       parseFloat(form.price),
//       form.availabilityTime,
//       form.isVeg,
//       form.tasteInfo,
//       form.nutritionalInfo,
//       form.imageUrl,
//       form.inStock
//     );
//     dispatch(updateMenuItem({ id: editMenuId, dto }));
//     resetForm();
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this menu item?")) {
//       dispatch(deleteMenuItem(id));
//     }
//   };

//   const resetForm = () => {
//     setForm({
//       categoryID: "",
//       name: "",
//       description: "",
//       price: "",
//       availabilityTime: "",
//       isVeg: false,
//       tasteInfo: "",
//       nutritionalInfo: "",
//       imageUrl: "",
//       inStock: true,
//       isActive: true,
//     });
//     setEditMode(false);
//     setEditMenuId(null);
//   };

//   return (
//     <div className="menu-container">
//       <h2 className="menu-title">🍛 Manage Menu Items</h2>

//       {/* Add / Update Form */}
//       <form
//         onSubmit={editMode ? handleUpdate : handleAdd}
//         className="menu-form"
//       >
//         <input
//           type="number"
//           name="categoryID"
//           placeholder="Category ID"
//           value={form.categoryID}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           value={form.name}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="description"
//           placeholder="Description"
//           value={form.description}
//           onChange={handleChange}
//         />
//         <input
//           type="number"
//           step="0.01"
//           name="price"
//           placeholder="Price"
//           value={form.price}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="availabilityTime"
//           placeholder="Availability Time"
//           value={form.availabilityTime}
//           onChange={handleChange}
//         />
//         <label>
//           <input
//             type="checkbox"
//             name="isVeg"
//             checked={form.isVeg}
//             onChange={handleChange}
//           />
//           Veg?
//         </label>
//         <input
//           type="text"
//           name="tasteInfo"
//           placeholder="Taste Info"
//           value={form.tasteInfo}
//           onChange={handleChange}
//         />
//         <input
//           type="text"
//           name="nutritionalInfo"
//           placeholder="Nutritional Info"
//           value={form.nutritionalInfo}
//           onChange={handleChange}
//         />
//         <input
//           type="text"
//           name="imageUrl"
//           placeholder="Image URL"
//           value={form.imageUrl}
//           onChange={handleChange}
//         />
//         <label>
//           <input
//             type="checkbox"
//             name="inStock"
//             checked={form.inStock}
//             onChange={handleChange}
//           />
//           In Stock
//         </label>
//         <label>
//           <input
//             type="checkbox"
//             name="isActive"
//             checked={form.isActive}
//             onChange={handleChange}
//           />
//           Active
//         </label>

//         <button type="submit" className="btn-submit">
//           {editMode ? "Update Item" : "Add Item"}
//         </button>
//         {editMode && (
//           <button type="button" className="btn-cancel" onClick={resetForm}>
//             Cancel
//           </button>
//         )}
//       </form>

//       {/* Loading / Error */}
//       {loading && <p>Loading menu...</p>}
//       {error && <p className="error-text">{error}</p>}

//       {/* Menu List */}
//       <div className="menu-list">
//         {Array.isArray(list) && list.length > 0 ? (
//           list.map((item) => (
//             <div key={item.menuItemID} className="menu-item-card">
//               <img
//                 src={item.imageUrl || "/images/default-food.jpg"}
//                 alt={item.name}
//                 className="menu-item-img"
//               />
//               <div className="menu-item-body">
//                 <h4>{item.name}</h4>
//                 <p>{item.description}</p>
//                 <p>
//                   <b>₹{item.price}</b> | {item.isVeg ? "🥦 Veg" : "🍗 Non-Veg"}
//                 </p>
//                 <p className="text-muted">{item.availabilityTime}</p>
//                 <div className="menu-actions">
//                   <button
//                     className="btn-edit"
//                     onClick={() => handleEdit(item)}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="btn-delete"
//                     onClick={() => handleDelete(item.menuItemID)}
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No menu items found.</p>
//         )}
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMenuItems,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../../store/menuSlice";
import { fetchCategories } from "../../store/categorySlice";
import {
  MenuItemCreateDTO,
  MenuItemUpdateDTO,
} from "../../Models/menu.model";
import "./Menu.css";

export default function Menu() {
  const dispatch = useDispatch();

  // ✅ Get menu & category state from Redux
  const { list: menuList = [], loading, error } = useSelector(
    (state) => state.menu || {}
  );
  const { list: categoryList = [] } = useSelector(
    (state) => state.categories || {}
  );

  // Local form state
  const [form, setForm] = useState({
    categoryID: "",
    name: "",
    description: "",
    price: "",
    availabilityTime: "",
    isVeg: false,
    tasteInfo: "",
    nutritionalInfo: "",
    imageUrl: "",
    inStock: true,
    isActive: true,
  });

  const [editMode, setEditMode] = useState(false);
  const [editMenuId, setEditMenuId] = useState(null);

  // Load data on mount
  useEffect(() => {
    dispatch(fetchMenuItems({ page: 1, size: 20 }));
    dispatch(fetchCategories());
  }, [dispatch]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Add Menu
  const handleAdd = (e) => {
    e.preventDefault();
    const dto = new MenuItemCreateDTO(
      parseInt(form.categoryID),
      form.name,
      form.description,
      parseFloat(form.price),
      form.availabilityTime,
      form.isVeg,
      form.tasteInfo,
      form.nutritionalInfo,
      form.imageUrl,
      form.inStock,
      form.isActive
    );
    dispatch(addMenuItem(dto));
    resetForm();
  };

  // Edit Menu
  const handleEdit = (item) => {
    setEditMode(true);
    setEditMenuId(item.menuItemID);
    setForm({
      categoryID: item.categoryID,
      name: item.name,
      description: item.description,
      price: item.price,
      availabilityTime: item.availabilityTime,
      isVeg: item.isVeg,
      tasteInfo: item.tasteInfo,
      nutritionalInfo: item.nutritionalInfo,
      imageUrl: item.imageUrl,
      inStock: item.inStock,
      isActive: true,
    });
  };

  // Update Menu
  const handleUpdate = (e) => {
    e.preventDefault();
    const dto = new MenuItemUpdateDTO(
      parseInt(form.categoryID),
      form.name,
      form.description,
      parseFloat(form.price),
      form.availabilityTime,
      form.isVeg,
      form.tasteInfo,
      form.nutritionalInfo,
      form.imageUrl,
      form.inStock
    );
    dispatch(updateMenuItem({ id: editMenuId, dto }));
    resetForm();
  };

  // Delete Menu
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this menu item?")) {
      dispatch(deleteMenuItem(id));
    }
  };

  // Reset Form
  const resetForm = () => {
    setForm({
      categoryID: "",
      name: "",
      description: "",
      price: "",
      availabilityTime: "",
      isVeg: false,
      tasteInfo: "",
      nutritionalInfo: "",
      imageUrl: "",
      inStock: true,
      isActive: true,
    });
    setEditMode(false);
    setEditMenuId(null);
  };

  return (
    <div className="menu-container">
      <h2 className="menu-title">🍛 Manage Menu Items</h2>

      {/* Add / Update Form */}
      <form
        onSubmit={editMode ? handleUpdate : handleAdd}
        className="menu-form"
      >
        {/* Category Dropdown */}
        <select
          name="categoryID"
          value={form.categoryID}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Category --</option>
          {categoryList.map((cat) => (
            <option key={cat.categoryID} value={cat.categoryID}>
              {cat.categoryName}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <input
          type="number"
          step="0.01"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="availabilityTime"
          placeholder="Availability Time"
          value={form.availabilityTime}
          onChange={handleChange}
        />
        <label>
          <input
            type="checkbox"
            name="isVeg"
            checked={form.isVeg}
            onChange={handleChange}
          />
          Veg?
        </label>
        <input
          type="text"
          name="tasteInfo"
          placeholder="Taste Info"
          value={form.tasteInfo}
          onChange={handleChange}
        />
        <input
          type="text"
          name="nutritionalInfo"
          placeholder="Nutritional Info"
          value={form.nutritionalInfo}
          onChange={handleChange}
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={handleChange}
        />
        <label>
          <input
            type="checkbox"
            name="inStock"
            checked={form.inStock}
            onChange={handleChange}
          />
          In Stock
        </label>
        <label>
          <input
            type="checkbox"
            name="isActive"
            checked={form.isActive}
            onChange={handleChange}
          />
          Active
        </label>

        <button type="submit" className="btn-submit">
          {editMode ? "Update Item" : "Add Item"}
        </button>
        {editMode && (
          <button type="button" className="btn-cancel" onClick={resetForm}>
            Cancel
          </button>
        )}
      </form>

      {/* Loading / Error */}
      {loading && <p>Loading menu...</p>}
      {error && <p className="error-text">{error}</p>}

      {/* Menu List */}
      <div className="menu-list">
        {Array.isArray(menuList) && menuList.length > 0 ? (
          menuList.map((item) => (
            <div key={item.menuItemID} className="menu-item-card">
              <img
                src={item.imageUrl || "/images/default-food.jpg"}
                alt={item.name}
                className="menu-item-img"
              />
              <div className="menu-item-body">
                <h4>{item.name}</h4>
                <p>{item.description}</p>
                <p>
                  <b>₹{item.price}</b> |{" "}
                  {item.isVeg ? "🥦 Veg" : "🍗 Non-Veg"}
                </p>

                {/* Category Name */}
                <p>
                  <span className="badge bg-secondary">
                    {
                      categoryList.find(
                        (c) => c.categoryID === item.categoryID
                      )?.categoryName || "Uncategorized"
                    }
                  </span>
                </p>

                <p className="text-muted">{item.availabilityTime}</p>
                <div className="menu-actions">
                  <button
                    className="btn-edit"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(item.menuItemID)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No menu items found.</p>
        )}
      </div>
    </div>
  );
}
