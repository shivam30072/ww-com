"use client";
import { ShoppingCart } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import BoltIcon from "@mui/icons-material/Bolt";
import StarIcon from "@mui/icons-material/Star";
import {
  Box,
  Button,
  Chip,
  Grid,
  Typography,
  Rating,
  Card,
  CardContent,
  Avatar,
  TextField,
  Container,
} from "@mui/material";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function ProductPage() {
  const pathname = usePathname();
  const productId = pathname.split("/")[2];
  console.log("productId:: ", productId);
  function format(dateString: string): string {
    const date = new Date(dateString);
    const options: { [key: string]: string } = {
      January: "January",
      February: "February",
      March: "March",
      April: "April",
      May: "May",
      June: "June",
      July: "July",
      August: "August",
      September: "September",
      October: "October",
      November: "November",
      December: "December",
    };

    const month = options[date.toLocaleString("en-US", { month: "long" })];
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
  }
  const product = {
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
          "https://i.pinimg.com/736x/53/80/a8/5380a8f346f7038718f2bf6c22507225.jpg",
          "https://i.pinimg.com/736x/92/76/fb/9276fbe2871f6d5e7c251bf6e7028a24.jpg",
          "https://i.pinimg.com/736x/53/80/a8/5380a8f346f7038718f2bf6c22507225.jpg",
          "https://i.pinimg.com/736x/92/76/fb/9276fbe2871f6d5e7c251bf6e7028a24.jpg",
          "https://i.pinimg.com/736x/53/80/a8/5380a8f346f7038718f2bf6c22507225.jpg",
          "https://i.pinimg.com/736x/92/76/fb/9276fbe2871f6d5e7c251bf6e7028a24.jpg",
          "https://i.pinimg.com/736x/53/80/a8/5380a8f346f7038718f2bf6c22507225.jpg",
          "https://i.pinimg.com/736x/92/76/fb/9276fbe2871f6d5e7c251bf6e7028a24.jpg",
        ],
        colorName: "Green",
      },
    ],
    reviews: [
      {
        userName: "John Doe",
        rating: 4,
        comment:
          "Great product! Very satisfied with the quality and performance.",
        createdAt: "2024-12-16T03:26:16.276Z",
      },
      {
        userName: "Jane Smith",
        rating: 3,
        comment: "Cloth is too good.",
        createdAt: "2024-12-16T03:28:43.241Z",
      },
    ],
    id: "672f2c1f0eaa8064881f3e0b",
  };

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [currentImage, setCurrentImage] = useState<string>(
    product.colors[0].images[0]
  );
  const [reviews, setReviews] = useState(product.reviews);
  const [newReview, setNewReview] = useState({
    userName: "",
    rating: 0,
    comment: "",
  });

  const handleAddReview = () => {
    if (newReview.userName && newReview.rating && newReview.comment) {
      setReviews((prev) => [
        ...prev,
        { ...newReview, createdAt: new Date().toISOString() },
      ]);
      setNewReview({ userName: "", rating: 0, comment: "" });
    }
  };

  return (
    <Box mt={8.5} p={2} minHeight={"100vh"}>
      <Container>
        <Grid container spacing={4}>
          {/* Image Section */}
          <Grid item xs={12} sm={6}>
            <Box display={"flex"} flexDirection="column" gap={3}>
              <Box
                width={"100%"}
                height={"550px"}
                sx={{
                  backgroundImage: `url(${currentImage})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  borderRadius: "8px",
                }}
              />
              <Box
                display={"flex"}
                gap={1}
                mt={2}
                overflow={"auto"}
                width={"100%"}
              >
                {selectedColor.images.map((image, index) => (
                  <Box
                    key={index}
                    onMouseEnter={() => setCurrentImage(image)}
                    sx={{
                      backgroundImage: `url(${image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      cursor: "pointer",
                      flexShrink: 0,
                    }}
                    width={"90px"}
                    height={"90px"}
                    borderRadius={"8px"}
                    border={"1px solid #ddd"}
                  />
                ))}
              </Box>

              {/* Color Picker */}
              {/* <Box mt={3}>
              <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                Choose Color:
              </Typography>
              <Box display="flex" gap={1}>
                {product.colors.map((color) => (
                  <Chip
                    key={color.colorName}
                    label={color.colorName}
                    onClick={() => {
                      setSelectedColor(color);
                      setCurrentImage(color.images[0]);
                    }}
                    sx={{
                      backgroundColor: color.colorName,
                      color: "#fff",
                      cursor: "pointer",
                      border:
                        selectedColor.colorName === color.colorName
                          ? "2px solid black"
                          : "none",
                    }}
                  />
                ))}
              </Box>
            </Box> */}
              <Box mt={3}>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  mb={1}
                  sx={{ fontSize: "1.2rem", color: "#333" }}
                >
                  Choose Color:
                </Typography>
                <Box
                  display="flex"
                  gap={2}
                  flexWrap="wrap"
                  alignItems="center"
                  sx={{ mt: 1 }}
                >
                  {product.colors.map((color) => (
                    <Tooltip
                      key={color.colorName}
                      title={color.colorName}
                      arrow
                    >
                      <Chip
                        label=""
                        onClick={() => {
                          setSelectedColor(color);
                          setCurrentImage(color.images[0]);
                        }}
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          backgroundColor: color.colorName,
                          color: "#fff",
                          cursor: "pointer",
                          boxShadow:
                            selectedColor.colorName === color.colorName
                              ? "0px 4px 10px rgba(0, 0, 0, 0.4)"
                              : "0px 2px 5px rgba(0, 0, 0, 0.2)",
                          border:
                            selectedColor.colorName === color.colorName
                              ? "3px solid black"
                              : "1px solid #ddd",
                          transition:
                            "transform 0.3s ease, box-shadow 0.3s ease",
                          "&:hover": {
                            transform: "scale(1.1)",
                            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.5)",
                          },
                        }}
                      />
                    </Tooltip>
                  ))}
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Product Details Section */}
          <Grid item xs={12} sm={6}>
            <Box>
              <Typography variant="h4" fontWeight="bold" mb={2}>
                {product.name}
              </Typography>
              <Typography variant="h5" color="text.secondary" mb={1}>
                ₹{product.finalPrice.toFixed(2)}{" "}
                <Typography
                  component="span"
                  sx={{ textDecoration: "line-through", ml: 1, color: "gray" }}
                >
                  ₹{product.price.toFixed(2)}
                </Typography>
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={3}>
                {product.description}
              </Typography>
              <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                Specifications:
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Material: {product.specifications.material}
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Fit: {product.specifications.fit}
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Care: {product.specifications.care}
              </Typography>

              <Box display="flex" gap={2} mt={4}>
                <Button
                  variant="contained"
                  startIcon={<ShoppingCart />}
                  sx={{
                    backgroundColor: "#ff5722",

                    "&:hover": { backgroundColor: "#e64a19" },
                  }}
                >
                  Add to Cart
                </Button>

                <Button
                  variant="contained"
                  startIcon={<BoltIcon />}
                  sx={{
                    backgroundColor: "#ff9800",

                    "&:hover": { backgroundColor: "#f57c00" },
                  }}
                >
                  Buy Now
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* Reviews Section */}
          <Grid item xs={12}>
            <Box mt={5}>
              <Typography variant="h5" fontWeight="bold" mb={2}>
                Reviews ({reviews.length}) - Average Rating:{" "}
                {product.averageRating}
              </Typography>
              <Box display="flex" gap={2} flexDirection="column">
                {reviews.map((review, index) => (
                  <Card key={index} sx={{ display: "flex", p: 2, gap: 2 }}>
                    <Avatar sx={{ width: 56, height: 56 }}>
                      {review.userName.charAt(0)}
                    </Avatar>
                    <CardContent>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {review.userName}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: "block", mb: 1 }}
                      >
                        Posted on {format(review.createdAt)}
                      </Typography>
                      <Rating
                        value={review.rating}
                        readOnly
                        size="small"
                        icon={<StarIcon fontSize="inherit" />}
                      />
                      <Typography variant="body2" color="text.secondary" mt={1}>
                        {review.comment}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>

              {/* Write a Review Section */}
              <Box mt={5}>
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Write a Review
                </Typography>
                <Box display="flex" flexDirection="column" gap={2}>
                  {/* <TextField
                  label="Your Name"
                  variant="outlined"
                  fullWidth
                  value={newReview.userName}
                  onChange={(e) =>
                    setNewReview({ ...newReview, userName: e.target.value })
                  }
                /> */}
                  <Rating
                    value={newReview.rating}
                    onChange={(e, newValue) =>
                      setNewReview({ ...newReview, rating: newValue || 0 })
                    }
                  />
                  <TextField
                    label="Your Review"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    value={newReview.comment}
                    onChange={(e) =>
                      setNewReview({ ...newReview, comment: e.target.value })
                    }
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddReview}
                  >
                    Submit Review
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
