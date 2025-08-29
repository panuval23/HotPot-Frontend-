
export class CategoryCreateDTO {
    constructor(categoryName, isActive = true) {
      this.categoryName = categoryName;
      this.isActive = isActive;
    }
  }
  export class CategoryUpdateDTO {
    constructor(categoryName, isActive) {
      this.categoryName = categoryName;
      this.isActive = isActive;
    }
  }
  export class CategoryDTO {
    constructor(categoryID, categoryName) {
      this.categoryID = categoryID;
      this.categoryName = categoryName;
    }
  }
  export class CategoryResponseDTO {
    constructor(categoryID, categoryName, isActive, createdOn) {
      this.categoryID = categoryID;
      this.categoryName = categoryName;
      this.isActive = isActive;
      this.createdOn = createdOn;
    }
  }
  