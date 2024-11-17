export type productTypes = {
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
