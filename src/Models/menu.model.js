
export default class MenuItem {
    constructor(menuItemID, restaurantID, categoryID, name, description, price, availabilityTime, isVeg, tasteInfo, nutritionalInfo, imageUrl, inStock, createdOn) {
      this.menuItemID = menuItemID;
      this.restaurantID = restaurantID;
      this.categoryID = categoryID;
      this.name = name;
      this.description = description;
      this.price = price;
      this.availabilityTime = availabilityTime;
      this.isVeg = isVeg;
      this.tasteInfo = tasteInfo;
      this.nutritionalInfo = nutritionalInfo;
      this.imageUrl = imageUrl;
      this.inStock = inStock;
      this.createdOn = createdOn;
    }
  }
  