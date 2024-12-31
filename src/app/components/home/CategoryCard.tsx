import { colors } from "@/app/constants";
import { categoryTypes, productTypes } from "@/app/types";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

type categoryDataProp = {
  categoryData: categoryTypes;
};

type productDataProp = {
  productList: productTypes[];

};

type CategoryCardProps = categoryDataProp & productDataProp;

const CategoryCard = ({ categoryData, productList }: CategoryCardProps) => {
  const router = useRouter();
  const handleCategoryClick = () => {
    localStorage.setItem(categoryData.id, JSON.stringify(productList))
    router.push(`/category/${categoryData.id}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
      onClick={handleCategoryClick}
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
          src={categoryData?.categoryImages[0]}
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
