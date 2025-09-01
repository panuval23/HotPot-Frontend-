
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMenu } from "../../store/userMenuSlice";
import {
  addToCart,
  removeCartItem,
  fetchCart,
  updateCartItem,
} from "../../store/userCartSlice";
import "./RestaurantMenu.css";

const RestaurantMenu = () => {
  const { id: restaurantId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items = [], status, error } = useSelector((state) => state.userMenu);
  const { items: cartItems = [], totalCost = 0 } = useSelector(
    (state) => state.userCart
  );

  const [selectedItem, setSelectedItem] = useState(null);
  const [filters, setFilters] = useState({
    restaurantId: parseInt(restaurantId),
    categoryName: "",
    isVeg: null,
    minPrice: "",
    maxPrice: "",
  });

  useEffect(() => {
    if (restaurantId) {
      dispatch(fetchMenu({ restaurantId: parseInt(restaurantId), pageNumber: 1, pageSize: 20 }));
      dispatch(fetchCart());
    }
  }, [dispatch, restaurantId]);

  if (status === "loading") return <p>Loading menu...</p>;
  if (status === "failed") return <p className="text-danger">Error: {error}</p>;

  // ✅ Discount checker
  const isDiscountValid = (item) => {
    if (!item || !item.discountPercent || item.discountPercent <= 0) return false;
    if (item.discountValidFrom && item.discountValidTo) {
      const now = new Date();
      const validFrom = new Date(item.discountValidFrom);
      const validTo = new Date(item.discountValidTo);
      return now >= validFrom && now <= validTo;
    }
    return true;
  };

  const groupedMenu = items.reduce((acc, item) => {
    if (!acc[item.categoryName]) acc[item.categoryName] = [];
    acc[item.categoryName].push(item);
    return acc;
  }, {});

  const cartCount = cartItems.reduce((sum, i) => sum + (i.quantity || 0), 0);

  const handleAddToCart = async (menuItem) => {
    const existing = cartItems.find((i) => i.menuItemID === menuItem.menuItemID);
    if (existing) {
      await dispatch(
        updateCartItem({
          CartID: existing.cartID,
          Quantity: existing.quantity + 1,
        })
      ).unwrap();
    } else {
      await dispatch(
        addToCart({
          restaurantId: parseInt(restaurantId),
          menuItemId: menuItem.menuItemID,
          quantity: 1,
        })
      ).unwrap();
    }
    dispatch(fetchCart());
  };

  const handleRemoveFromCart = async (menuItem) => {
    const existing = cartItems.find((i) => i.menuItemID === menuItem.menuItemID);
    if (!existing) return;
    if (existing.quantity > 1) {
      await dispatch(
        updateCartItem({ CartID: existing.cartID, Quantity: existing.quantity - 1 })
      ).unwrap();
    } else {
      await dispatch(removeCartItem(existing.cartID)).unwrap();
    }
    dispatch(fetchCart());
  };

  const applyFilters = () => {
    dispatch(fetchMenu({ ...filters, restaurantId: parseInt(restaurantId) }));
  };

  return (
    <div className="container mt-4 mb-5">
      <h2 className="fw-bold mb-4">🍽️ Menu</h2>

      {/* ---------------- Filters ---------------- */}
      <div className="d-flex gap-3 mb-4 flex-wrap">
        {/* Veg/Non-Veg */}
        <select
          value={filters.isVeg ?? ""}
          onChange={(e) =>
            setFilters({
              ...filters,
              isVeg: e.target.value === "" ? null : e.target.value === "true",
            })
          }
        >
          <option value="">All</option>
          <option value="true">Veg</option>
          <option value="false">Non-Veg</option>
        </select>

        {/* Min Price */}
        <input
          type="number"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
        />

        {/* Max Price */}
        <input
          type="number"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
        />

        {/* Category */}
        <input
          type="text"
          placeholder="Category"
          value={filters.categoryName}
          onChange={(e) => setFilters({ ...filters, categoryName: e.target.value })}
        />

        <button className="btn btn-primary" onClick={applyFilters}>
          Apply
        </button>
      </div>

      <div className="row">
        {/* Sidebar Categories */}
        <div className="col-md-3 d-none d-md-block border-end">
          <h5>Categories</h5>
          <ul className="list-unstyled">
            {Object.keys(groupedMenu).map((cat) => (
              <li key={cat}>
                <a href={`#${cat}`}>{cat}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Menu Items */}
        <div className="col-md-9">
          {Object.entries(groupedMenu).map(([cat, catItems]) => (
            <div key={cat} id={cat} className="mb-5">
              <h5 className="fw-bold">{cat}</h5>
              <div className="row g-3">
                {catItems.map((item) => {
                  const inCart = cartItems.find((i) => i.menuItemID === item.menuItemID);
                  const hasDiscount = isDiscountValid(item);

                  return (
                    <div key={item.menuItemID} className="col-md-6">
                      <div className="card shadow-sm border-0 rounded-3 h-100">
                        {item.imageUrl && (
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="card-img-top"
                            style={{ height: "180px", objectFit: "cover" }}
                          />
                        )}
                        <div className="card-body d-flex flex-column justify-content-between">
                          <div>
                            <h6 className="card-title">{item.name}</h6>
                            <p className="text-muted small">{item.description}</p>

                            {/* Price */}
                            <p className="fw-bold">
                              {hasDiscount ? (
                                <>
                                  <span className="text-muted text-decoration-line-through me-2">
                                    ₹{item.price}
                                  </span>
                                  <span>₹{item.finalPrice}</span>
                                  <span className="badge bg-success ms-2">
                                    -{item.discountPercent}%
                                  </span>
                                </>
                              ) : (
                                <>₹{item.price}</>
                              )}
                            </p>
                          </div>

                          {/* Cart buttons */}
                          {inCart ? (
                            <div className="d-flex align-items-center mt-2">
                              <button
                                className="btn btn-sm btn-outline-danger me-2"
                                onClick={() => handleRemoveFromCart(item)}
                              >
                                -
                              </button>
                              <span>{inCart.quantity}</span>
                              <button
                                className="btn btn-sm btn-outline-success ms-2"
                                onClick={() => handleAddToCart(item)}
                              >
                                +
                              </button>
                            </div>
                          ) : (
                            <button
                              className="btn btn-sm btn-success mt-2"
                              onClick={() => handleAddToCart(item)}
                            >
                              + Add
                            </button>
                          )}

                          {/* More Details */}
                          <button
                            className="btn btn-link p-0 mt-2"
                            onClick={() => setSelectedItem(item)}
                          >
                            More Details →
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Cart Summary */}
      {cartItems.length > 0 && (
        <div
          className="position-fixed bottom-0 start-50 translate-middle-x bg-dark text-white p-3 d-flex justify-content-between align-items-center shadow-lg"
          style={{ width: "100%", maxWidth: "600px", zIndex: 1000 }}
        >
          <h6 className="mb-0">
            {cartCount} item{cartCount > 1 ? "s" : ""} | ₹{totalCost}
          </h6>
          <button className="btn btn-success" onClick={() => navigate("/user/cart")}>
            View Cart →
          </button>
        </div>
      )}

      {/* Modal for More Details */}
      {selectedItem && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ background: "rgba(0,0,0,0.6)" }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedItem.name}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedItem(null)}
                ></button>
              </div>
              <div className="modal-body">
                {selectedItem.imageUrl && (
                  <img
                    src={selectedItem.imageUrl}
                    alt={selectedItem.name}
                    className="img-fluid rounded mb-3"
                  />
                )}
                <p><b>Description:</b> {selectedItem.description}</p>
                {selectedItem.tasteInfo && <p><b>Taste:</b> {selectedItem.tasteInfo}</p>}
                {selectedItem.nutritionalInfo && <p><b>Nutritional Info:</b> {selectedItem.nutritionalInfo}</p>}
                {selectedItem.availabilityTime && <p><b>Available:</b> {selectedItem.availabilityTime}</p>}

                {/* Price in modal */}
                <p>
                  <b>Price:</b>{" "}
                  {isDiscountValid(selectedItem) && selectedItem.discountPercent ? (
                    <>
                      <span className="text-muted text-decoration-line-through me-2">
                        ₹{selectedItem.price}
                      </span>
                      <span>₹{selectedItem.finalPrice}</span>
                      <span className="badge bg-success ms-2">
                        -{selectedItem.discountPercent}%
                      </span>
                    </>
                  ) : (
                    <>₹{selectedItem.price}</>
                  )}
                </p>
                <p><b>Type:</b> {selectedItem.isVeg ? "Veg" : "Non-Veg"}</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setSelectedItem(null)}>
                  Close
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => {
                    handleAddToCart(selectedItem);
                    setSelectedItem(null);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantMenu;
