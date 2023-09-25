import React from "react";
import { Button, Checkbox} from "@mui/material";
import { styled } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";

const CommonButton = styled(Button)({
  boxShadow: "none !important",
  outline: "none !important",
  border: "1px solid",
  borderRadius: 0,
  borderColor: "#473427",
  // background: "#9a7448",
  // background: "#473427",
  background: "#000",
  fontFamily: "Jost !important",
  fontSize: "1rem",
  padding: "10px 25px",
  // borderRadius: "50px",
  borderRadius: "5px",
  transition: "all .3s",
  color: "#fff",
  "&:hover": {
    // backgroundColor: "#9a7448",
    // borderColor: "#9a7448",
    // transform: `translateY(-5px)`
  },
});
const CommonButtonpayment = styled(Checkbox)({
  boxShadow: "none !important",
  outline: "none !important",
  border: "1px solid",
  borderRadius: 0,
  borderColor: "#473427",
  // background: "#9a7448",
  // background: "#473427",
  background: "transparent",
  fontFamily: "Jost !important",
  fontSize: "1rem",
  padding: "10px 25px",
  // borderRadius: "50px",
  borderRadius: "5px",
  transition: "all .3s",
  color: "#000",
  "&:focus": {
    borderBottom:"5px solid #000"
    // backgroundColor: "#9a7448",
    // borderColor: "#9a7448",
    // transform: `translateY(-5px)`
  },
});

const HomeWhiteButton = styled(Button)({
  boxShadow: "none !important",
  outline: "none !important",
  border: "1px solid",
  borderRadius: 0,
  borderColor: "#473427",
  background: "#473427",
  fontFamily: "MiahFont",
  fontSize: "1rem",
  // padding: '0px 5px',
  color: "#fff",
  fontWeight: "bold",
  "&:hover": {
    // backgroundColor: "#9a7448",
    backgroundColor: "red",
    borderColor: "#9a7448",
  },
});

export function MiahButton({ methodFromParent, children, size }) {
  const handleClick = () => {
    methodFromParent ? methodFromParent() : null;
  };
  return (
    <CommonButton
      variant="contained"
      size={size ? "small" : ""}
      fullWidth
      onClick={handleClick}
    >
      {children}
    </CommonButton>
  );
}
export function MiahCupponButton({ methodFromParent, children, size }) {
  const handleClick = () => {
    methodFromParent ? methodFromParent() : null;
  };
  return (
    <Button
      variant="contained"
      // size={size ? "small" : ""}
      fullWidth
      onClick={handleClick}
    >
      {children}
    </Button>
  );
}
export function MiahSubmitButton({ children }) {
  return (
    <CommonButton variant="contained" fullWidth type="submit">
      {children}
    </CommonButton>
  );
}
export function MiahPaymentButton({ children }) {
  return (
    <CommonButtonpayment sx={{ mt:'5px'}} fullWidth variant="outlined" type="submit">
      {children}
    </CommonButtonpayment>
  );
}

export function MiahLoadingButton({ children }) {
  return (
    <CommonButton fullWidth>
      <CircularProgress
        color="inherit"
        sx={{ marginRight: "10px" }}
        size={18}
      />
      {children}
    </CommonButton>
  );
}

export function AddToBagButton({ addItemToBag, children }) {
  const handleClick = () => {
    addItemToBag ? addItemToBag() : null;
  };
  return (
    <CommonButton variant="contained" fullWidth onClick={handleClick}>
      {children}
    </CommonButton>
  );
}
export function MiahButtonRegular({ addItemToBag, children }) {
  const handleClick = () => {
    addItemToBag ? addItemToBag() : null;
  };
  return (
    <CommonButton variant="contained" size="small" onClick={handleClick}>
      {children}
    </CommonButton>
  );
}

// submit button with loading

export function MiahSubmitLoadingButton({ isloading, children, type }) {
  return (
    <Button type={type ? type : ""} variant="contained" size="small">
      {isloading ? <CircularProgress color="inherit" size={18} /> : children}
    </Button>
  );
}

export function MiahHomeButton({ children }) {
  return (
    <CommonButton variant="contained" fullWidth>
      {children}
    </CommonButton>
  );
}

export function MiahHomeButtonWhite({ children }) {
  return (
    <HomeWhiteButton variant="contained" fullWidth>
      {children}
    </HomeWhiteButton>
  );
}
