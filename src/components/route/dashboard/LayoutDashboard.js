"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Grid, Box } from "@mui/material";
import DashboradSideMenu from "./DashboradSideMenu";
import { useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";
import SecondaryNavigation from "./SecondaryNavigation";
import TurnLeftIcon from "@mui/icons-material/TurnLeft";

// ---------------- Main Component ----------------
export default function LayoutDashboard({ children }) {
  const [board, setBoard] = useState(true);

  // ✅ Only subscribe to the minimal slice
  const userInfo = useSelector(
    (state) => state.auth.userInfo,
    (prev, next) => prev.token === next.token
  );

  const router = useRouter();
  const pathname = usePathname();

  // ---------------- Auth Guard ----------------
  useEffect(() => {
    if (!userInfo?.token) {
      router.push("/signin");
    }
  }, [userInfo?.token, router]);

  const handleBack = useCallback(() => setBoard(true), []);

  // ---------------- Memoized Sidebar ----------------
  const sidebar = useMemo(() => <DashboradSideMenu setBoard={setBoard} />, []);

  // ---------------- Memoized Mobile Content ----------------
  const mobileContent = useMemo(() => {
    if (
      pathname === "/profile/rewards" ||
      pathname === "/profile/order-history"
    ) {
      return <Grid xs={12}>{children}</Grid>;
    }

    return board ? (
      <Grid xs={12}>{sidebar}</Grid>
    ) : (
      <Grid xs={12}>
        <Box
          sx={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 2,
          }}
          onClick={handleBack}
        >
          <TurnLeftIcon />
          <span>Back</span>
        </Box>
        {children}
      </Grid>
    );
  }, [board, children, pathname, sidebar, handleBack]);

  // ---------------- Memoized Desktop Content ----------------
  const desktopContent = useMemo(() => {
    if (
      pathname === "/profile/rewards" ||
      pathname === "/profile/order-history"
    ) {
      return <Grid xs={12}>{children}</Grid>;
    }

    return (
      <>
        <Grid sm={4}>{sidebar}</Grid>
        <Grid sm={8}>{children}</Grid>
      </>
    );
  }, [children, pathname, sidebar]);

  // ---------------- Render ----------------
  if (!userInfo?.token) {
    return (
      <Box
        sx={{
          textAlign: "center",
          marginY: 12,
          paddingY: 12,
          height: "50vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <SecondaryNavigation />

      <div className="layoutBg">
        <div className="container dashboardb">
          <Box sx={{ display: { sm: "none", xs: "block" } }}>
            <Grid container pt={5} pb={10}>
              {mobileContent}
            </Grid>
          </Box>

          <Box sx={{ display: { sm: "block", xs: "none" } }}>
            <Grid container pt={5} pb={10}>
              {desktopContent}
            </Grid>
          </Box>
        </div>
      </div>
    </>
  );
}
