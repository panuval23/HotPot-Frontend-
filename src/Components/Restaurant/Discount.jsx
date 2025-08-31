
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDiscount } from "../../store/discountSlice";
import { fetchMenuItems } from "../../store/menuSlice";

export default function Discounts() {
  const dispatch = useDispatch();
  const { list: menuList = [] } = useSelector((state) => state.menu || {});
  const { loading, success, error } = useSelector((s) => s.discount);

  const [form, setForm] = useState({
    menuItemID: "",
    discountPercent: "",
    validFrom: "",
    validTo: "",
  });

  // ✅ Load menu items when component mounts
  useEffect(() => {
    dispatch(fetchMenuItems({ page: 1, size: 50 }));
  }, [dispatch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createDiscount(form));
    setForm({ menuItemID: "", discountPercent: "", validFrom: "", validTo: "" });
  };

  return (
    <div className="mt-4">
      <h3>🎟 Manage Discounts</h3>
      <form className="row g-2" onSubmit={handleSubmit}>
        {/* 🔽 Dropdown for Menu Items */}
        <div className="col-md-4">
          <select
            name="menuItemID"
            className="form-select"
            value={form.menuItemID}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Menu Item --</option>
            {menuList.map((item) => (
              <option key={item.menuItemID} value={item.menuItemID}>
                {item.name} (₹{item.price})
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-2">
          <input
            type="number"
            name="discountPercent"
            value={form.discountPercent}
            placeholder="Discount %"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-3">
          <input
            type="date"
            name="validFrom"
            value={form.validFrom}
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-3">
          <input
            type="date"
            name="validTo"
            value={form.validTo}
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-12">
          <button className="btn btn-success mt-2" type="submit">
            Add Discount
          </button>
        </div>
      </form>

      {loading && <p className="text-info mt-2">Adding discount...</p>}
      {success && <p className="text-success mt-2">{success}</p>}
      {error && <p className="text-danger mt-2">{error}</p>}
    </div>
  );
}
