import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { placeOrder, setLastOrder } from "../../store/orderSlice";

const OrderSummary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { shippingAddressID, paymentMethod } = location.state || {};


  const { items = [], totalCost = 0 } = useSelector(
    (state) => state.userCart || {}
  );


  const { items: addresses = [] } = useSelector((state) => state.address || {});
  const selectedAddress = addresses.find(
    (a) => a.addressID === shippingAddressID
  );


  const restaurantName =
    items.length > 0 ? items[0].restaurantName : "Restaurant";

  const deliveryFee = 25; 
  const gst = (totalCost * 0.05).toFixed(2);
  const finalTotal = (totalCost + deliveryFee + parseFloat(gst)).toFixed(2);

  const handlePlaceOrder = async () => {
    try {
      const response = await dispatch(
        placeOrder({
          ShippingAddressID: shippingAddressID,
          PaymentMethod: paymentMethod,
        })
      ).unwrap();

      dispatch(setLastOrder(response));

 
      navigate("/user/order-success");
    } catch (err) {
      console.error("Order failed", err);
      alert("⚠️ Failed to place order.");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Order Summary</h3>

      <div className="card p-3 mb-3">
        <div className="d-flex align-items-center">
          <img
            src={items[0]?.restaurantImage}
            alt={items[0]?.restaurantName}
            style={{
              width: "70px",
              height: "70px",
              objectFit: "cover",
              borderRadius: "8px",
              marginRight: "12px",
            }}
          />
          <div>
            <h5>{items[0]?.restaurantName}</h5>
            <p className="text-muted">{items[0]?.restaurantAddress}</p>
          </div>
        </div>
      </div>

      <div className="card card-body mb-3">
        <h5>Items</h5>
        <ul className="list-group">
          {items.map((item) => (
            <li
              key={item.cartID}
              className="list-group-item d-flex justify-content-between"
            >
              <span>
                {item.menuItemName} × {item.quantity}
              </span>
              <span>₹{item.subtotal}</span>
            </li>
          ))}
        </ul>
      </div>


      <div className="card card-body mb-3">
        <h5>Delivery Details</h5>
        {selectedAddress ? (
          <p>
            {selectedAddress.addressLine}, {selectedAddress.city} -{" "}
            {selectedAddress.pincode}
          </p>
        ) : (
          <p>No address selected.</p>
        )}
        <p>
          Payment Method: <strong>{paymentMethod}</strong>
        </p>
      </div>

      <div className="card card-body mb-3">
        <h5>Bill Details</h5>
        <div className="d-flex justify-content-between">
          <span>Item Total</span>
          <span>₹{totalCost}</span>
        </div>
        <div className="d-flex justify-content-between">
          <span>Delivery Fee</span>
          <span>₹{deliveryFee}</span>
        </div>
        <div className="d-flex justify-content-between">
          <span>GST & Other Charges</span>
          <span>₹{gst}</span>
        </div>
        <hr />
        <div className="d-flex justify-content-between fw-bold">
          <span>TO PAY</span>
          <span>₹{finalTotal}</span>
        </div>
      </div>

      <button
        className="btn btn-success w-100"
        onClick={handlePlaceOrder}
        disabled={items.length === 0}
      >
        Place Order
      </button>
    </div>
  );
};

export default OrderSummary;
