/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";
import { Box, Container, Grid2, IconButton } from "@mui/material";
import ProductCard from "./components/home/ProductCard";
// import { categoryTypes, productTypes } from "./types";
import CategoryCard from "./components/home/CategoryCard";
import Heading from "./components/utils/Heading";
import ImageSlider from "./components/home/ImageSlider";
import { motion } from "framer-motion";

import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = process.env.BACKEND_BASE_URL;

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
  const [isMobile, setIsMobile] = useState(false);
  const [productList, setProductList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [productsResponse, categoriesResponse] = await Promise.all([
        axios.get(`${BASE_URL}/v1/products?limit=30&page=1`),
        axios.get(`${BASE_URL}/v1/category?limit=10&page=1`),
      ]);
      setProductList(productsResponse.data.results);
      setCategoryList(categoriesResponse.data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      fetchData();
    };

    initializeData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const toggleView = () => {
    setIsListView((prev) => !prev);
  };

  if (loading) {
    return <Box mt={8.5}>Loading...</Box>;
  }

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
            overflowX: "auto",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          {categoryList?.map((category) => (
            <Box key={category.id}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={categoryAnimation}
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
          <Grid2 container spacing={2} rowGap={{ xs: 3, sm: 16 }}>
            {productList?.map((product) => (
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
