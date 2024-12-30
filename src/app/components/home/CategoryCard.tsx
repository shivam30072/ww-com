import { colors } from "@/app/constants";
import { categoryTypes } from "@/app/types";
import { Box, Typography } from "@mui/material";

type categoryDataProp = {
  categoryData: categoryTypes;
};

const CategoryCard = ({ categoryData }: categoryDataProp) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      {/* Circle Icon */}
      <Box
        sx={{
          width: { xs: 90, sm: 200 },
          height: { xs: 90, sm: 200 },
          borderRadius: "50%",
          backgroundColor: "#f5f5f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: 2,
          border: "1px solid #daa520",
        }}
      >
        {/* Placeholder for Icon/Image */}
        <img
          width={"100%"}
          height={"100%"}
          src={categoryData.image}
          alt={categoryData.name}
          style={{ borderRadius: "50%", objectFit: "cover" }}
        />
      </Box>

      {/* Category Name */}
      <Typography
        variant="body1"
        sx={{
          marginTop: 4,
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "0.9rem",
          color: colors.text,
        }}
      >
        {categoryData.name}
      </Typography>
    </Box>
  );
};

export default CategoryCard;
