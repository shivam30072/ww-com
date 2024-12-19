export type productTypes = {
  id: string;
  name: string;
  description: string;
  price: number;
  discount?: number;
  finalPrice: number;
  stock: number;
  category: string;
  brand: string;
  tags: string[];
  totalReviewsCount: number;
  averageRating: number;
  images: string[];
};

export type categoryTypes = {
  name: string;
  description: string;
  image: string;
};

export type cartStateTypes = {
  products: (productTypes & { quantity: number })[];
  cartSum: number;
};
