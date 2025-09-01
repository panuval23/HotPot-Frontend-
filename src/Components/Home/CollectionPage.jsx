import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../Interceptors/AuthInterceptor";
import "bootstrap/dist/css/bootstrap.min.css";

export default function CollectionPage() {
  const { name } = useParams(); 
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    axiosInstance
      .get(`/User/menu/search?searchTerm=${name}&pageNumber=1&pageSize=20`)
      .then((res) => {
        const menuItems = res.data.items || [];
        const uniqueRestaurants = [];
        const seen = new Set();

       
        menuItems.forEach((item) => {
          if (!seen.has(item.restaurantID)) {
            seen.add(item.restaurantID);
            uniqueRestaurants.push({
              restaurantID: item.restaurantID,
              name: item.restaurantName || "Restaurant",
              cuisineType: item.cuisineType || "Multi-Cuisine",
              location: item.location || "Unknown",
              rating: item.rating || "4.2",
              offer: item.offer || null,
              imageUrl: item.imageUrl || "/images/default-restaurant.jpg",
              deliveryTime: item.deliveryTime || "20-30 mins",
            });
          }
        });

        setRestaurants(uniqueRestaurants);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching collection data", err);
        setLoading(false);
      });
  }, [name]);

  if (loading) return <p className="text-center mt-5">Loading {name}...</p>;

  return (
    <div className="container mt-4">
      <h2 className="fw-bold">{name}</h2>
      <p className="text-muted">
        Taste these delectable {name} options to make your day.
      </p>

      <div className="row">
        {restaurants.map((rest) => (
          <div
            key={rest.restaurantID}
            className="col-md-3 col-sm-6 mb-4"
            style={{ cursor: "pointer" }}
          >
            <div className="card shadow-sm h-100 border-0">
              <img
                src={rest.imageUrl}
                className="card-img-top"
                alt={rest.name}
                style={{
                  height: "160px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />

            
              {rest.offer && (
                <div
                  style={{
                    position: "absolute",
                    background: "#000",
                    color: "#fff",
                    fontSize: "13px",
                    padding: "3px 8px",
                    top: "10px",
                    left: "10px",
                    borderRadius: "5px",
                  }}
                >
                  {rest.offer}
                </div>
              )}

              <div className="card-body">
                <h5 className="card-title fw-bold">{rest.name}</h5>
                <p className="card-text text-muted mb-1">{rest.cuisineType}</p>
                <p className="card-text text-muted mb-1">{rest.location}</p>
                <p className="card-text fw-semibold">
                  ⭐ {rest.rating} · {rest.deliveryTime}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!loading && restaurants.length === 0 && (
        <p>No restaurants found for {name}.</p>
      )}
    </div>
  );
}
