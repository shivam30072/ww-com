export type productTypes = {
  id: string;
  name: string;
  description: string;
  price: number;
  discount?: number;
  finalPrice: number;
  stock: number;
  sku: string;
  category: categoryTypes;
  specifications: specificationsTypes;
  colors: colorTypes[];
  brand: string;
  tags: string[];
  reviews: reviewTypes[];
  totalReviewsCount: number;
  averageRating: number;
};

export type categoryTypes = {
  name: string;
  description: string;
  id: string;
  image: string;
};
export type specificationsTypes = {
  material: string;
  fit: string;
  care: string;
};
export type colorTypes = {
  images: string[];
  colorName: string;
};
export type reviewTypes = {
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
};

export type cartStateTypes = {
  products: (productTypes & { quantity: number })[];
  cartSum: number;
};

export type checkoutStateTypes = {
  products: (productTypes & { quantity: number })[];
  totSum: number;
};
