"use client";

import { LocationOnOutlined, Search } from "@mui/icons-material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Badge, Box, Container, Drawer, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoginModal from "../modals/LoginModal";
import Cart from "./cart/Cart";
import { useAppSelector } from "@/lib/hooks";
import { colors } from "../constants";

type NavbarItemProps = {
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
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
    {/* <Typography sx={{ display: { xs: "none", sm: "flex" } }} fontSize="12px">
      {label}
    </Typography> */}
  </Box>
);

const Navbar = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const router = useRouter();

  const [drawerState, setDrawerState] = useState<boolean>(false);

  const handleLoginOpen = () => setLoginModalOpen(true);
  const handleModalClose = () => setLoginModalOpen(false);

  const { products } = useAppSelector((state) => state.Cart);

  const handleCartClick = () => {
    if (isLoggedIn) {
      // router.push("/cart");
      setDrawerState(true);
    } else {
      setLoginModalOpen(true);
    }
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
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={2}
        bgcolor={colors.primary}
      >
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

            <Box
              position={"relative"}
              width={{ xs: "100%", sm: "60%" }}
              mx={0.5}
            >
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
                placeholder="Search for products"
              />
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
