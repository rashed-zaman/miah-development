import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import { logout } from "../redux/auth/authActions";
import { setFormInitailValueNull } from "../redux/checkout/checkoutActions";
import { defaultAddress, formInitialValue } from "../demoData/demoData";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Logout() {
  // hooks
  const route = useRouter();
  const dispatch = useDispatch();

  // methods
  const logoutUser = () => {
    const data = {
      formInitialValue: formInitialValue,
      defaultAddress: defaultAddress,
    };

    dispatch(logout());
    dispatch(setFormInitailValueNull(data));
    route.push("/");
  };

  useEffect(() => {
    logoutUser()
  }, [])
  
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
