import { Dialog } from "@mui/material";

type loginPropTypes = {
  open: boolean;
  onClose: () => void;
};
const LoginModal = ({ open, onClose }: loginPropTypes) => {
  return (
    <Dialog open={open} onClose={onClose}>
      login form
    </Dialog>
  );
};

export default LoginModal;
