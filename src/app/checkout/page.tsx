"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Add, Remove } from "@mui/icons-material";
import {
  addToCheckout,
  clearCheckout,
  removeFromCheckout,
} from "@/lib/features/CheckoutSlice";
import { useRouter } from "next/navigation";

export default function Checkout() {
  const { products, totSum } = useAppSelector((state) => state.Checkout);

  const [address, setAddress] = useState("");
  const [savedAddress, setSavedAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleConfirm = () => {
    console.log("Order confirmed", {
      products,
      address: savedAddress || address,
      paymentMethod,
    });
  };

  const handleCancel = () => {
    dispatch(clearCheckout());
    router.push("/");
  };

  return (
    <Container
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box mt={15} minHeight={"100vh"} p={2} bgcolor="#fff" flex={1} gap={4}>
        {/* Left Section: Checkout Form */}
        <Box>
          {/* Section 1: Product Details */}
          <Box mb={4}>
            <Typography variant="h6" mb={2}>
              Order Details
            </Typography>
            {products.map((product) => (
              <Box
                key={product.id}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography>{product.name}</Typography>
                <Box display="flex" alignItems="center">
                  <IconButton
                    onClick={() => dispatch(removeFromCheckout(product.id))}
                  >
                    <Remove />
                  </IconButton>
                  <Typography mx={1}>{product.quantity}</Typography>
                  <IconButton onClick={() => dispatch(addToCheckout(product))}>
                    <Add />
                  </IconButton>
                </Box>
                <Typography>${product.finalPrice.toFixed(2)}</Typography>
              </Box>
            ))}
          </Box>

          {/* Section 2: Shipping Address */}
          <Box mb={4}>
            <Typography variant="h6" mb={2}>
              Shipping Address
            </Typography>
            {savedAddress ? (
              <Typography>
                {savedAddress}{" "}
                <Button size="small" onClick={() => setSavedAddress("")}>
                  Edit
                </Button>
              </Typography>
            ) : (
              <TextField
                label="Enter Address"
                variant="outlined"
                fullWidth
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            )}
          </Box>

          {/* Section 3: Payment Options */}
          <Box mb={4}>
            <Typography variant="h6" mb={2}>
              Payment Options
            </Typography>
            <RadioGroup
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              row
            >
              <Box display="flex" alignItems="center" mr={2}>
                <Radio value="cash" />
                <Typography>Cash on Delivery</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Radio value="upi" />
                <Typography>UPI</Typography>
              </Box>
            </RadioGroup>
          </Box>

          {/* Section 4: Confirm and Cancel Buttons */}
          <Box display="flex" gap={2} width="100%">
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleConfirm}
            >
              Confirm
            </Button>
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
      <Box flex={1} display="flex" justifyContent="center" alignItems="center">
        <img
          src="/images/saree.jpg"
          alt="Checkout Illustration"
          style={{
            maxWidth: "100%",
            height: "500px",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        />
      </Box>
    </Container>
  );
}
