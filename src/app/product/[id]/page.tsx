/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";
import { Close, ShoppingCart } from "@mui/icons-material";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
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
  styled,
  Dialog,
} from "@mui/material";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../page.module.css";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { body } from "framer-motion/client";
import ProductCard from "@/app/components/home/ProductCard";
import { colors } from "@/app/constants";
const BASE_URL = process.env.BACKEND_BASE_URL;
const USER_ID = process.env.USER_ID;

const ImageModal = ({ open, handleClose, image }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <img src={image} alt="Product Image" style={{ width: "100%" }} />
      <Box
        position={"absolute"}
        top={0}
        right={0}
        m={1}
        p={0.5}
        onClick={handleClose}
      >
        <Close />
      </Box>
    </Dialog>
  );
};

export default function ProductPage() {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState("");
  const [allColor, setAllColor] = useState([]);
  const [finalPrice, setFinalPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [specifications, setSpecifications] = useState({});
  const [currentImage, setCurrentImage] = useState<string>("");
  const [openImageModal, setOpenImageModal] = useState(false);

  const handleOpenImageModal = () => {
    setOpenImageModal(true);
  };

  const handleCloseImageModal = () => {
    setOpenImageModal(false);
  };

  const [categoryId, setCategoryId] = useState("");
  const [newReview, setNewReview] = useState({
    userName: "",
    rating: 0,
    comment: "",
  });
  const discountPercentage = ((product.discount / product.price) * 100).toFixed(
    2
  );

  const PriceContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column-reverse",
      alignItems: "flex-start",
    },
  }));

  const PriceWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    paddingRight: "20px",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column-reverse",
      alignItems: "flex-start",
      paddingRight: "0",
    },
  }));

  const PriceList = styled("ul")(({ theme }) => ({
    listStyle: "none",
    margin: "10px 0 0",
    padding: "0",
    fontSize: "24px",
    color: "#000",
    [theme.breakpoints.down("sm")]: {
      fontSize: "19px",
      textAlign: "left",
    },
  }));

  const PriceItem = styled("li")(({ }) => ({
    display: "inline-block",
    marginRight: "10px",
    fontWeight: 500,
    "&.current-price": {
      fontWeight: 800,
      fontSize: "24px",
      lineHeight: "111%",
    },
    "&.list-price": {
      textDecoration: "line-through",
      color: "#787878",
    },
  }));

  const PercentageOff = styled(Box)(({ }) => ({
    fontSize: "14px",
    color: "red",
    paddingLeft: "5px",
    fontWeight: 600,
  }));

  const Decimals = styled("span")({
    fontSize: "70%",
    lineHeight: "normal",
    position: "relative",
  });

  const pathname = usePathname();
  const productId = pathname.split("/")[2];

  const fetchRelatedProducts = async () => {
    try {
      if (!categoryId) return [];
      const [relatedProduct] = await Promise.all([
        axios.get(
          `${BASE_URL}/v1/products?limit=30&page=1&category=${categoryId}`
        ),
      ]);

      const relatedProductWithoutCurrentProduct =
        relatedProduct.data.results.filter(
          (product) => product.id != productId
        );

      setRelatedProduct(relatedProductWithoutCurrentProduct);

      return relatedProductWithoutCurrentProduct;
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      const [productsResponse] = await Promise.all([
        axios.get(`${BASE_URL}/v1/products/${productId}`),
      ]);
      setProduct(productsResponse.data);
      setCategoryId(productsResponse?.data?.category?.id);

      return productsResponse.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const addReview = async (reviewData) => {
    try {
      const token = await getValidToken();
      const response = await axios.post(
        `${BASE_URL}/v1/reviews/${productId}`,
        reviewData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Review submitted successfully:", response.data);
    } catch (error) {
      console.error(
        "Error submitting review:",
        error.response?.status,
        error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const getValidToken = async () => {
    // if (!token || isTokenExpired(token)) {
    //   const refreshedToken = await fetchToken();
    //   setToken(refreshedToken);
    //   return refreshedToken;
    // }
    // return token;
    const token = localStorage.getItem("jwttoken");
    return token;
  };

  useEffect(() => {
    const initializeData = async () => {
      const data = await fetchData();
      setSelectedColor(data?.colors[0]);
      setCurrentImage(data?.colors[0].images[0]);
      setAllColor(data?.colors);
      setFinalPrice(data?.finalPrice);
      setPrice(data?.price);
      setDescription(data?.description);
      setSpecifications(data?.specifications);
    };
    initializeData();
  }, []);

  useEffect(() => {
    fetchRelatedProducts();
  }, [categoryId]);

  const isMobile = true;

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
    const newComment = newReview.comment;
    const newrating = newReview.rating;

    const newReviewAdd = {
      comment: newComment,
      rating: newrating,
      userId: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user") || "{}").id
        : USER_ID,
    };

    addReview(newReviewAdd);
  };

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.loaderBox}>
          <div className={styles.loaderFill}></div>
          <span className={styles.loaderText}>SIYA</span>
        </div>
      </div>
    );
  }

  return (
    <Box mt={{ xs: 8.5, sm: 17 }} p={2} minHeight={"100vh"}>
      {product && (
        <Container>
          <Grid container spacing={4}>
            {/* Image Section */}
            <Grid item xs={12} sm={6}>
              <Box
                position={"relative"}
                display={"flex"}
                flexDirection="column"
                gap={3}
              >
                <Box
                  width={"100%"}
                  height={"400px"}
                  sx={{
                    backgroundImage: `url(${currentImage})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    borderRadius: "8px",
                  }}
                />
                <Box
                  onClick={handleOpenImageModal}
                  position={"absolute"}
                  top={0}
                  right={0}
                  zIndex={100}
                  m={1}
                  p={0.5}
                  sx={{
                    cursor: "pointer",
                    transition: "all 0.3s ease-in-out",
                    backgroundColor: "#fff",
                  }}
                >
                  <OpenInFullIcon />
                </Box>
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
                <Box display={{ xs: "block", sm: "none" }}>
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
                        <Box
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

                            border:
                              selectedColor.colorName === color.colorName &&
                              "2px solid #000",
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
                <Box
                  className="product-title-loox-wrapper"
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    marginBottom: 0,
                  }}
                >
                  <Typography
                    variant="h5"
                    component="h1"
                    sx={{
                      fontWeight: 300,
                      flex: 1,
                      fontFamily: "Avenir Next, sans-serif",
                      fontSize: "1.5rem",
                    }}
                    className="product-item-caption-title"
                  >
                    {product.name}
                  </Typography>

                  {product?.reviews?.length > 0 && (
                    <Box
                      className="cust-loox-rating"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        minWidth: "100px",
                        justifyContent: "flex-end",
                        marginLeft: "10px",
                      }}
                    >
                      <Box
                        component="span"
                        className="review-rating"
                        sx={{
                          background: "#679f37",
                          color: "#fff",
                          padding: "5px 8px",
                          display: "flex",
                          alignItems: "center",
                          fontWeight: 400,
                          fontSize: "13px",
                          lineHeight: 1,
                          borderRadius: "35px",
                        }}
                      >
                        <Typography
                          variant="body2"
                          component="span"
                          sx={{
                            marginRight: "4px",
                            lineHeight: 1,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {product.averageRating}
                        </Typography>
                        <StarIcon fontSize="small" />
                      </Box>
                      <Typography
                        variant="body2"
                        className="review-count"
                        sx={{
                          fontSize: "13px",
                          color: "#787878",
                          marginLeft: "10px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        ({product?.reviews?.length})
                      </Typography>
                    </Box>

                  )}


                </Box>
                <PriceContainer className="pdp-price-index">
                  <PriceWrapper className="pdp-price-wrapper">
                    <PriceList className="product-item-caption-price">
                      <PriceItem
                        id="ProductPrice-product-template"
                        className="current-price"
                      >
                        <Typography
                          component="span"
                          className="money price__current"
                        >
                          <Typography
                            component="span"
                            className="money product__price"
                            sx={{
                              display: "inline-flex",
                              alignItems: "flex-start",
                              lineHeight: "normal",
                            }}
                          >
                            ₹ {finalPrice?.toFixed(2)}
                            {/* <Decimals className="decimals">.00</Decimals> */}
                          </Typography>
                        </Typography>
                      </PriceItem>
                      <PriceItem
                        id="ComparePrice-product-template"
                        className="list-price"
                      >
                        <Typography component="span" className="mrp">
                          MRP
                        </Typography>
                        <Typography
                          component="span"
                          className="bold-compare-at-money"
                          sx={{ textDecoration: "none" }}
                        >
                          ₹ {price?.toFixed(2)}
                          {/* <Decimals className="decimals">.00</Decimals> */}
                        </Typography>
                      </PriceItem>
                      <PriceItem>
                        <PercentageOff className="percentage_off">
                          {discountPercentage}%
                          <Typography component="span">OFF</Typography>
                        </PercentageOff>
                      </PriceItem>
                    </PriceList>
                  </PriceWrapper>
                </PriceContainer>

                <Typography variant="body2" color="text.secondary" mb={3}>
                  {description}
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                  Specifications:
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={1.5}>
                  Material: {specifications?.material}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={1.5}>
                  Fit: {product?.specifications?.fit}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={1.5}>
                  Care: {product?.specifications?.care}
                </Typography>

                <Box display={{ xs: "none", sm: "block" }}>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{ fontSize: "1rem", color: "#000" }}
                  >
                    Choose Color:
                  </Typography>
                  <Box
                    display="flex"
                    gap={1}
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
                        <Box
                          label=""
                          onClick={() => {
                            setSelectedColor(color);
                            setCurrentImage(color.images[0]);
                          }}
                          sx={{
                            width: 30,
                            height: 30,
                            borderRadius: "50%",
                            backgroundColor: color.colorName,
                            color: "#fff",
                            cursor: "pointer",

                            border:
                              selectedColor.colorName === color.colorName &&
                              "2px solid #000",
                          }}
                        />
                      </Tooltip>
                    ))}
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: { xs: "none", sm: "flex" },
                    gap: 2,
                    justifyContent: "center",
                    alignItems: "center",
                    mt: 3,
                  }}
                >
                  <Button
                    variant="contained"
                    startIcon={<ShoppingCart />}
                    sx={{
                      flex: 1,
                      height: "60px",
                      backgroundColor: colors.textSecondary,
                      color: "#ffffff",
                      fontSize: "16px",
                      fontWeight: "bold",
                      borderRadius: "0px",
                      textTransform: "none",
                      transition:
                        "background-color 0.3s ease, transform 0.2s ease",
                      "&:hover": {
                        backgroundColor: colors.textSecondary,
                        transform: "scale(1.02)",
                      },
                      "&:active": {
                        transform: "scale(0.98)",
                      },
                    }}
                  >
                    ADD TO CART
                  </Button>

                  <Button
                    variant="contained"
                    startIcon={<BoltIcon />}
                    sx={{
                      flex: 1,
                      height: "60px",
                      backgroundColor: colors.text,
                      color: "#ffffff",
                      fontSize: "16px",
                      fontWeight: "bold",
                      borderRadius: "0px",
                      textTransform: "none",
                      transition:
                        "background-color 0.3s ease, transform 0.2s ease",
                      "&:hover": {
                        backgroundColor: colors.secondary,
                        transform: "scale(1.02)",
                      },
                      "&:active": {
                        transform: "scale(0.98)",
                      },
                    }}
                  >
                    BUY NOW
                  </Button>
                </Box>
                <Box
                  sx={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    display: { xs: "flex", sm: "none" },
                    justifyContent: "center",
                    backgroundColor: "#ffffff",
                    boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)",
                    zIndex: 1000,
                  }}
                >
                  <Button
                    variant="contained"
                    startIcon={<ShoppingCart />}
                    sx={{
                      flex: 1,
                      height: "60px",
                      backgroundColor: colors.textSecondary,
                      color: "#ffffff",
                      fontSize: "16px",
                      fontWeight: "bold",
                      borderRadius: "0px",
                      textTransform: "none",
                      transition:
                        "background-color 0.3s ease, transform 0.2s ease",
                      "&:hover": {
                        backgroundColor: colors.textSecondary,
                        transform: "scale(1.02)",
                      },
                      "&:active": {
                        transform: "scale(0.98)",
                      },
                    }}
                  >
                    Add to Cart
                  </Button>

                  <Button
                    variant="contained"
                    startIcon={<BoltIcon />}
                    sx={{
                      flex: 1,
                      height: "60px",
                      backgroundColor: colors.text,
                      color: "#ffffff",
                      fontSize: "16px",
                      fontWeight: "bold",
                      borderRadius: "0px",
                      textTransform: "none",
                      transition:
                        "background-color 0.3s ease, transform 0.2s ease",
                      "&:hover": {
                        backgroundColor: colors.secondary,
                        transform: "scale(1.02)",
                      },
                      "&:active": {
                        transform: "scale(0.98)",
                      },
                    }}
                  >
                    Buy Now
                  </Button>
                </Box>
              </Box>
            </Grid>

            {/* Related Products Section */}
            {categoryId && (
              <Grid item xs={12} sm={12}>
                <Box
                  mt={4}
                  sx={{
                    pb: 4,
                    overflowX: "hidden",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      textAlign: "left",
                      fontWeight: "bold",
                      fontSize: isMobile ? "1.5rem" : "2rem",
                      mb: 4,
                    }}
                  >
                    You will also Love
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      position: "relative",
                      gap: isMobile ? 2 : 4,
                      overflowX: "auto",
                      scrollBehavior: "smooth",
                      px: isMobile ? 0 : 2,
                      scrollbarWidth: "none",
                      "&::-webkit-scrollbar": { display: "none" },
                    }}
                  >
                    {relatedProduct?.map((product) => (
                      <Box
                        key={product.id}
                        sx={{
                          flexShrink: 0,
                          width: isMobile ? "85%" : "300px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          transition: "transform 0.5s ease, opacity 0.5s ease",
                        }}
                      >
                        <ProductCard productData={product} />
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Grid>
            )}

            {/* Reviews Section */}
            <Grid item xs={12}>
              <Box mt={5}>
                <Typography variant="h5" fontWeight="bold" mb={2}>
                  Reviews
                </Typography>
                <Box display="flex" gap={2} flexDirection="column">
                  {product.reviews?.map((review, index) => (
                    <Card key={index} sx={{ display: "flex", p: 2, gap: 2 }}>
                      <Avatar sx={{ width: 56, height: 56 }}>
                        {review?.userId?.name.charAt(0)}
                      </Avatar>
                      <CardContent>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {review?.userId?.name}
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
                      sx={{ marginBottom: "3rem" }}
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
      <ImageModal
        open={openImageModal}
        handleClose={handleCloseImageModal}
        image={currentImage}
      />
    </Box>
  );
}
