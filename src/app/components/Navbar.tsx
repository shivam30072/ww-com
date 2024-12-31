"use client";

import { LocationOnOutlined, Search } from "@mui/icons-material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Badge, Box, Container, Typography, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import LoginModal from "../modals/LoginModal";
import Cart from "./cart/Cart";
import { useAppSelector } from "@/lib/hooks";
import { colors } from "../constants";

type NavbarItemProps = {
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
};

type Product = {
  _id: string;
  name: string;
  matchingScore: number;
};

const NavbarItem = ({ icon: Icon, label, onClick }: NavbarItemProps) => (
  <Box
    display="flex"
    gap={1}
    alignItems="center"
    onClick={onClick}
    sx={{ cursor: "pointer" }}
  >
    <Icon />
  </Box>
);

const Navbar = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const router = useRouter();

  const [drawerState, setDrawerState] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSearchDropdownVisible, setSearchDropdownVisible] =
  useState<boolean>(false);

  const { products } = useAppSelector((state) => state.Cart);

  const handleLoginOpen = () => setLoginModalOpen(true);
  const handleModalClose = () => setLoginModalOpen(false);

  const handleCartClick = () => {
    if (isLoggedIn) {
      setDrawerState(true);
    } else {
      setLoginModalOpen(true);
    }
  };

  const handleSearch = async (input: string) => {
    setQuery(input);
    if (input.trim() === "") {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.BACKEND_BASE_URL}/v1/products/search/product?query=${input}`
      );
      setSearchResults(response.data);
      setSearchDropdownVisible(true);
    } catch (error) {
      console.error("Error fetching search results", error);
      setSearchDropdownVisible(false);
    } finally {
      setIsLoading(false);
    }
  };

  // const handleProductClick = (productId: string) => {
  //   router.push(`/product/${productId}`);
  // };

  const handleProductClick = (productId: string) => {
    setDrawerState(false);
    setSearchDropdownVisible(false);
    router.push(`/product/${productId}`);
  };

  const highlightMatch = (text: string, keyword: string) => {
    const regex = new RegExp(`(${keyword})`, "gi");
    return text.split(regex).map((part, index) =>
      regex.test(part) ? (
        <span key={index} style={{ fontWeight: "bold", color: colors.text }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const categories = [
    "Saree",
    "Suit",
    "Lehenga",
    "Gown",
    "Tops",
    "Bottoms",
    "Kurti",
    "Ethnic",
    "Casual",
    "Wedding",
  ];

  return (
    <Container>
      <Box display={"flex"} flexDirection={"column"} gap={2} bgcolor={colors.primary}>
        <Box>
          <Box
            sx={{
              py: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              width={{ xs: "40px", sm: "50px" }}
              onClick={() => router.push("/")}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/c4/WWE_official_logo.svg"
                alt="logo"
                width="100%"
              />
            </Box>

            <Box
              display={{ xs: "none", sm: "flex" }}
              gap={0.5}
              mx={2}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <LocationOnOutlined />
              <Typography fontSize={"12px"}>Update your Location</Typography>
            </Box>

            <Box position={"relative"} width={{ xs: "100%", sm: "60%" }} mx={0.5}>
              <Search sx={{ position: "absolute", top: "18%", left: "2%" }} />
              <input
                style={{
                  width: "100%",
                  padding: "12px 42px",
                  border: "none",
                  borderRadius: "4px",
                  outline: "none",
                  background: "#FBCEB1",
                }}
                type="text"
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search for products"
              />
              {isLoading && (
                <CircularProgress
                  size={20}
                  sx={{ position: "absolute", top: "50%", right: "10px", transform: "translateY(-50%)" }}
                />
              )}
              {isSearchDropdownVisible && searchResults.length > 0 && (
                <Box
                  position="absolute"
                  top="100%"
                  left="0"
                  width="100%"
                  bgcolor="#fff"
                  boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
                  zIndex={10}
                  borderRadius="4px"
                  mt={1}
                  p={1}
                >
                  {searchResults.map((product) => (
                    <Box
                      key={product._id}
                      px={2}
                      py={1}
                      onClick={() => handleProductClick(product._id)}
                      sx={{
                        cursor: "pointer",
                        "&:hover": { backgroundColor: colors.secondary },
                      }}
                    >
                      <Typography>
                        {highlightMatch(product.name, query)}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>

            <Box display={"flex"} px={{ xs: 0, sm: 2 }} gap={{ xs: 1, sm: 4 }}>
              <Badge badgeContent={products.length} color="error">
                <NavbarItem
                  icon={ShoppingCartOutlinedIcon}
                  label="Cart"
                  onClick={handleCartClick}
                />
              </Badge>
              <NavbarItem
                icon={AccountCircleOutlinedIcon}
                label="Login"
                onClick={handleLoginOpen}
              />
            </Box>
          </Box>

          <LoginModal open={isLoginModalOpen} onClose={handleModalClose} />
          <Cart drawerState={drawerState} setDrawerState={setDrawerState} />
        </Box>
        <Box
          pb={2}
          display={{ xs: "none", sm: "flex" }}
          justifyContent={"space-between"}
        >
          {categories.map((category) => (
            <Typography
              key={category}
              color={colors.textSecondary}
              fontSize={"18px"}
              fontWeight={"bold"}
              sx={{ cursor: "pointer", "&:hover": { color: colors.text } }}
            >
              {category}
            </Typography>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default Navbar;
