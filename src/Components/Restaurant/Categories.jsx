import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../../store/categorySlice";
import {
  CategoryCreateDTO,
  CategoryUpdateDTO,
} from "../../Models/category.model";
import "./Categories.css";

export default function Categories() {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.categories);

  const [newCategoryName, setNewCategoryName] = useState("");
  const [isActive, setIsActive] = useState(true);

  const [editMode, setEditMode] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newCategoryName) return;
    const dto = new CategoryCreateDTO(newCategoryName, isActive);
    dispatch(addCategory(dto));
    setNewCategoryName("");
    setIsActive(true);
  };

  const handleEdit = (category) => {
    setEditMode(true);
    setEditCategoryId(category.categoryID);
    setNewCategoryName(category.categoryName);
    setIsActive(category.isActive);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const dto = new CategoryUpdateDTO(newCategoryName, isActive);
    dispatch(updateCategory({ id: editCategoryId, dto }));
    setEditMode(false);
    setNewCategoryName("");
    setIsActive(true);
    setEditCategoryId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteCategory(id));
    }
  };

  return (
    <div className="categories-container">
      <h2 className="categories-title">🍲 Manage Categories</h2>

      <form
        onSubmit={editMode ? handleUpdate : handleAdd}
        className="category-form"
      >
        <input
          type="text"
          placeholder="Enter category name"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          required
        />
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
          Active
        </label>
        <button type="submit" className="btn-submit">
          {editMode ? "Update Category" : "Add Category"}
        </button>
        {editMode && (
          <button
            type="button"
            className="btn-cancel"
            onClick={() => {
              setEditMode(false);
              setNewCategoryName("");
              setIsActive(true);
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {loading && <p>Loading categories...</p>}
      {error && <p className="error-text">{error}</p>}

      <ul className="category-list">
        {list.map((cat) => (
          <li key={cat.categoryID} className="category-item">
            <span>
              {cat.categoryName}{" "}
              {!cat.isActive && <span className="inactive">(Inactive)</span>}
            </span>
            <div className="category-actions">
              <button
                className="btn-edit"
                onClick={() => handleEdit(cat)}
              >
                Edit
              </button>
              <button
                className="btn-delete"
                onClick={() => handleDelete(cat.categoryID)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
