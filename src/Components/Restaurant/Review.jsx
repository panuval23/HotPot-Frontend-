// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchReviews, clearReviewsState } from "../store/restaurantReviewsSlice";
// import "./ReviewsList.css";

// export default function ReviewsList() {
//   const dispatch = useDispatch();
//   const { reviews, loading, error } = useSelector((state) => state.reviews);

//   useEffect(() => {
//     dispatch(fetchReviews());

//     return () => {
//       dispatch(clearReviewsState());
//     };
//   }, [dispatch]);

//   return (
//     <div className="reviews-container">
//       <h2>Customer Reviews</h2>
//       {loading && <p>Loading reviews...</p>}
//       {error && <p className="error-msg">{error}</p>}
//       {!loading && reviews.length === 0 && <p>No reviews available.</p>}
//       <ul className="reviews-list">
//         {reviews.map((r) => (
//           <li key={r.ReviewID} className="review-item">
//             <p><strong>{r.UserName}</strong> rated <strong>{r.Rating}/5</strong></p>
//             <p><em>{r.MenuItemName}</em></p>
//             <p>{r.Comment}</p>
//             <small>{new Date(r.CreatedOn).toLocaleString()}</small>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchRestaurantReviews } from "../../store/restaurantReviewsSlice";
// import "./ReviewsList.css";

// export default function ReviewsList() {
//   const dispatch = useDispatch();
//   const { reviews, loading, error } = useSelector((state) => state.reviews);

//   useEffect(() => {
//     dispatch(fetchRestaurantReviews());
//   }, [dispatch]);

//   if (loading) return <p className="loading">Loading reviews...</p>;
//   if (error) return <p className="error">{error}</p>;

//   return (
//     <div className="reviews-container">
//       <h2>Reviews</h2>
//       {reviews.length === 0 ? (
//         <p>No reviews yet.</p>
//       ) : (
//         <ul className="reviews-list">
//           {reviews.map((r) => (
//             <li key={r.reviewID} className="review-card">
//               <p>
//                 <strong>{r.userName}</strong> rated <strong>{r.rating}/5</strong>
//               </p>
//               <p>
//                 <em>{r.menuItemName}</em>
//               </p>
//               <p>{r.comment}</p>
//               <p className="date">{new Date(r.createdOn).toLocaleDateString()}</p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchReviews } from "../Slices/review.slice";

// export default function ReviewComponent() {
//   const dispatch = useDispatch();
//   const { list, error } = useSelector((state) => state.reviews);

//   useEffect(() => {
//     dispatch(fetchReviews());
//   }, [dispatch]);

//   return (
//     <div>
//       <h2>Reviews</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <ul>
//         {list.map((r) => (
//           <li key={r.reviewID}>
//             <strong>{r.userName}</strong> ({r.menuItemName}) - ⭐{r.rating}
//             <p>{r.comment}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
//  import { fetchReviews } from '../../store/reviewsSlice';

// const Review = () => {
//   const dispatch = useDispatch();
//   const { reviews, loading, error } = useSelector((state) => state.reviews);

//   useEffect(() => {
//     dispatch(fetchReviews());
//   }, [dispatch]);

//   return (
//     <div>
//       <h2>Reviews</h2>
//       {loading && <p>Loading...</p>}
//       {error && <p style={{color:"red"}}>{error}</p>}
//       <ul>
//         {reviews.map((r) => (
//           <li key={r.reviewID}>
//             <strong>{r.userName}</strong> on {r.menuItemName}: {r.comment} ⭐{r.rating}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Review;
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchReviews } from "../../store/reviewsSlice";

// export default function Reviews() {
//   const dispatch = useDispatch();
//   const { list, loading, error } = useSelector((s) => s.reviews);

//   useEffect(() => {
//     dispatch(fetchReviews());
//   }, [dispatch]);

//   if (loading) return <p>Loading reviews...</p>;
//   if (error) return <p className="text-danger">{error}</p>;

//   return (
//     <div className="mt-4">
//       <h3>Customer Reviews</h3>
//       {list?.length > 0 ? (
//         <ul className="list-group">
//           {list.map((r) => (
//             <li key={r.reviewID} className="list-group-item">
//               <strong>{r.userName}</strong> on <em>{r.menuItemName}</em> <br />
//               ⭐ {r.rating}/5 <br />
//               {r.comment}
//               <div className="text-muted small">
//                 {new Date(r.createdOn).toLocaleString()}
//               </div>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No reviews found.</p>
//       )}
//     </div>
//   );
// }
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews } from "../../store/restaurantReviewsSlice";

export default function Reviews() {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((s) => s.restaurantReviews);

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="mt-4">
      <h3>⭐ Customer Reviews</h3>
      {list?.length > 0 ? (
        <ul className="list-group">
          {list.map((r) => (
            <li key={r.reviewID} className="list-group-item">
              <strong>{r.userName}</strong> on <em>{r.menuItemName}</em> <br />
              ⭐ {r.rating}/5 <br />
              {r.comment}
              <div className="text-muted small">
                {new Date(r.createdOn).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews found.</p>
      )}
    </div>
  );
}
