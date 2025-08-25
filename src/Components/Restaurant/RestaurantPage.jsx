import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../Interceptors/AuthInterceptor";
import "bootstrap/dist/css/bootstrap.min.css";

export default function RestaurantPage() {
  const { id } = useParams(); 
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [restaurantName, setRestaurantName] = useState("");

  useEffect(() => {
    setLoading(true);

    axiosInstance
      .get(`/Restaurant/${id}/menu?pageNumber=1&pageSize=20`) 
      .then((res) => {
        setMenuItems(res.data.items || []);
        if (res.data.items.length > 0) {
          setRestaurantName(res.data.items[0].restaurantName || "Restaurant");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching menu items", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center mt-5">Loading menu...</p>;

  return (
    <div className="container mt-4">
      <h2 className="fw-bold">{restaurantName}</h2>
      <p className="text-muted">Explore our delicious menu items</p>

      <div className="row">
        {menuItems.map((item) => (
          <div key={item.menuItemID} className="col-md-4 col-sm-6 mt-3">
            <div className="card shadow-sm h-100">
              <img
                src={item.imageUrl || "/images/default-food.jpg"}
                className="card-img-top"
                alt={item.name}
              />
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.description}</p>
                <p>
                  <strong>₹{item.price}</strong> ·{" "}
                  {item.isVeg ? (
                    <span className="text-success">Veg</span>
                  ) : (
                    <span className="text-danger">Non-Veg</span>
                  )}
                </p>
                <small className="text-muted">
                  {item.tasteInfo} | {item.availabilityTime}
                </small>
                <br />
                <button className="btn btn-primary btn-sm mt-2">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!loading && menuItems.length === 0 && (
        <p>No menu items found for this restaurant.</p>
      )}
    </div>
  );
}
