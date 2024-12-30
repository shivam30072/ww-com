import { Box, Dialog, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { motion } from "framer-motion";
import { colors } from "../constants";

type loginPropTypes = {
  open: boolean;
  onClose: () => void;
};

const LoginModal = ({ open, onClose }: loginPropTypes) => {
  const [mobile, setMobile] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setMobile(value);
    }
  };

  const handleClose = () => {
    setMobile("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md">
      <Box display={"flex"} position="relative" overflow="hidden">
        {/* Cross Icon */}
        <IconButton
          onClick={handleClose}
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 1,
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Left Part */}
        <Box display={"flex"} flex={1}>
          <img
            src="/images/saree.jpg"
            alt="Saree"
            width={"100%"}
            height={"100%"}
            style={{ objectFit: "cover" }}
          />
        </Box>

        {/* Right Part */}
        <Box
          display={"flex"}
          flex={1}
          flexDirection={"column"}
          pl={2}
          justifyContent={"center"}
          alignItems={"center"}
          gap={2}
          overflow="hidden"
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"flex-start"}
            alignItems={"flex-start"}
          >
            <Box my={2}>
              <Typography
                fontWeight={"bold"}
                fontSize={"clamp(0.875rem, 0.2237rem + 3.1579vw, 2rem)"}
                style={{ color: colors.textSecondary }}
              >
                Your Mobile Number!
              </Typography>
            </Box>

            <Box my={2}>
              <input
                type="text"
                placeholder="Enter Mobile Number"
                value={mobile}
                onChange={handleInputChange}
                style={{
                  padding: "16px",
                  fontSize: "16px",
                  width: "90%",
                  borderRadius: "8px",
                  border: `2px solid ${colors.primary}`,
                  outline: "none",
                }}
              />
            </Box>

            {/* Submit Button with Animation */}
            <Box my={2}>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: colors.text,
                }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  backgroundColor: colors.secondary,
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Submit
              </motion.button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default LoginModal;
