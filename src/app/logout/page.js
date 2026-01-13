"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";


import { logout } from "@/store/authSlice";
import { resetForm } from "@/store/checkoutSlice";
import { defaultAddress, formInitialValue } from "../demoData/demoData";

export default function Logout() {
  // hooks
  const router = useRouter();
  const dispatch = useDispatch();

  // methods
  const logoutUser = () => {
    const data = {
      formInitialValue,
      defaultAddress,
    };

    dispatch(logout());
    dispatch(resetForm(data));
    router.replace("/");
  };

  useEffect(() => {
    logoutUser();
  }, []);

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
