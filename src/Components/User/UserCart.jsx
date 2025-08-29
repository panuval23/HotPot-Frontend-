import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, removeCartItem, updateCartItem } from "../../store/userCartSlice";
import { useNavigate } from "react-router-dom";

const UserCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items = [], totalCost = 0 } = useSelector((state) => state.userCart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleIncrease = (item) => {
    dispatch(updateCartItem({ CartID: item.cartID, Quantity: item.quantity + 1 }));
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      dispatch(updateCartItem({ CartID: item.cartID, Quantity: item.quantity - 1 }));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeCartItem(item.cartID));
  };

  const handleCheckout = () => {
    navigate("/user/checkout");
  };

  return (
    <div className="container mt-4">
      <h3>Your Cart</h3>
      {items.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {items.map((item) => (
              <li
                key={item.cartID}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{item.menuItemName}</strong> <br />
                  ₹{item.finalPrice} × {item.quantity}
                </div>

                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-sm btn-outline-danger me-2"
                    onClick={() => handleDecrease(item)}
                    disabled={item.quantity === 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="btn btn-sm btn-outline-success ms-2"
                    onClick={() => handleIncrease(item)}
                  >
                    +
                  </button>
                  <button
                    className="btn btn-sm btn-outline-dark ms-3"
                    onClick={() => handleRemove(item)}
                  >
                    ❌
                  </button>
                </div>

                <div>₹{item.subtotal}</div>
              </li>
            ))}
          </ul>

          <h5>Total: ₹{totalCost}</h5>
          <button className="btn btn-success mt-3" onClick={handleCheckout}>
            Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default UserCart;
