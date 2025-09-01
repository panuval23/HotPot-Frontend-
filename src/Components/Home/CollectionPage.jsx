
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../Interceptors/AuthInterceptor";
import "bootstrap/dist/css/bootstrap.min.css";

export default function CollectionPage() {
  const { name } = useParams();
  const [menuItems, setMenuItems] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError("");

    axiosInstance
      .get(
        `/User/menu/search?searchTerm=${encodeURIComponent(
          name || ""
        )}&pageNumber=1&pageSize=20`
      )
      .then((res) => {
        if (!isMounted) return;
        const items = Array.isArray(res?.data?.items) ? res.data.items : [];
        setMenuItems(items); 
        setLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error("Error fetching collection data", err);
        setError("Failed to load items. Please try again.");
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [name]);

  if (loading) return <p className="text-center mt-5">Loading {name}...</p>;

  if (error)
    return (
      <div className="container mt-4">
        <h2 className="fw-bold">{name}</h2>
        <p className="text-danger">{error}</p>
      </div>
    );

  return (
    <div className="container mt-4">
      <h2 className="fw-bold">{name}</h2>
      <p className="text-muted">
        Taste these delectable {name} options to make your day.
      </p>

      <div className="row">
        {(menuItems || []).map((item) => (
          <div
            key={item.menuItemID}
            className="col-md-3 col-sm-6 mb-4"
            style={{ cursor: "pointer" }}
          >
            <div className="card shadow-sm h-100 border-0 position-relative">
              <img
                src={item.imageUrl || "/images/default-food.jpg"}
                className="card-img-top"
                alt={item.name || "Menu item"}
                style={{
                  height: "160px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
                onError={(e) => {
                  e.currentTarget.src = "/images/default-food.jpg";
                }}
              />

            
              {item.discountPercent ? (
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
                  {item.discountPercent}% OFF
                </div>
              ) : null}

              <div className="card-body">
                <h5 className="card-title fw-bold mb-1">
                  {item.name || "Item"}
                </h5>
                {item.description ? (
                  <p className="card-text text-muted small mb-2">
                    {item.description}
                  </p>
                ) : null}

                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-semibold">
                    ₹{(item.finalPrice ?? item.price ?? 0).toFixed(2)}
                  </span>
                  {item.restaurantName ? (
                    <span className="text-secondary small">
                      {item.restaurantName}
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {menuItems.length === 0 && (
        <p className="text-center text-muted">No items found for {name}.</p>
      )}
    </div>
  );
}
