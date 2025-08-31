// import AddRestaurantForm from "./AddRestaurantForm";

// export default function AddRestaurantPage() {
//   return (
//     <section className="admin-section">
//       <h2>Add Restaurant</h2>
//       <AddRestaurantForm />
//     </section>
//   );
// }
import { useDispatch, useSelector } from "react-redux";
import AddRestaurantForm from "./AddRestaurantForm";
import { addRestaurant } from "../../store/adminSlice";

export default function AddRestaurantPage() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.admin);

  const handleAddRestaurant = (restaurant) => {
    dispatch(addRestaurant(restaurant))
      .unwrap()
      .then(() => {
        alert("Restaurant added successfully!");
      })
      .catch((err) => {
        alert("Failed to add restaurant: " + err);
      });
  };

  return (
    <section className="admin-section">
      <h2>Add Restaurant</h2>
      <AddRestaurantForm onSubmit={handleAddRestaurant} submitLabel="Add Restaurant" />
      
      {loading && <p>Saving...</p>}
      {error && <p className="text-danger">{error}</p>}
    </section>
  );
}
