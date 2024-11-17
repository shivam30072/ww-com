"use client";
import { Box, Grid2 } from "@mui/material";
import ProductCard from "./components/home/ProductCard";
import { categoryTypes, productTypes } from "./types";
import CategoryCard from "./components/home/CategoryCard";
import Heading from "./components/utils/Heading";

const productList: productTypes[] = [
  {
    name: "Wireless Bluetooth Headphones",
    description:
      "High-quality wireless Bluetooth headphones with noise-canceling features and long battery life.",
    price: 5000,
    discount: 10,
    finalPrice: 4500,
    stock: 120,
    category: "Electronics",
    brand: "SoundWave",
    tags: ["audio", "wireless", "headphones"],
    totalReviewsCount: 200,
    averageRating: 4.5,
    images: [
      "https://www.beatitude.in/cdn/shop/articles/DSC_2173_720x_dec1d27e-c2a7-4ce7-8b21-654c0ca12e43_1024x.webp?v=1675162397",
    ],
  },
  {
    name: "Gaming Laptop",
    description:
      "A powerful gaming laptop with a high-refresh-rate display, advanced cooling system, and RGB keyboard.",
    price: 120000,
    discount: 15,
    finalPrice: 102000,
    stock: 35,
    category: "Computers",
    brand: "GameTech",
    tags: ["gaming", "laptop", "high-performance"],
    totalReviewsCount: 150,
    averageRating: 4.7,
    images: [
      "https://cdn.shopify.com/s/files/1/0182/1471/5470/files/traditional_saree_600x600.jpg?v=1636999791",
    ],
  },
  {
    name: "Stainless Steel Water Bottle",
    description:
      "Eco-friendly and durable stainless steel water bottle with a sleek design and insulated feature.",
    price: 800,
    discount: 5,
    finalPrice: 760,
    stock: 300,
    category: "Lifestyle",
    brand: "EcoDrink",
    tags: ["bottle", "eco-friendly", "hydration"],
    totalReviewsCount: 50,
    averageRating: 4.3,
    images: [
      "https://cdn.shopify.com/s/files/1/1762/5129/files/women-in-patiala-salwar-from-punjab.jpg?v=1654655251",
    ],
  },
  {
    name: "Men's Running Shoes",
    description:
      "Lightweight and comfortable running shoes designed for daily jogging and sports activities.",
    price: 2500,
    discount: 20,
    finalPrice: 2000,
    stock: 60,
    category: "Footwear",
    brand: "SpeedStep",
    tags: ["shoes", "sports", "running"],
    totalReviewsCount: 120,
    averageRating: 4.6,
    images: [
      "https://cdn0.weddingwire.in/article/0199/original/1280/jpg/119910-houseofnoori-in.jpeg",
    ],
  },
  {
    name: "Wireless Bluetooth Headphones",
    description:
      "High-quality wireless Bluetooth headphones with noise-canceling features and long battery life.",
    price: 5000,
    discount: 10,
    finalPrice: 4500,
    stock: 120,
    category: "Electronics",
    brand: "SoundWave",
    tags: ["audio", "wireless", "headphones"],
    totalReviewsCount: 200,
    averageRating: 4.5,
    images: [
      "https://www.beatitude.in/cdn/shop/articles/DSC_2173_720x_dec1d27e-c2a7-4ce7-8b21-654c0ca12e43_1024x.webp?v=1675162397",
    ],
  },
  {
    name: "Gaming Laptop",
    description:
      "A powerful gaming laptop with a high-refresh-rate display, advanced cooling system, and RGB keyboard.",
    price: 120000,
    discount: 15,
    finalPrice: 102000,
    stock: 35,
    category: "Computers",
    brand: "GameTech",
    tags: ["gaming", "laptop", "high-performance"],
    totalReviewsCount: 150,
    averageRating: 4.7,
    images: [
      "https://cdn.shopify.com/s/files/1/0182/1471/5470/files/traditional_saree_600x600.jpg?v=1636999791",
    ],
  },
  {
    name: "Stainless Steel Water Bottle",
    description:
      "Eco-friendly and durable stainless steel water bottle with a sleek design and insulated feature.",
    price: 800,
    discount: 5,
    finalPrice: 760,
    stock: 300,
    category: "Lifestyle",
    brand: "EcoDrink",
    tags: ["bottle", "eco-friendly", "hydration"],
    totalReviewsCount: 50,
    averageRating: 4.3,
    images: [
      "https://cdn.shopify.com/s/files/1/1762/5129/files/women-in-patiala-salwar-from-punjab.jpg?v=1654655251",
    ],
  },
  {
    name: "Men's Running Shoes",
    description:
      "Lightweight and comfortable running shoes designed for daily jogging and sports activities.",
    price: 2500,
    discount: 20,
    finalPrice: 2000,
    stock: 60,
    category: "Footwear",
    brand: "SpeedStep",
    tags: ["shoes", "sports", "running"],
    totalReviewsCount: 120,
    averageRating: 4.6,
    images: [
      "https://cdn0.weddingwire.in/article/0199/original/1280/jpg/119910-houseofnoori-in.jpeg",
    ],
  },
];

const categoryList: categoryTypes[] = [
  {
    name: "Ethnic Wear",
    description: "Indian ethnic wears",
    image:
      "https://www.lavanyathelabel.com/cdn/shop/products/lbl101ks352_1_1200x.jpg?v=1672236835",
  },
  {
    name: "Casual Wear",
    description: "Casual wears",
    image:
      "https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/24310240/2023/8/10/2a00ea36-dc73-42a9-a1ac-dcef3bf9f37d1691644835308-Chemistry-Women-Opaque-Casual-Shirt-9981691644834783-1.jpg",
  },
  {
    name: "Formal Wear",
    description: "Formal wears",
    image:
      "https://cdn.shopify.com/s/files/1/0486/0634/7416/files/kntr121blac.jpg?v=1722674062",
  },
  {
    name: "Party Wear",
    description: "Indian ethnic wears",
    image:
      "https://evilato.com/wp-content/uploads/2022/01/IMG-20220105-WA0001.jpg",
  },
  {
    name: "Sleep Wear",
    description: "Indian ethnic wears",
    image:
      "https://assets.ajio.com/medias/sys_master/root/20240325/kCsl/6600845616fd2c6e6a7b7985/-473Wx593H-467196974-lavender-MODEL.jpg",
  },
  {
    name: "Ethnic Wear",
    description: "Indian ethnic wears",
    image:
      "https://www.lavanyathelabel.com/cdn/shop/products/lbl101ks352_1_1200x.jpg?v=1672236835",
  },
  {
    name: "Casual Wear",
    description: "Casual wears",
    image:
      "https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/24310240/2023/8/10/2a00ea36-dc73-42a9-a1ac-dcef3bf9f37d1691644835308-Chemistry-Women-Opaque-Casual-Shirt-9981691644834783-1.jpg",
  },
  {
    name: "Formal Wear",
    description: "Formal wears",
    image:
      "https://cdn.shopify.com/s/files/1/0486/0634/7416/files/kntr121blac.jpg?v=1722674062",
  },
];
export default function Home() {
  // const dispatch = useAppDispatch();
  // const counterState = useAppSelector((state) => state.counter.value);
  return (
    <Box>
      <Heading title="Shop by Category" textAlign="center" />

      <Box
        sx={{
          p: 2,
          display: "flex",
          gap: 4,
          overflowX: { xs: "auto", sm: "hidden" },
          justifyContent: { xs: "flex-start", sm: "center" },
          alignItems: "center",
        }}
      >
        {categoryList.map((category) => (
          <Box key={category.name}>
            <CategoryCard categoryData={category} />
          </Box>
        ))}
      </Box>

      <Heading title="Best for you" textAlign="left" />
      <Box sx={{ p: 2 }}>
        <Grid2 container spacing={2}>
          {productList.map((product) => (
            <Grid2 size={{ xs: 12, sm: 6, md: 3 }} key={product.name}>
              <ProductCard productData={product} />
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </Box>
  );
}
