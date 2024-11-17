import { Typography } from "@mui/material";

type headingPropType = {
  title: string;
  textAlign: string;
};

const Heading = ({ title, textAlign }: headingPropType) => {
  return (
    <Typography
      sx={{
        textAlign: textAlign,
        fontWeight: 700,
        fontSize: { xs: "18px", sm: "28px" },
        py: 2,
        pl: 3,
        my: 2,
      }}
    >
      {title}
    </Typography>
  );
};

export default Heading;
