import { productTypes } from "@/app/types";
import { addToCart } from "@/lib/features/CartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { CurrencyRupee, ShoppingCart } from "@mui/icons-material";
import { Box, Typography, Button } from "@mui/material";
import { useState } from "react";

type productDataProp = {
  productData: productTypes;
};

const ProductCard = ({ productData }: productDataProp) => {
  const [hovered, setHovered] = useState(false);

  const { products } = useAppSelector((state) => state.Cart);
  const dispatch = useAppDispatch();

  const isInCart = products.some((product) => product.id === productData.id);

  const handleAddToCart = () => {
    if (!isInCart) {
      dispatch(addToCart(productData));
    }
  };

  return (
    <Box
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        position: "relative", // Ensure buttons are positioned relative to the card
        bgcolor: "#f4f4f4",
        minHeight: 400,
        width: "100%",
        overflow: "hidden",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.05)",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          top: "43%",
          left: 0,
          width: "100%",
          height: "30%",
          background:
            "linear-gradient(to top right, rgba(0, 0, 0, 0.5), transparent)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
          pointerEvents: "none",
          zIndex: 0,
        },
      }}
    >
      {/* Product Image */}
      <Box
        component="img"
        src={productData.images[0]}
        alt={productData.name}
        sx={{
          width: "100%",
          height: 300,
          objectFit: "cover",
        }}
      />

      {/* Buttons (Add to Cart & Buy Now) */}
      {hovered && (
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 1,
            alignItems: "center",
            zIndex: 2,
            p: 1,
            transform: hovered ? "translateY(-112%)" : "translateY(100%)",
            opacity: hovered ? 1 : 0,
            transition: "transform 0.5s ease, opacity 0.5s ease",
          }}
        >
          <Button
            endIcon={<ShoppingCart />}
            onClick={handleAddToCart}
            disabled={isInCart} // Disable button if already in cart
            sx={{
              width: "100%",
              textTransform: "none",
              bgcolor: isInCart ? "#ccc" : "#FF4433",
              color: "#fff",
              cursor: isInCart ? "not-allowed" : "pointer",
            }}
          >
            {isInCart ? "Added to Cart" : "Add to Cart"}
          </Button>
          <Button
            endIcon={<CurrencyRupee />}
            sx={{
              width: "100%",
              textTransform: "none",
              bgcolor: "none",
              color: "#fff",
              "&:hover": {
                border: "1px solid #fff",
              },
            }}
          >
            Buy Now
          </Button>
        </Box>
      )}

      {/* Product Details */}
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }} noWrap>
          {productData.name}
        </Typography>

        <Typography variant="body1" color="text.primary">
          ₹{productData.finalPrice}.00
        </Typography>

        {productData.discount && (
          <Typography variant="body2" color="error">
            {productData.discount}% off
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ProductCard;
