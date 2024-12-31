// import { Box, Dialog, IconButton, Typography } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import { useState } from "react";
// import { motion } from "framer-motion";
// import { colors } from "../constants";

// type loginPropTypes = {
//   open: boolean;
//   onClose: () => void;
// };

// const LoginModal = ({ open, onClose }: loginPropTypes) => {
//   const [mobile, setMobile] = useState("");

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     if (/^\d{0,10}$/.test(value)) {
//       setMobile(value);
//     }
//   };

//   const handleClose = () => {
//     setMobile("");
//     onClose();
//   };

//   return (
//     <Dialog open={open} onClose={handleClose} maxWidth="md">
//       <Box display={"flex"} position="relative" overflow="hidden">
//         {/* Cross Icon */}
//         <IconButton
//           onClick={handleClose}
//           style={{
//             position: "absolute",
//             top: 8,
//             right: 8,
//             zIndex: 1,
//           }}
//         >
//           <CloseIcon />
//         </IconButton>

//         {/* Left Part */}
//         <Box display={"flex"} flex={1}>
//           <img
//             src="/images/saree.jpg"
//             alt="Saree"
//             width={"100%"}
//             height={"100%"}
//             style={{ objectFit: "cover" }}
//           />
//         </Box>

//         {/* Right Part */}
//         <Box
//           display={"flex"}
//           flex={1}
//           flexDirection={"column"}
//           pl={2}
//           justifyContent={"center"}
//           alignItems={"center"}
//           gap={2}
//           overflow="hidden"
//         >
//           <Box
//             display={"flex"}
//             flexDirection={"column"}
//             justifyContent={"flex-start"}
//             alignItems={"flex-start"}
//           >
//             <Box my={2}>
//               <Typography
//                 fontWeight={"bold"}
//                 fontSize={"clamp(0.875rem, 0.2237rem + 3.1579vw, 2rem)"}
//                 style={{ color: colors.textSecondary }}
//               >
//                 Your Mobile Number!
//               </Typography>
//             </Box>

//             <Box my={2}>
//               <input
//                 type="text"
//                 placeholder="Enter Mobile Number"
//                 value={mobile}
//                 onChange={handleInputChange}
//                 style={{
//                   padding: "16px",
//                   fontSize: "16px",
//                   width: "90%",
//                   borderRadius: "8px",
//                   border: `2px solid ${colors.primary}`,
//                   outline: "none",
//                 }}
//               />
//             </Box>

//             {/* Submit Button with Animation */}
//             <Box my={2}>
//               <motion.button
//                 whileHover={{
//                   scale: 1.05,
//                   backgroundColor: colors.text,
//                 }}
//                 whileTap={{ scale: 0.95 }}
//                 style={{
//                   padding: "10px 20px",
//                   fontSize: "16px",
//                   fontWeight: "bold",
//                   backgroundColor: colors.secondary,
//                   color: "white",
//                   border: "none",
//                   borderRadius: "4px",
//                   cursor: "pointer",
//                 }}
//               >
//                 Submit
//               </motion.button>
//             </Box>
//           </Box>
//         </Box>
//       </Box>
//     </Dialog>
//   );
// };

// export default LoginModal;


import { Box, Dialog, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { colors } from "../constants";

type loginPropTypes = {
  open: boolean;
  onClose: () => void;
};

const LoginModal = ({ open, onClose }: loginPropTypes) => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [step, setStep] = useState<"enterMobile" | "verifyOtp">("enterMobile");
  const [name, setName] = useState("");  // Default to empty string, ask for name in the send OTP step
  const [storedName, setStoredName] = useState<string | null>(null); // Store the name for later use

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setMobile(value);
    }
  };

  const handleOtpChange = (value: string, index: number) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input box
      if (value && index < otp.length - 1) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleClose = () => {
    setMobile("");
    setOtp(["", "", "", ""]);
    setStep("enterMobile");
    setStoredName(null);  // Reset the stored name
    onClose();
  };

  const handleSendOtp = async () => {
    if (mobile.length === 10 && name) {
      const formattedMobile = `91${mobile}`;
      try {
        // Store the name when sending OTP
        setStoredName(name);
        await axios.post(`${process.env.BACKEND_BASE_URL}/v1/auth/send-otp`, {
          mobile: formattedMobile,
        });
        setStep("verifyOtp");
      } catch (error) {
        console.error("Error sending OTP:", error);
      }
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.every((digit) => digit !== "") && storedName) {
      const formattedMobile = `91${mobile}`;
      const otpValue = otp.join("");
      try {
        const verifyOtpResponse = await axios.post(`${process.env.BACKEND_BASE_URL}/v1/auth/verify-otp`, {
          mobile: formattedMobile,
          otp: otpValue,
          name: storedName,
        });
        localStorage.setItem("jwttoken", verifyOtpResponse.data.tokens.access.token)
        localStorage.setItem("user", JSON.stringify(verifyOtpResponse.data.user))
        alert("OTP Verified Successfully!");
        handleClose();
      } catch (error) {
        console.error("Error verifying OTP:", error);
      }
    }
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
          {step === "enterMobile" && (
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
                  Your Name and Mobile Number!
                </Typography>
              </Box>

              <Box my={2}>
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  onClick={handleSendOtp}
                >
                  Send OTP
                </motion.button>
              </Box>
            </Box>
          )}

          {step === "verifyOtp" && (
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              <Box my={2}>
                <Typography
                  fontWeight={"bold"}
                  fontSize={"clamp(0.875rem, 0.2237rem + 3.1579vw, 2rem)"}
                  style={{ color: colors.textSecondary }}
                >
                  Enter OTP
                </Typography>
              </Box>

              <Box my={2} display="flex" gap={2}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    value={digit}
                    maxLength={1}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    style={{
                      width: "40px",
                      height: "40px",
                      textAlign: "center",
                      fontSize: "20px",
                      borderRadius: "8px",
                      border: `2px solid ${colors.primary}`,
                      outline: "none",
                    }}
                  />
                ))}
              </Box>

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
                  onClick={handleVerifyOtp}
                >
                  Verify OTP
                </motion.button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Dialog>
  );
};

export default LoginModal;
