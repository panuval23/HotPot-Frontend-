import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-card shadow-lg">
        <h2 className="brand">🍲 HotPot</h2>
        <h3>Welcome to HotPot</h3>
        <p className="subtitle">Your favorite food delivery platform</p>
        <p className="description">
          Order from top restaurants and enjoy meals delivered to your doorstep.
        </p>

        <button
  className="btn btn-primary w-100"
  onClick={() => navigate("/login")}
>
  Get Started
</button>


        <p className="mt-3">
          New here? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
