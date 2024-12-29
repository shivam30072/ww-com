"use client";
import {
  Box,
  Container,
  Grid2,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import ProductCard from "./components/home/ProductCard";
import { categoryTypes, productTypes } from "./types";
import CategoryCard from "./components/home/CategoryCard";
import Heading from "./components/utils/Heading";
import ImageSlider from "./components/home/ImageSlider";
import { motion } from "framer-motion";

import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import { useEffect, useState } from "react";
const productList: productTypes[] = [
  {
    discount: 15,
    stock: 200,
    tags: ["saree", "traditional", "elegant", "silk"],
    totalReviewsCount: 2,
    averageRating: 3.5,
    name: "Classic Saree",
    sku: "SAREE123",
    description:
      "A traditional and elegant saree made from premium fabric, perfect for all occasions.",
    price: 99.99,
    finalPrice: 84.99,
    category: {
      name: "Saree",
      description: "A traditional Indian garment, often worn by women.",
      id: "672f292496da1256705e0a76",
      image: "",
    },
    brand: "TraditionalElegance",
    specifications: {
      material: "Silk",
      fit: "Regular",
      care: "Dry Clean Only",
    },
    colors: [
      {
        images: [
          "https://png.pngtree.com/thumb_back/fh260/background/20230331/pngtree-woman-in-a-blue-saree-photo-image_2161954.jpg",
          "https://png.pngtree.com/thumb_back/fh260/background/20230331/pngtree-woman-in-a-blue-saree-photo-image_2161949.jpg",
        ],
        colorName: "Blue",
      },
      {
        images: [
          "https://images.wallpapersden.com/image/download/celina-jaitly-in-green-saree-hd-pics_aWZpZ26UmZqaraWkpJRmZWdprWxrbQ.jpg",
          "https://i.pinimg.com/736x/92/76/fb/9276fbe2871f6d5e7c251bf6e7028a24.jpg",
        ],
        colorName: "Green",
      },
    ],
    reviews: [
      {
        userId: "672f138c6090c2215c603e4e",
        rating: 4,
        comment:
          "Great product! Very satisfied with the quality and performance.",
        createdAt: "2024-12-16T03:26:16.276Z",
      },
      {
        userId: "675d6c8a144b2a43ab1bf4fc",
        rating: 3,
        comment: "Great product! Cloth is too good.",
        createdAt: "2024-12-16T03:28:43.241Z",
      },
    ],
    id: "672f2c1f0eaa8064881f3e0b",
  },
  {
    discount: 12,
    stock: 180,
    tags: ["saree", "festive", "elegant", "yellow"],
    totalReviewsCount: 0,
    averageRating: 0,
    name: "Elegant Yellow Saree",
    sku: "SAREE125",
    description:
      "A vibrant yellow saree that combines elegance and charm, perfect for festive occasions.",
    price: 109.99,
    finalPrice: 96.99,
    category: {
      name: "Saree",
      description: "A traditional Indian garment, often worn by women.",
      id: "672f292496da1256705e0a76",
      image: "",
    },
    brand: "TraditionalElegance",
    specifications: {
      material: "Silk",
      fit: "Regular",
      care: "Dry Clean Only",
    },
    colors: [
      {
        images: [
          "https://cdn.rajwadi.com/image/cache/data/yellow-color-contemporary-saree-38561-800x1100.jpg",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK1_WKAkR2z13Mw6AMY2fcbtF9ICSC55vjubl-cVgYPnS47KUlkRA927n5s0PWLNVF4lY&usqp=CAU",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcpa6cJZbpWhstS9PbAhgjE8VY3aPN-EaWrnTi4RnANjBU3Syz48CPJtumSK2u5-mzU4k&usqp=CAU",
        ],
        colorName: "Yellow",
      },
    ],
    reviews: [],
    id: "675d4668126e616e7c02f6d7",
  },
  {
    discount: 10,
    stock: 150,
    tags: ["saree", "traditional", "elegant", "silk", "red"],
    totalReviewsCount: 0,
    averageRating: 0,
    name: "Classic Red Saree",
    sku: "SAREE124",
    description:
      "A beautiful red saree made from premium fabric, ideal for any traditional occasion.",
    price: 129.99,
    finalPrice: 116.99,
    category: {
      name: "Saree",
      description: "A traditional Indian garment, often worn by women.",
      id: "672f292496da1256705e0a76",
      image: "",
    },
    brand: "TraditionalElegance",
    specifications: {
      material: "Silk",
      fit: "Regular",
      care: "Dry Clean Only",
    },
    colors: [
      {
        images: [
          "https://cdn.pixabay.com/photo/2024/05/18/18/34/ai-generated-8770842_1280.jpg",
          "https://cdn.pixabay.com/photo/2022/06/02/04/57/model-7237020_640.jpg",
          "https://cdn.pixabay.com/photo/2014/05/22/14/43/sari-351103_640.jpg",
        ],
        colorName: "Red",
      },
    ],
    reviews: [],
    id: "675d4668126e616e7c02f6d9",
  },
  {
    discount: 15,
    stock: 220,
    tags: ["saree", "traditional", "elegant", "silk", "blue"],
    totalReviewsCount: 0,
    averageRating: 0,
    name: "Traditional Blue Saree",
    sku: "SAREE126",
    description:
      "A graceful blue saree crafted from premium silk fabric, ideal for special occasions.",
    price: 119.99,
    finalPrice: 101.99,
    category: {
      name: "Saree",
      description: "A traditional Indian garment, often worn by women.",
      id: "672f292496da1256705e0a76",
      image: "",
    },
    brand: "TraditionalElegance",
    specifications: {
      material: "Silk",
      fit: "Regular",
      care: "Dry Clean Only",
    },
    colors: [
      {
        images: [
          "https://i.pinimg.com/736x/ea/db/5d/eadb5d15d975b0c5933359534465cb19.jpg",
          "https://i.pinimg.com/474x/bf/ea/42/bfea4219f0c9b0632ef3f0f91929e754.jpg",
          "https://i.pinimg.com/736x/e1/99/00/e19900cdfda281610625198a030f6a11.jpg",
        ],
        colorName: "Blue",
      },
    ],
    reviews: [],
    id: "675d4668126e616e7c02f6db",
  },
  {
    discount: 20,
    stock: 100,
    tags: ["saree", "royal", "wedding", "red"],
    totalReviewsCount: 0,
    averageRating: 0,
    name: "Royal Red Saree",
    sku: "SAREE127",
    description:
      "A rich red saree that exudes royalty, perfect for weddings and formal events.",
    price: 149.99,
    finalPrice: 119.99,
    category: {
      name: "Saree",
      description: "A traditional Indian garment, often worn by women.",
      id: "672f292496da1256705e0a76",
      image: "",
    },
    brand: "TraditionalElegance",
    specifications: {
      material: "Silk",
      fit: "Regular",
      care: "Dry Clean Only",
    },
    colors: [
      {
        images: [
          "https://cdn.pixabay.com/photo/2014/06/05/14/38/saree-362756_640.jpg",
          "https://cdn.pixabay.com/photo/2020/12/13/20/27/woman-5829242_640.jpg",
          "https://cdn.pixabay.com/photo/2020/12/13/20/27/woman-5829241_640.jpg",
        ],
        colorName: "Red",
      },
    ],
    reviews: [],
    id: "675d4668126e616e7c02f6dd",
  },
  {
    discount: 18,
    stock: 175,
    tags: ["saree", "vibrant", "elegant", "yellow"],
    totalReviewsCount: 0,
    averageRating: 0,
    name: "Bright Yellow Saree",
    sku: "SAREE128",
    description:
      "A lively yellow saree, adding charm and vibrancy to any occasion.",
    price: 109.99,
    finalPrice: 89.99,
    category: {
      name: "Saree",
      description: "A traditional Indian garment, often worn by women.",
      id: "672f292496da1256705e0a76",
      image: "",
    },
    brand: "TraditionalElegance",
    specifications: {
      material: "Silk",
      fit: "Regular",
      care: "Dry Clean Only",
    },
    colors: [
      {
        images: [
          "https://cdn.rajwadi.com/image/cache/data/yellow-color-contemporary-saree-38561-800x1100.jpg",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK1_WKAkR2z13Mw6AMY2fcbtF9ICSC55vjubl-cVgYPnS47KUlkRA927n5s0PWLNVF4lY&usqp=CAU",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcpa6cJZbpWhstS9PbAhgjE8VY3aPN-EaWrnTi4RnANjBU3Syz48CPJtumSK2u5-mzU4k&usqp=CAU",
        ],
        colorName: "Yellow",
      },
    ],
    reviews: [],
    id: "675d4668126e616e7c02f6df",
  },
  {
    discount: 10,
    stock: 210,
    tags: ["saree", "elegant", "silk", "blue"],
    totalReviewsCount: 0,
    averageRating: 0,
    name: "Classic Blue Saree",
    sku: "SAREE129",
    description:
      "A timeless blue saree made with high-quality silk, perfect for special gatherings.",
    price: 119.99,
    finalPrice: 107.99,
    category: {
      name: "Saree",
      description: "A traditional Indian garment, often worn by women.",
      id: "672f292496da1256705e0a76",
      image: "",
    },
    brand: "TraditionalElegance",
    specifications: {
      material: "Silk",
      fit: "Regular",
      care: "Dry Clean Only",
    },
    colors: [
      {
        images: [
          "https://i.pinimg.com/736x/c0/c8/e0/c0c8e0b07b92cd36258029c4fbf9677d.jpg",
          "https://img.freepik.com/premium-photo/aiyuj-wearing-blue-saree-photo-shoot_961875-289365.jpg",
          "https://i.pinimg.com/736x/ea/db/5d/eadb5d15d975b0c5933359534465cb19.jpg",
        ],
        colorName: "Blue",
      },
    ],
    reviews: [],
    id: "675d4668126e616e7c02f6e1",
  },
  {
    discount: 5,
    stock: 160,
    tags: ["saree", "charming", "red", "silk"],
    totalReviewsCount: 0,
    averageRating: 0,
    name: "Charming Red Saree",
    sku: "SAREE130",
    description:
      "A charming red saree for festive and traditional occasions, made from luxurious fabric.",
    price: 134.99,
    finalPrice: 128.99,
    category: {
      name: "Saree",
      description: "A traditional Indian garment, often worn by women.",
      id: "672f292496da1256705e0a76",
      image: "",
    },
    brand: "TraditionalElegance",
    specifications: {
      material: "Silk",
      fit: "Regular",
      care: "Dry Clean Only",
    },
    colors: [
      {
        images: [
          "https://cdn.pixabay.com/photo/2019/02/18/11/28/mehendi-4004296_640.jpg",
          "https://cdn.pixabay.com/photo/2015/04/22/15/08/saree-734917_640.jpg",
          "https://cdn.pixabay.com/photo/2023/08/25/04/29/ai-generated-8212082_640.png",
        ],
        colorName: "Red",
      },
    ],
    reviews: [],
    id: "675d4668126e616e7c02f6e3",
  },
];

const categoryList: categoryTypes[] = [
  {
    name: "Ethnic Wear",
    description: "Indian ethnic wears",
    image:
      "https://cdn.shopify.com/s/files/1/0486/0634/7416/files/kntr121blac.jpg?v=1722674062",
    id: "1",
  },
  {
    name: "Casual Wear",
    description: "Casual wears",
    image:
      "https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/24310240/2023/8/10/2a00ea36-dc73-42a9-a1ac-dcef3bf9f37d1691644835308-Chemistry-Women-Opaque-Casual-Shirt-9981691644834783-1.jpg",
    id: "2",
  },
  {
    name: "Formal Wear",
    description: "Formal wears",
    image:
      "https://cdn.shopify.com/s/files/1/0486/0634/7416/files/kntr121blac.jpg?v=1722674062",
    id: "3",
  },
  {
    name: "Party Wear",
    description: "Indian ethnic wears",
    image:
      "https://evilato.com/wp-content/uploads/2022/01/IMG-20220105-WA0001.jpg",
    id: "4",
  },
  {
    name: "Party Wear",
    description: "Indian ethnic wears",
    image:
      "https://evilato.com/wp-content/uploads/2022/01/IMG-20220105-WA0001.jpg",
    id: "5",
  },
];

const productAnimation = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const categoryAnimation = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

export default function Home() {
  const [isListView, setIsListView] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 600);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const toggleView = () => {
    setIsListView((prev) => !prev);
  };

  return (
    <Box mt={8.5}>
      <ImageSlider />

      <Container>
        <Heading title="Category" textAlign="center" />
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
            <Box key={category.id}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={productAnimation}
              >
                <CategoryCard categoryData={category} />
              </motion.div>
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Heading title="Best for you" textAlign="center" />
          {isMobile && (
            <IconButton onClick={toggleView} sx={{ ml: 2 }}>
              {isListView ? <ViewModuleIcon /> : <ViewListIcon />}
            </IconButton>
          )}
        </Box>
        <Box sx={{ p: { xs: 0, sm: 2 } }}>
          <Grid2 container spacing={2} rowGap={{ xs: 3, sm: 12 }}>
            {productList.map((product) => (
              <Grid2
                size={{ xs: isListView ? 12 : 6, sm: 6, md: 3 }}
                key={product.id}
              >
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={productAnimation}
                >
                  <ProductCard productData={product} />
                </motion.div>
              </Grid2>
            ))}
          </Grid2>
        </Box>
      </Container>
      <Box mt={16}>
        <img
          src="https://www.koskii.com/cdn/shop/files/Website-Banner-B2G1-free_1944x.jpg?v=1731396161"
          alt="banner"
          width={"100%"}
          height={"100%"}
        />
      </Box>
    </Box>
  );
}
