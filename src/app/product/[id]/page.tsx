/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
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
import { useEffect, useState } from "react";
import axios from "axios";
const BASE_URL = process.env.BACKEND_BASE_URL

export default function ProductPage() {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState('');
  const [allColor, setAllColor] = useState([]);
  const [finalPrice, setFinalPrice] = useState(0)
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')
  const [specifications, setSpecifications] = useState({})
  const [currentImage, setCurrentImage] = useState<string>('');
  const [reviews, setReviews] = useState('');
  const [newReview, setNewReview] = useState({
    userName: "",
    rating: 0,
    comment: "",
  });


  const pathname = usePathname();
  const productId = pathname.split("/")[2];

  const fetchData = async () => {
    try {
      const [productsResponse] = await Promise.all([
        axios.get(`${BASE_URL}/v1/products/${productId}`),
      ]);
      setProduct(productsResponse.data);

      return productsResponse.data
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initializeData = async () => {
        const data = await fetchData();
        setSelectedColor(data.colors[0]);
        setCurrentImage(data.colors[0].images[0])
        setAllColor(data.colors);
        setFinalPrice(data.finalPrice);
        setPrice(data.price)
        setDescription(data.description)
        setSpecifications(data.specifications)
    }
    initializeData();
  }, []);

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

  const handleAddReview = () => {
    if (newReview.userName && newReview.rating && newReview.comment) {
      setReviews((prev) => [
        ...prev,
        { ...newReview, createdAt: new Date().toISOString() },
      ]);
      setNewReview({ userName: "", rating: 0, comment: "" });
    }
  };

  if (loading) {
    return <Box mt={8.5}>Loading...</Box>;
  }

  return (
    <Box mt={8.5} p={2} minHeight={"100vh"}>
      {product && (
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
                  {selectedColor?.images?.map((image, index) => (
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
                    {allColor?.map((color) => (
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
                  {product?.name}
                </Typography>
                <Typography variant="h5" color="text.secondary" mb={1}>
                  ₹{(finalPrice || 0)?.toFixed(2)}{" "}
                  <Typography
                    component="span"
                    sx={{
                      textDecoration: "line-through",
                      ml: 1,
                      color: "gray",
                    }}
                  >
                    ₹{(price || 0)?.toFixed(2)}
                  </Typography>
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={3}>
                  {description}
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                  Specifications:
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  Material: {specifications?.material}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  Fit: {product?.specifications?.fit}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  Care: {product?.specifications?.care}
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
                  {product?.averageRating}
                </Typography>
                <Box display="flex" gap={2} flexDirection="column">
                  {reviews &&
                    reviews?.map((review, index) => (
                      <Card key={index} sx={{ display: "flex", p: 2, gap: 2 }}>
                        <Avatar sx={{ width: 56, height: 56 }}>
                          {review?.userName.charAt(0)}
                        </Avatar>
                        <CardContent>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {review?.userName}
                          </Typography>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ display: "block", mb: 1 }}
                          >
                            Posted on {format(review?.createdAt)}
                          </Typography>
                          <Rating
                            value={review.rating}
                            readOnly
                            size="small"
                            icon={<StarIcon fontSize="inherit" />}
                          />
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            mt={1}
                          >
                            {review?.comment}
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
                      value={newReview?.rating}
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
                      value={newReview?.comment}
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
      )}
    </Box>
  );
}
