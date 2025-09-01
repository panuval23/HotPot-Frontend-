// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axiosInstance from "../../Interceptors/AuthInterceptor";
// import "bootstrap/dist/css/bootstrap.min.css";

// export default function CollectionPage() {
//   const { name } = useParams(); 
//   const [restaurants, setRestaurants] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setLoading(true);

//     axiosInstance
//       .get(`/User/menu/search?searchTerm=${name}&pageNumber=1&pageSize=20`)
//       .then((res) => {
//         const menuItems = res.data.items || [];
//         const uniqueRestaurants = [];
//         const seen = new Set();

       
//         menuItems.forEach((item) => {
//           if (!seen.has(item.restaurantID)) {
//             seen.add(item.restaurantID);
//             uniqueRestaurants.push({
//               restaurantID: item.restaurantID,
//               name: item.restaurantName || "Restaurant",
//               cuisineType: item.cuisineType || "Multi-Cuisine",
//               location: item.location || "Unknown",
//               rating: item.rating || "4.2",
//               offer: item.offer || null,
//               imageUrl: item.imageUrl || "/images/default-restaurant.jpg",
//               deliveryTime: item.deliveryTime || "20-30 mins",
//             });
//           }
//         });

//         setRestaurants(uniqueRestaurants);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching collection data", err);
//         setLoading(false);
//       });
//   }, [name]);

//   if (loading) return <p className="text-center mt-5">Loading {name}...</p>;

//   return (
//     <div className="container mt-4">
//       <h2 className="fw-bold">{name}</h2>
//       <p className="text-muted">
//         Taste these delectable {name} options to make your day.
//       </p>

//       <div className="row">
//         {restaurants.map((rest) => (
//           <div
//             key={rest.restaurantID}
//             className="col-md-3 col-sm-6 mb-4"
//             style={{ cursor: "pointer" }}
//           >
//             <div className="card shadow-sm h-100 border-0">
//               <img
//                 src={rest.imageUrl}
//                 className="card-img-top"
//                 alt={rest.name}
//                 style={{
//                   height: "160px",
//                   objectFit: "cover",
//                   borderRadius: "10px",
//                 }}
//               />

            
//               {rest.offer && (
//                 <div
//                   style={{
//                     position: "absolute",
//                     background: "#000",
//                     color: "#fff",
//                     fontSize: "13px",
//                     padding: "3px 8px",
//                     top: "10px",
//                     left: "10px",
//                     borderRadius: "5px",
//                   }}
//                 >
//                   {rest.offer}
//                 </div>
//               )}

//               <div className="card-body">
//                 <h5 className="card-title fw-bold">{rest.name}</h5>
//                 <p className="card-text text-muted mb-1">{rest.cuisineType}</p>
//                 <p className="card-text text-muted mb-1">{rest.location}</p>
//                 <p className="card-text fw-semibold">
//                   ⭐ {rest.rating} · {rest.deliveryTime}
//                 </p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {!loading && restaurants.length === 0 && (
//         <p>No restaurants found for {name}.</p>
//       )}
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axiosInstance from "../../Interceptors/AuthInterceptor";
// import "bootstrap/dist/css/bootstrap.min.css";

// export default function CollectionPage() {
//   const { name } = useParams();
//   const [menuItems, setMenuItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setLoading(true);

//     axiosInstance
//       .get(`/User/menu/search?searchTerm=${name}&pageNumber=1&pageSize=20`)
//       .then((res) => {
//         const items = res.data.items || [];

//         // 🔍 Filter: check menu name & description
//         const filteredItems = items.filter(
//           (item) =>
//             item.name?.toLowerCase().includes(name.toLowerCase()) ||
//             item.description?.toLowerCase().includes(name.toLowerCase())
//         );

//         setMenuItems(filteredItems);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching collection data", err);
//         setLoading(false);
//       });
//   }, [name]);

//   if (loading) return <p className="text-center mt-5">Loading {name}...</p>;

//   return (
//     <div className="container mt-4">
//       <h2 className="fw-bold">{name}</h2>
//       <p className="text-muted">
//         Taste these delectable {name} options to make your day.
//       </p>

//       <div className="row">
//         {menuItems.map((item) => (
//           <div
//             key={item.menuItemID}
//             className="col-md-3 col-sm-6 mb-4"
//             style={{ cursor: "pointer" }}
//           >
//             <div className="card shadow-sm h-100 border-0">
//               <img
//                 src={item.imageUrl || "/images/default-food.jpg"}
//                 className="card-img-top"
//                 alt={item.name}
//                 style={{
//                   height: "160px",
//                   objectFit: "cover",
//                   borderRadius: "10px",
//                 }}
//               />

//               {item.offer && (
//                 <div
//                   style={{
//                     position: "absolute",
//                     background: "#000",
//                     color: "#fff",
//                     fontSize: "13px",
//                     padding: "3px 8px",
//                     top: "10px",
//                     left: "10px",
//                     borderRadius: "5px",
//                   }}
//                 >
//                   {item.offer}
//                 </div>
//               )}

//               <div className="card-body">
//                 <h5 className="card-title fw-bold">{item.name}</h5>
//                 {item.description && (
//                   <p className="card-text text-muted small">{item.description}</p>
//                 )}
//                 {item.price && (
//                   <p className="fw-semibold">₹{item.price}</p>
//                 )}
//                 {item.restaurantName && (
//                   <p className="text-secondary small">
//                     From {item.restaurantName}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {!loading && menuItems.length === 0 && (
//         <p>No items found for {name}.</p>
//       )}
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../Interceptors/AuthInterceptor";
import "bootstrap/dist/css/bootstrap.min.css";

export default function CollectionPage() {
  const { name } = useParams();
  const [menuItems, setMenuItems] = useState([]); // always an array
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
        setMenuItems(items); // ✅ do not filter on FE — BE already did case-insensitive search
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

              {/* If you later add discounts/offers, show them here */}
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
