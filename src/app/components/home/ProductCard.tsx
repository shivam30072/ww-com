import { productTypes } from "@/app/types";
import { Box, Typography } from "@mui/material";

type productDataProp = {
  productData: productTypes;
};

const ProductCard = ({ productData }: productDataProp) => {
  return (
    <Box
      sx={{
        bgcolor: "#f4f4f4",
        minHeight: 400,
        width: "100%",
        overflow: "hidden",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.05)",
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
