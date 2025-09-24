export interface Restaurant {
  id: string;
  slug: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: number;
  price: "₹" | "₹₹" | "₹₹₹";
  imageId: string;
  menu: Meal[];
}

export interface Meal {
  id: string;
  name: string;
  description: string;
  price: number;
  imageId: string;
  category: "Appetizers" | "Main Courses" | "Desserts" | "Beverages";
  customizations?: Customization[];
}

export interface Customization {
  title: string;
  type: "radio" | "checkbox";
  options: CustomizationOption[];
}

export interface CustomizationOption {
  name: string;
  priceModifier?: number;
}
