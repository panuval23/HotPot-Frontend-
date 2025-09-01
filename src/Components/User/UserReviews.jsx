

import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom"; // ⬅️ add useLocation
import { useDispatch, useSelector } from "react-redux";
import { addReview } from "../../store/userSlice";

const UserReview = () => {
  const { menuItemId } = useParams(); // coming from /reviews/add/:menuItemId
  const location = useLocation();      // ⬅️ get state from navigate
  const menuItemName = location.state?.menuItemName || `Item #${menuItemId}`; // ⬅️ safe fallback

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (rating === 0) {
      setMessage("⚠️ Please select a rating before submitting");
      return;
    }
    try {
      const result = await dispatch(
        addReview({
          menuItemID: parseInt(menuItemId), // matches AddReviewDTO
          rating,
          comment,
        })
      ).unwrap();

      setMessage(result.message || "✅ Review added successfully!");
      setRating(0);
      setComment("");
    } catch (err) {
      setMessage("❌ Failed to add review");
    }
  };

  return (
    <div className="container mt-4">
      <h3>✍️ Add Review</h3>
      <p>For: <strong>{menuItemName}</strong></p> {/* ⬅️ show name instead of ID */}

      <div className="mb-3">
        <label className="form-label">Rating:</label>
        <select
          className="form-select w-auto"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          <option value="0">Select</option>
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>
              {r} ⭐
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Comment:</label>
        <textarea
          className="form-control"
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      <button
        className="btn btn-primary"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>

      {message && <div className="alert alert-info mt-3">{message}</div>}
      {error && <div className="alert alert-danger mt-3">❌ {error}</div>}
    </div>
  );
};

export default UserReview;
