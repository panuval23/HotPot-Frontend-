import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddresses, createAddress } from "../../store/addressSlice";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux State
  const { items: addresses = [], status = "idle" } =
    useSelector((state) => state.address || {});

  // Local State
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [showForm, setShowForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
    addressType: "Home",
  });

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  const handleProceed = () => {
    if (!selectedAddress) {
      alert("Please select a delivery address.");
      return;
    }

    navigate("/user/order-summary", {
      state: {
        shippingAddressID: selectedAddress,
        paymentMethod,
      },
    });
  };

  const handleAddAddress = () => {
    dispatch(createAddress(newAddress)).then(() => {
      setShowForm(false);
      setNewAddress({
        addressLine: "",
        city: "",
        state: "",
        pincode: "",
        landmark: "",
        addressType: "Home",
      });
      dispatch(fetchAddresses()); // refresh list
    });
  };

  return (
    <div className="container mt-4">
      <h3>Checkout</h3>

      {/* Address Selection */}
      <h5 className="mt-3">Select Delivery Address</h5>
      {status === "loading" && <p>Loading addresses...</p>}
      {status === "failed" && (
        <p className="text-danger">Failed to load addresses.</p>
      )}

      {addresses.length === 0 && !showForm && (
        <p>No saved addresses. Please add one below.</p>
      )}

      {addresses.length > 0 && (
        <div className="list-group mb-3">
          {addresses.map((addr) => (
            <label key={addr.addressID} className="list-group-item">
              <input
                type="radio"
                name="address"
                value={addr.addressID}
                onChange={() => setSelectedAddress(addr.addressID)}
                checked={selectedAddress === addr.addressID}
                className="me-2"
              />
              {addr.addressLine}, {addr.city}, {addr.state} - {addr.pincode}
            </label>
          ))}
        </div>
      )}

      {/* Toggle Add New Address Form */}
      {!showForm ? (
        <button
          className="btn btn-outline-primary mb-3"
          onClick={() => setShowForm(true)}
        >
          + Add New Address
        </button>
      ) : (
        <div className="card card-body mb-3">
          <h6>Add New Address</h6>
          <input
            type="text"
            placeholder="Address Line"
            className="form-control mb-2"
            value={newAddress.addressLine}
            onChange={(e) =>
              setNewAddress({ ...newAddress, addressLine: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="City"
            className="form-control mb-2"
            value={newAddress.city}
            onChange={(e) =>
              setNewAddress({ ...newAddress, city: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="State"
            className="form-control mb-2"
            value={newAddress.state}
            onChange={(e) =>
              setNewAddress({ ...newAddress, state: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Pincode"
            className="form-control mb-2"
            value={newAddress.pincode}
            onChange={(e) =>
              setNewAddress({ ...newAddress, pincode: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Landmark"
            className="form-control mb-2"
            value={newAddress.landmark}
            onChange={(e) =>
              setNewAddress({ ...newAddress, landmark: e.target.value })
            }
          />
          <select
            className="form-select mb-2"
            value={newAddress.addressType}
            onChange={(e) =>
              setNewAddress({ ...newAddress, addressType: e.target.value })
            }
          >
            <option value="Home">Home</option>
            <option value="Work">Work</option>
            <option value="Other">Other</option>
          </select>
          <button className="btn btn-success me-2" onClick={handleAddAddress}>
            Save Address
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setShowForm(false)}
          >
            Cancel
          </button>
        </div>
      )}

      {/* Payment Method */}
      <h5 className="mt-4">Payment Method</h5>
      <select
        className="form-select"
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
      >
        <option value="COD">Cash on Delivery</option>
        <option value="UPI">UPI</option>
        <option value="CARD">Credit/Debit Card</option>
        <option value="NETBANKING">Net Banking</option>
      </select>

      {/* Proceed Button */}
      <button
        className="btn btn-success mt-4"
        onClick={handleProceed}
        disabled={!selectedAddress}
      >
        Proceed to Order Summary
      </button>
    </div>
  );
};

export default CheckoutPage;
