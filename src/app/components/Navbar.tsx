"use client";

import { LocationOnOutlined, Search } from "@mui/icons-material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Box, Container, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoginModal from "../modals/LoginModal";

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
    <Typography sx={{ display: { xs: "none", sm: "flex" } }} fontSize="12px">
      {label}
    </Typography>
  </Box>
);

const Navbar = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const router = useRouter();

  const handleLoginOpen = () => setLoginModalOpen(true);
  const handleModalClose = () => setLoginModalOpen(false);

  const handleCartClick = () => {
    if (isLoggedIn) {
      router.push("/cart");
    } else {
      setLoginModalOpen(true);
    }
  };

  return (
    <Container>
      <Box
        sx={{
          py: 1,
          bgcolor: "#fff",
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
              background: "#f0f5ff",
            }}
            type="text"
            placeholder="Search For Products"
          />
        </Box>

        <Box display={"flex"} px={{ xs: 0, sm: 2 }} gap={{ xs: 1, sm: 4 }}>
          <NavbarItem
            icon={ShoppingCartOutlinedIcon}
            label="Cart"
            onClick={handleCartClick}
          />
          <NavbarItem
            icon={AccountCircleOutlinedIcon}
            label="Login"
            onClick={handleLoginOpen}
          />
        </Box>
      </Box>

      <LoginModal open={isLoginModalOpen} onClose={handleModalClose} />
    </Container>
  );
};

export default Navbar;
