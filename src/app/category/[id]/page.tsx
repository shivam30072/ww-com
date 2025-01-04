"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import ProductCard from "../../components/home/ProductCard";
import { Box, Container, Grid2, IconButton, Stack } from "@mui/material";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import Heading from "@/app/components/utils/Heading";
import { motion } from "framer-motion";
import { productTypes } from "@/app/types";
import axios from "axios";

const CategoryPage = () => {
  const pathname = usePathname();
  const id = pathname.split("/")[2];
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [isListView, setIsListView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedProducts = localStorage.getItem(id);
      if (storedProducts && storedProducts.length > 0) {
        const categoryData = JSON.parse(storedProducts);
        setProducts(categoryData);
        if (categoryData && categoryData.length > 0)
          setCategoryName(categoryData[0].category.name);
      } else {
        const fetchData = async () => {
          try {
            const response = await axios.get(
              `${process.env.BACKEND_BASE_URL}/v1/products?category=${id}`
            );
            setProducts(response.data.results);
            setCategoryName(response.data.results[0].category.name);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
        fetchData();
      }
    }
  }, [id]);

  const toggleView = () => {
    setIsListView((prev) => !prev);
  };

  const productAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <Box mt={8.5}>
      <Container>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading title={`${categoryName} Products`} textAlign="left" />
          {isMobile && (
            <IconButton onClick={toggleView}>
              {isListView ? <ViewModuleIcon /> : <ViewListIcon />}
            </IconButton>
          )}
        </Stack>
        <Box sx={{ p: { xs: 0, sm: 2 } }}>
          <Grid2 container spacing={2} rowGap={{ xs: 3, sm: 16 }}>
            {products?.map((product: productTypes) => (
              <Grid2
                size={{ xs: isListView ? 12 : 6, sm: 6, md: 3 }}
                key={product?.id}
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
    </Box>
  );
};

export default CategoryPage;
