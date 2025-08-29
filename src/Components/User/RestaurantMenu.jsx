
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMenu } from "../../store/userMenuSlice";
import { addToCart, removeCartItem, fetchCart, updateCartItem } from "../../store/userCartSlice";

const RestaurantMenu = () => {
  const { id: restaurantId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items = [], status, error } = useSelector((state) => state.userMenu);
  const { items: cartItems = [], totalCost = 0 } = useSelector((state) => state.userCart);

  useEffect(() => {
    if (restaurantId) {
      dispatch(fetchMenu({ restaurantId }));
      dispatch(fetchCart());
    }
  }, [dispatch, restaurantId]);

  if (status === "loading") return <p>Loading menu...</p>;
  if (status === "failed") return <p className="text-danger">Error: {error}</p>;


  const groupedMenu = items.reduce((acc, item) => {
    if (!acc[item.categoryName]) acc[item.categoryName] = [];
    acc[item.categoryName].push(item);
    return acc;
  }, {});

  const cartCount = cartItems.reduce((sum, i) => sum + (i.quantity || 0), 0);

  const handleAddToCart = async (menuItem) => {
    const existing = cartItems.find((i) => i.menuItemID === menuItem.menuItemID);
    if (existing) {
      await dispatch(updateCartItem({ CartID: existing.cartID, Quantity: existing.quantity + 1 })).unwrap();
    } else {
      await dispatch(addToCart({ RestaurantID: parseInt(restaurantId), MenuItemID: menuItem.menuItemID, Quantity: 1 })).unwrap();
    }
    dispatch(fetchCart());
  };

  const handleRemoveFromCart = async (menuItem) => {
    const existing = cartItems.find((i) => i.menuItemID === menuItem.menuItemID);
    if (!existing) return;
    if (existing.quantity > 1) {
      await dispatch(updateCartItem({ CartID: existing.cartID, Quantity: existing.quantity - 1 })).unwrap();
    } else {
      await dispatch(removeCartItem(existing.cartID)).unwrap();
    }
    dispatch(fetchCart());
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="row">
   
        <div className="col-md-3 d-none d-md-block border-end">
          <h5>Categories</h5>
          <ul className="list-unstyled">
            {Object.keys(groupedMenu).map((cat) => (
              <li key={cat}><a href={`#${cat}`}>{cat}</a></li>
            ))}
          </ul>
        </div>

  
        <div className="col-md-9">
          <h3 className="mb-4">🍽️ Menu</h3>
          {Object.entries(groupedMenu).map(([cat, catItems]) => (
            <div key={cat} id={cat} className="mb-5">
              <h5 className="fw-bold">{cat}</h5>
              <div className="row g-3">
                {catItems.map((item) => {
                  const inCart = cartItems.find((i) => i.menuItemID === item.menuItemID);
                  return (
                    <div key={item.menuItemID} className="col-md-6">
                      <div className="card shadow-sm border-0 rounded-3 h-100">
                        {item.imageUrl && (
                          <img src={item.imageUrl} alt={item.itemName} className="card-img-top" style={{ height: "180px", objectFit: "cover" }} />
                        )}
                        <div className="card-body d-flex flex-column justify-content-between">
                          <div>
                            <h6 className="card-title">{item.itemName}</h6>
                            <p className="text-muted small">{item.description}</p>
                            <p className="fw-bold">₹{item.price}</p>
                          </div>
                          {inCart ? (
                            <div className="d-flex align-items-center mt-2">
                              <button className="btn btn-sm btn-outline-danger me-2" onClick={() => handleRemoveFromCart(item)}>-</button>
                              <span>{inCart.quantity}</span>
                              <button className="btn btn-sm btn-outline-success ms-2" onClick={() => handleAddToCart(item)}>+</button>
                            </div>
                          ) : (
                            <button className="btn btn-sm btn-success mt-2" onClick={() => handleAddToCart(item)}>+ Add</button>
                          )}
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

      
      {cartItems.length > 0 && (
        <div className="position-fixed bottom-0 start-50 translate-middle-x bg-dark text-white p-3 d-flex justify-content-between align-items-center shadow-lg"
             style={{ width: "100%", maxWidth: "600px", zIndex: 1000 }}>
          <h6 className="mb-0">{cartCount} item{cartCount > 1 ? "s" : ""} | ₹{totalCost}</h6>
          <button className="btn btn-success" onClick={() => navigate("/user/cart")}>
            View Cart →
          </button>
        </div>
      )}
    </div>
  );
};

export default RestaurantMenu;
