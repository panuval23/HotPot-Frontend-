
export class MenuItemCreateDTO {
  constructor(categoryID, name, description, price, availabilityTime, isVeg, tasteInfo, nutritionalInfo, imageUrl, inStock = true, isActive = true) {
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
    this.isActive = isActive;
  }
}
export class MenuItemUpdateDTO {
  constructor(categoryID, name, description, price, availabilityTime, isVeg, tasteInfo, nutritionalInfo, imageUrl, inStock) {
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
  }
}
export class MenuItemResponseDTO {
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

  