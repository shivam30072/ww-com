import { Close } from "@mui/icons-material";
import { Box, Drawer, IconButton, Typography } from "@mui/material";

type cartProps = {
  drawerState: boolean;
  setDrawerState: (state: boolean) => void;
};
const Cart = ({ drawerState, setDrawerState }: cartProps) => {
  return (
    <>
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
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" fontWeight="bold">
              Your Cart
            </Typography>
            <IconButton onClick={() => setDrawerState(false)}>
              <Close />
            </IconButton>
          </Box>

          {/* Cart Content */}
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

          {/* Footer */}
          <Box>
            <Typography variant="body2" align="center" color="textSecondary">
              Add items to your cart to view them here.
            </Typography>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Cart;
