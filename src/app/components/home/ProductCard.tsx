"use client";

import { colors } from "@/app/constants";
import { productTypes } from "@/app/types";
import { addToCart } from "@/lib/features/CartSlice";
import { addToCheckout } from "@/lib/features/CheckoutSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { ShoppingCart, Star } from "@mui/icons-material";
import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

type productDataProp = {
  productData: productTypes;
};

const ProductCard = ({ productData }: productDataProp) => {
  const [hovered, setHovered] = useState(false);

  const { products } = useAppSelector((state) => state.Cart);
  const dispatch = useAppDispatch();

  const router = useRouter();

  const handleAddToCart = () => {
    dispatch(addToCart(productData));
  };
  const handleAddToCheckout = () => {
    dispatch(addToCheckout(productData));
    router.push("/checkout");
  };

  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "300px" },
        height: "400px",
        padding: { xs: "0px", sm: "24px" },
      }}
    >
      <Box
        onClick={() => router.push(`/product/${productData.id}`)}
        sx={{
          // border: `1px solid ${colors.text}`,
          borderRadius: "8px",
          width: "100%",
          height: { xs: "68%", sm: "100%" },
          background: `url(${productData.colors[0].images[0]})`,
          backgroundSize: "cover",
          position: "relative",
          boxShadow:
            "rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px",
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.010)",
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "40%",
            background: "linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent)",
          }}
        />

        {productData.averageRating && (
          <Box
            sx={{
              position: "absolute",
              top: "0px",
              left: "0px",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              color: "#fff",
              padding: "6px 12px",
              borderRadius: "8px 12px 12px 0px",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontWeight: "bold",
            }}
          >
            <Star fontSize="small" style={{ color: "#FFD700" }} />
            <Typography fontSize="14px" fontWeight="bold">
              {productData.averageRating.toFixed(1)}
            </Typography>
            <Typography fontSize="12px" color="#ccc">
              ({productData.reviews.length})
            </Typography>
          </Box>
        )}
      </Box>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
        gap={1}
        mt={2}
      >
        <Typography
          fontSize={"clamp(0.875rem, 0.6579rem + 1.0526vw, 1.25rem)"}
          color={colors.textSecondary}
          textAlign={"center"}
        >
          {productData.name.length > 24 ? `${productData.name.substring(0, 20)}...` : productData.name}
        </Typography>
        <Typography color={colors.text}>₹{productData.finalPrice}</Typography>
        <motion.div whileTap={{ scale: 0.95 }} style={{ width: "100%" }}>
          <Button
            startIcon={<ShoppingCart />}
            onClick={handleAddToCart}
            sx={{
              backgroundColor: "#fff",
              border: `1px solid ${colors.textSecondary}`,
              color: colors.textSecondary,
              width: "100%",
              borderRadius: "12px",
              "&:hover": {
                border: `2px solid ${colors.textSecondary}`,
              },
            }}
          >
            Add To Cart
          </Button>
        </motion.div>
      </Box>
    </Box>
  );
};

export default ProductCard;
