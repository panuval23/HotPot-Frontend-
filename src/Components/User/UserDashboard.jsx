import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurants } from "../../store/restaurantSlice";

import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items: restaurants, status } = useSelector(
    (state) => state.restaurants
  );

  const categories = [
    { name: "Biryani", img: "/images/briyani.jpg" },
    { name: "Dosa", img: "/images/dosa.jpg" },
    { name: "Idli", img: "/images/idly.jpg" },
    { name: "Cakes", img: "/images/cakes.jpg" },
    { name: "Poori", img: "/images/poori.jpg" },
    { name: "Pongal", img: "/images/pongal.jpg" },
  ];

  useEffect(() => {
    dispatch(fetchRestaurants({ pageNumber: 1, pageSize: 10 }));
  }, [dispatch]);

  return (
    <div className="container mt-4">
      <h4 className="mb-3 fw-bold">What's on your mind?</h4>
      <div className="d-flex flex-wrap gap-4 mb-5">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="text-center"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/collection/${cat.name}`)}
          >
            <img
              src={cat.img}
              alt={cat.name}
              className="rounded-circle"
              width="100"
              height="100"
            />
            <p className="mt-2 fw-semibold">{cat.name}</p>
          </div>
        ))}
      </div>

      <h4 className="mb-3 fw-bold">Top Restaurants</h4>
      {status === "loading" ? (
        <p>Loading restaurants...</p>
      ) : restaurants.length === 0 ? (
        <p>No restaurants found.</p>
      ) : (
        <div className="row">
          {restaurants.map((rest) => (
            <div className="col-md-3 mb-4" key={rest.restaurantID}>
              <div className="card h-100 shadow-sm">
                <img
                  src={rest.imageUrl || "/images/default-restaurant.jpg"}
                  alt={rest.name}
                  className="card-img-top"
                  style={{ height: "150px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{rest.name}</h5>
                  <p className="card-text">{rest.cuisineType}</p>
                  <p className="text-muted">{rest.location}</p>
                  <button
                    className="btn btn-sm btn-primary mt-auto"
                    onClick={() =>
                      navigate(`/restaurant/${rest.restaurantID}/menu`)
                    }
                  >
                    View Menu
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

