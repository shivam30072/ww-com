"use client";

import { ShoppingCart } from "@mui/icons-material";
import BoltIcon from "@mui/icons-material/Bolt";
import { Box, Button, Grid2 } from "@mui/material";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function ProductPage() {
  const pathname = usePathname();
  const productId = pathname.split("/")[2];
  const images = ["red", "pink", "green", "yellow", "blue"];

  const [currentImage, setCurrentImage] = useState<string>(images[0]);

  return (
    <Box mt={8.5} p={2} minHeight={"100vh"}>
      <Grid2 container spacing={2}>
        <Grid2
          size={{ xs: 12, sm: 6 }}
          sx={{
            display: "flex",
            flexDirection: { xs: "column-reverse", sm: "row" },
            gap: { xs: 0, sm: 3 },
          }}
        >
          <Box
            display={"flex"}
            flexDirection={{ xs: "row", sm: "column" }}
            gap={2}
          >
            {images.map((image) => (
              <Box
                onMouseEnter={() => setCurrentImage(image)}
                key={image}
                bgcolor={image}
                width={"60px"}
                height={"60px"}
              >
                {/* image will be here */}
              </Box>
            ))}
          </Box>
          <Box width={"100%"} height={"400px"}>
            <Box width={"100%"} height={"363px"} bgcolor={currentImage}>
              {/* image will be here */}
            </Box>
            <Box
              width={"100%"}
              display={"flex"}
              gap={2}
              py={2.5}
              mt={{ xs: 12, sm: 0 }}
            >
              <Button
                startIcon={<ShoppingCart />}
                sx={{
                  width: "50%",
                  borderRadius: 0,
                  backgroundColor: "#fd9600",
                  color: "#fff",
                  py: 2,
                }}
              >
                Add to Cart
              </Button>
              <Button
                startIcon={<BoltIcon />}
                sx={{
                  width: "50%",
                  borderRadius: 0,
                  backgroundColor: "#FF003F",
                  color: "#fff",
                }}
              >
                Buy Now
              </Button>
            </Box>
          </Box>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Box>product details</Box>
        </Grid2>
      </Grid2>
    </Box>
  );
}
