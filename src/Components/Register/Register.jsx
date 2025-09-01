

import { useState } from "react";
import axios from "axios";
import { RegisterModel } from "../../Models/register.model";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";

export default function Register() {
  const [user, setUser] = useState(new RegisterModel());
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const changeUser = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const register = (e) => {
    e.preventDefault();

    if (
      !user.username ||
      !user.name ||
      !user.email ||
      !user.contactNumber ||
      !user.role ||
      !user.gender ||
      !user.city ||
      !user.state ||
      !user.pincode ||
      !user.addressLine
    ) {
      toast.error("⚠️ Please fill in all required fields", {
        theme: "colored",
        className: "toast-error",
      });
      return;
    }

    setLoading(true);

    axios
      .post("http://localhost:5298/api/authentication/register", user)
      .then((res) => {
        if (res.data && res.data.userID) {
          toast.success(
            <div className="toast-success">
              <h4>🎉 Registration Successful!</h4>
              <p>Welcome to HotPot, <b>{res.data.username}</b> </p>
              <p>Please login to continue.</p>
              <button
                onClick={() => {
                  toast.dismiss();
                  navigate("/login");
                }}
                className="toast-ok-btn"
              >
                OK
              </button>
            </div>,
            {
              autoClose: false,
              closeOnClick: false,
              draggable: false,
              position: "top-center",
              icon: false 
            }
          );
        } else {
          toast.error(res.data.message || "❌ Registration failed", {
            theme: "colored",
            className: "toast-error",
          });
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("❌ Something went wrong. Try again.", {
          theme: "colored",
          className: "toast-error",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Register</h2>

        <form onSubmit={register}>
          <div>
            <label>Username *</label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={changeUser}
              required
            />
          </div>
          <div>
            <label>Full Name *</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={changeUser}
              required
            />
          </div>
          <div>
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={changeUser}
              required
            />
          </div>
          <div>
            <label>Contact Number *</label>
            <input
              type="text"
              name="contactNumber"
              value={user.contactNumber}
              onChange={changeUser}
              required
            />
          </div>
          <div>
            <label>Role *</label>
            <select
              name="role"
              value={user.role}
              onChange={changeUser}
              required
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
              <option value="Restaurant">Restaurant</option>
            </select>
          </div>
          <div>
            <label>Gender *</label>
            <div className="gender-group">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={user.gender === "Male"}
                  onChange={changeUser}
                />{" "}
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={user.gender === "Female"}
                  onChange={changeUser}
                />{" "}
                Female
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  checked={user.gender === "Other"}
                  onChange={changeUser}
                />{" "}
                Other
              </label>
            </div>
          </div>
          <div>
            <label>Address Line *</label>
            <input
              type="text"
              name="addressLine"
              value={user.addressLine}
              onChange={changeUser}
              required
            />
          </div>
          <div>
            <label>City *</label>
            <input
              type="text"
              name="city"
              value={user.city}
              onChange={changeUser}
              required
            />
          </div>
          <div>
            <label>State *</label>
            <input
              type="text"
              name="state"
              value={user.state}
              onChange={changeUser}
              required
            />
          </div>
          <div>
            <label>Pincode *</label>
            <input
              type="text"
              name="pincode"
              value={user.pincode}
              onChange={changeUser}
              required
            />
          </div>
          <div className="full-width">
            <label>Landmark (Optional)</label>
            <input
              type="text"
              name="landmark"
              value={user.landmark}
              onChange={changeUser}
            />
          </div>

          <button
            type="submit"
            className="btn-register"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="register-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        closeOnClick
        draggable
        pauseOnHover
        toastClassName="toast-base"
      />
    </div>
  );
}
