"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Modal,
  Fade,
  styled,
} from "@mui/material";
import { colors } from "@/app/constants";
import { motion } from 'framer-motion'; // For animations
import { AccessTime as TimeIcon, ShoppingCart as CartIcon } from '@mui/icons-material';
// import { styled } from "@mui/system";

interface User {
  name: string;
  role: string;
  mobile: string;
}

interface Order {
  _id: string;
  createdAt: string;
  totalAmount: number;
}

interface Address {
  id: string;
  addressLine1: string;
  city: string;
  state: string;
  isPrimaryAddress: boolean;
}

const StyledCard = styled(Card)({
  transition: "transform 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  },
  borderRadius: "10px",
});

const HeaderText = styled(Typography)({
  fontFamily: "Poppins, sans-serif",
  fontWeight: 600,
  color: "#333",
});

const SubHeaderText = styled(Typography)({
  fontFamily: "Roboto, sans-serif",
  color: "#777",
});

const PrimaryButton = styled(Button)({
  backgroundColor: "#FF5722",
  color: "#fff",
  borderRadius: "12px",
  padding: "10px 20px",
  "&:hover": {
    backgroundColor: "#e64a19",
  },
});

export default function UserDetails() {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [newAddress, setNewAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const router = useRouter();

  const baseUrl = process.env.BACKEND_BASE_URL;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("jwttoken") : null;

  const handleUnauthorized = () => {
    console.error("Session expired or invalid token. Redirecting to login...");
    localStorage.removeItem("user");
    localStorage.removeItem("jwttoken");
    // router.push("/login");
  };

  useEffect(() => {
    const loggedInUser =
      typeof window !== "undefined" ? localStorage.getItem("user") : null;
    if (!loggedInUser) {
      router.push("/login");
    } else {
      setUser(JSON.parse(loggedInUser));
    }
  }, [router]);

  useEffect(() => {
    if (token) {
      axios
        .get<Order[]>(`${baseUrl}/v1/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setOrders(res.data))
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            handleUnauthorized();
          } else {
            console.error(err);
          }
        });
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      refreshAddresses();
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("jwttoken");
    router.push("/");
  };

  const handleAddAddress = () => {
    const updatedAddress = { ...newAddress, user: "" };
    const { addressLine1, city, state, postalCode, country } = updatedAddress;
    // const user = JSON.parse(localStorage.getItem("user")).id;
    // newAddress.user = user;
    // /v1/addresses/:addressId
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser)?.id;
      if (user) {
        updatedAddress.user = user;
      } else {
        console.error("User ID not found in stored user data.");
      }
    } else {
      console.error("No user data found in localStorage.");
    }

    if (
      addressLine1.trim() &&
      city.trim() &&
      state.trim() &&
      postalCode.trim() &&
      country.trim()
    ) {
      setLoading(true);
      axios
        .post(`${baseUrl}/v1/addresses`, updatedAddress, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          setNewAddress({
            addressLine1: "",
            addressLine2: "",
            city: "",
            state: "",
            postalCode: "",
            country: "",
          });
          refreshAddresses();
        })
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            handleUnauthorized(); // Handle 401 Unauthorized error
          } else {
            console.error(err);
          }
        })
        .finally(() => setLoading(false));
    } else {
      console.error("Please fill all required fields");
    }
  };

  const handleSetPrimary = (id: string) => {
    axios
      .patch(
        `${baseUrl}/v1/addresses/${id}`,
        { isPrimaryAddress: true },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => refreshAddresses())
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          handleUnauthorized(); // Handle 401 Unauthorized error
        } else {
          console.error(err);
        }
      });
  };

  const handleEditAddress = () => {
    if (editingAddress?.addressLine1.trim()) {
      axios
        .patch(`${baseUrl}/v1/addresses/${editingAddress.id}`, editingAddress, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          setEditModalOpen(false);
          refreshAddresses();
        })
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            handleUnauthorized(); // Handle 401 Unauthorized error
          } else {
            console.error(err);
          }
        });
    }
  };

  const refreshAddresses = () => {
    axios
      .get<{ results: Address[] }>(`${baseUrl}/v1/addresses`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setAddresses(res.data.results))
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          handleUnauthorized(); // Handle 401 Unauthorized error
        } else {
          console.error(err);
        }
      });
  };

  return (
    <Box sx={{ p: 4, fontFamily: "Roboto, sans-serif" }}>
      {user && (
        <>
          <Box sx={{ mb: 4 }}>
            <HeaderText variant="h4" style={{ marginTop: "2rem" }}>
              Welcome, {user.name}
            </HeaderText>
            <SubHeaderText variant="subtitle1">Role: {user.role}</SubHeaderText>
            <SubHeaderText variant="subtitle1">
              Mobile: {user.mobile}
            </SubHeaderText>
            <PrimaryButton
              variant="contained"
              onClick={handleLogout}
              sx={{ mt: 2 }}
            >
              Logout
            </PrimaryButton>
          </Box>

          {/* Orders Section */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom >
              Your Orders
            </Typography>

            {orders.length > 0 ? (
              <Grid container spacing={2}>
                {orders.map((order) => (
                  <Grid item xs={12} sm={6} md={4} key={order._id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <StyledCard
                        sx={{
                          boxShadow: 3,
                          '&:hover': {
                            transform: 'scale(1.05)',
                            transition: 'transform 0.3s ease-in-out',
                            boxShadow: 6,
                          },
                        }}
                      >
                        <CardContent>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main', fontSize: '1rem' }}>
                              {order?.id}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <CartIcon sx={{ color: 'secondary.main', mr: 1 }} />
                              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {order.products.length} items
                              </Typography>
                            </Box>
                          </Box>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            Date: {new Date(order.orderHistory[0].updatedAt).toLocaleDateString()}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            Total: ₹{order.totalAmount.toFixed(2)}
                          </Typography>

                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button
                              variant="outlined"
                              color="primary"
                              size="small"
                              startIcon={<TimeIcon />}
                              sx={{ width: '48%' }}
                            >
                              {order?.status}
                            </Button>
                            <Button
                              variant="contained"
                              color="error"
                              size="small"
                              sx={{ width: '48%' }}
                              disabled
                            >
                              Cancel Order
                            </Button>
                          </Box>
                        </CardContent>
                      </StyledCard>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography variant="body1" sx={{ textAlign: 'center', mt: 3 }}>
                No orders found.
              </Typography>
            )}
          </Box>

          {/* Addresses Section */}
          <Box>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Your Addresses
            </Typography>
            <Grid container spacing={2}>
              {addresses.map((address) => (
                <Grid item xs={12} sm={6} md={4} key={address.id}>
                  <StyledCard>
                    <CardContent>
                      <Typography>{address.addressLine1}</Typography>
                      <Typography>
                        {address.city}, {address.state}
                      </Typography>
                      {address.isPrimaryAddress ? (
                        <Typography color="primary">Primary Address</Typography>
                      ) : (
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleSetPrimary(address.id)}
                        >
                          Set as Primary
                        </Button>
                      )}
                      <Button
                        variant="text"
                        color="secondary"
                        size="small"
                        onClick={() => {
                          setEditingAddress(address);
                          setEditModalOpen(true);
                        }}
                      >
                        Edit
                      </Button>
                    </CardContent>
                  </StyledCard>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" fontWeight="bold">
                Add New Address
              </Typography>
              <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address Line 1"
                    value={newAddress.addressLine1 || ""}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        addressLine1: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address Line 2"
                    value={newAddress.addressLine2 || ""}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        addressLine2: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="City"
                    value={newAddress.city || ""}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, city: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="State"
                    value={newAddress.state || ""}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, state: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Postal Code"
                    value={newAddress.postalCode || ""}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        postalCode: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Country"
                    value={newAddress.country || ""}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, country: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <PrimaryButton
                    variant="contained"
                    onClick={handleAddAddress}
                    disabled={loading}
                    fullWidth
                  >
                    {loading ? <CircularProgress size={24} /> : "Add Address"}
                  </PrimaryButton>
                </Grid>
              </Grid>
            </Box>
          </Box>

          {/* Edit Address Modal */}
          <Modal
            open={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            closeAfterTransition
          >
            <Fade in={editModalOpen}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  bgcolor: "background.paper",
                  boxShadow: 24,
                  p: 4,
                  borderRadius: 10,
                  width: "90%",
                  maxWidth: 600,
                }}
              >
                <Typography variant="h6">Edit Address</Typography>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Address Line 1"
                      value={editingAddress?.addressLine1 || ""}
                      onChange={(e) =>
                        setEditingAddress((prev) =>
                          prev
                            ? {
                              ...prev,
                              addressLine1: e.target.value,
                            }
                            : null
                        )
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="City"
                      value={editingAddress?.city || ""}
                      onChange={(e) =>
                        setEditingAddress((prev) =>
                          prev
                            ? {
                              ...prev,
                              city: e.target.value,
                            }
                            : null
                        )
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="State"
                      value={editingAddress?.state || ""}
                      onChange={(e) =>
                        setEditingAddress((prev) =>
                          prev
                            ? {
                              ...prev,
                              state: e.target.value,
                            }
                            : null
                        )
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Box display="flex" gap={2}>
                      <Button
                        sx={{
                          backgroundColor: "#fff",
                          border: `1px solid ${colors.textSecondary}`,
                          color: colors.textSecondary,
                          width: "100%",
                          borderRadius: "12px",
                          "&:hover": {
                            border: `2px solid ${colors.textSecondary}`,
                          },
                        }}
                        onClick={() => setEditModalOpen(false)}
                        fullWidth
                      >
                        Cancel
                      </Button>
                      <Button
                        sx={{
                          backgroundColor: "#fff",
                          border: `1px solid ${colors.textSecondary}`,
                          color: "#fff",
                          width: "100%",
                          borderRadius: "12px",
                          bgcolor: colors.textSecondary,
                          "&:hover": {
                            border: `2px solid ${colors.textSecondary}`,
                          },
                        }}
                        onClick={handleEditAddress}
                        fullWidth
                      >
                        Save Changes
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Fade>
          </Modal>
        </>
      )}
    </Box>
  );
}
