

// const RestaurantRegisterModel = {
//   UserId: null,
//   Username: "",
//   OwnerName: "",
//   Email: "",
//   Gender: "",
//   ContactNumber: "",
//   Address: {
//     Street: "",
//     City: "",
//     State: "",
//     ZipCode: ""
//   },
//   IsDefault: true,
//   RestaurantName: "",
//   CuisineType: "",
//   Location: "",
//   AveragePreparationTime: 0,
//   ImageUrl: "",
//   IsAvailable: true
// };

// export default RestaurantRegisterModel;

// const RestaurantRegisterModel = {
//   userId: null,
//   username: "",
//   ownerName: "",
//   email: "",
//   gender: "",
//   contactNumber: "",
//   address: {
//     street: "",
//     city: "",
//     state: "",
//     zipcode: ""
//   },
//   isDefault: true,
//   restaurantName: "",
//   cuisineType: "",
//   location: "",
//   averagePreparationTime: 0,
//   imageUrl: "",
//   isAvailable: true
// };

// export default RestaurantRegisterModel;
// const RestaurantRegisterModel = {
//   userId: null,
//   username: "",
//   ownerName: "",
//   email: "",
//   gender: "",
//   contactNumber: "",
//   address: {
//     addressLine: "",   // ✅ backend expects AddressLine
//     city: "",
//     state: "",
//     pincode: "",       // ✅ backend expects Pincode
//     landmark: "",
//     addressType: "Work"
//   },
//   isDefault: true,
//   restaurantName: "",
//   cuisineType: "",
//   location: "",
//   averagePreparationTime: 0,
//   imageUrl: "",
//   isAvailable: true
// };

// export default RestaurantRegisterModel;
const RestaurantRegisterModel = {
  userId: null,   // if set -> attach to existing user
  username: "",
  ownerName: "",
  email: "",
  gender: "",
  contactNumber: "",
  address: {
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
    addressType: "Work"
  },
  isDefault: true,
  restaurantName: "",
  cuisineType: "",
  location: "",
  averagePreparationTime: 0,
  imageUrl: "",
  isAvailable: true
};

export default RestaurantRegisterModel;
