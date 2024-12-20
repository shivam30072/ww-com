import { addToCart, removeFromCart } from "@/lib/features/CartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Close } from "@mui/icons-material";
import { Box, Drawer, IconButton, Typography } from "@mui/material";

type cartProps = {
  drawerState: boolean;
  setDrawerState: (state: boolean) => void;
};
const Cart = ({ drawerState, setDrawerState }: cartProps) => {
  const { products, cartSum } = useAppSelector((state) => state.Cart);

  const dispatch = useAppDispatch();

  return (
    <Drawer
      anchor={"right"}
      open={drawerState}
      onClose={() => setDrawerState(false)}
      sx={{
        "& .MuiDrawer-paper": {
          width: { xs: "80%", sm: "50%", md: "30%" }, // Responsive width
          padding: 2,
        },
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        height="100%"
      >
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold">
            Your Cart
          </Typography>
          <IconButton onClick={() => setDrawerState(false)}>
            <Close />
          </IconButton>
        </Box>

        {/* Cart Content */}
        {products.length > 0 ? (
          <Box flex={1} overflow="auto" mt={2}>
            {products.map((product, index) => (
              <Box
                key={product.id}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mb={2}
                p={1}
                border="1px solid #ddd"
                borderRadius="8px"
              >
                {/* Product Image */}
                <Box flex="0 0 60px" mr={2}>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    style={{ width: "100%", borderRadius: "8px" }}
                  />
                </Box>

                {/* Product Details */}
                <Box flex={1}>
                  <Typography variant="body1" fontWeight="bold">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    ₹{product.finalPrice.toFixed(2)}
                  </Typography>
                </Box>

                {/* Quantity Controls */}
                <Box display="flex" alignItems="center">
                  <IconButton
                    onClick={() => dispatch(removeFromCart(product.id))}
                    size="small"
                  >
                    -
                  </IconButton>
                  <Typography variant="body2" mx={1}>
                    {product.quantity}
                  </Typography>
                  <IconButton
                    onClick={() => dispatch(addToCart(product))}
                    size="small"
                  >
                    +
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Box>
        ) : (
          <Box
            flex={1}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="body1" color="textSecondary">
              Your cart is empty.
            </Typography>
          </Box>
        )}

        {/* Footer */}
        {products.length > 0 && (
          <Box mt={2} pt={2} borderTop="1px solid #ddd">
            <Typography variant="h6" textAlign="right">
              Total: ₹ {cartSum.toFixed(2)}
            </Typography>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default Cart;
