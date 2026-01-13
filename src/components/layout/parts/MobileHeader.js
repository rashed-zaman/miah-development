"use client";

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box } from "@mui/material";
import { setSearchPanel } from "@/store/menuSlice";
import { useDispatch } from "react-redux";
import Notify from "./Notify";

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function ShowOnScroll({ children }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

export default function MobileHeader() {
  const pathname = usePathname();
  const dispatch = useDispatch();

  const [isTop, setIsTop] = useState(true);

  // Scroll listener (client-only, SSR-safe)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      setIsTop(window.scrollY === 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showSearchPanel = () => {
    dispatch(setSearchPanel(true));
  };

  const hideNotifyRoutes = [
    "/profile/rewards",
    "/profile/order-history",
    "/profile/account-information",
    "/profile/address-book",
    "/profile/wish-list",
  ];

  return (
    <>
      <CssBaseline />

      {/* Top AppBar - appears only when NOT scrolling */}
      <HideOnScroll>
        <AppBar
          className={isTop ? "background-transparent" : "background-white"}
          sx={{
            background: isTop ? "transparent" : "#fff",
            boxShadow: isTop ? "none" : "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          <Grid container spacing={1}>
            <Grid size={6}>
              <Link href="/">
                <img
                  src={
                    isTop && pathname === "/"
                      ? "/img/logo.gif"
                      : "/img/web-black-logo.gif"
                  }
                  alt="logo"
                  style={{ width: "150px" }}
                />
              </Link>
            </Grid>

            <Grid size={6}>
              <div className="text-right pr-3 pt-3" onClick={showSearchPanel}>
                <img src="/img/icon/search.svg" alt="search" className="mt-1" />
              </div>
            </Grid>
          </Grid>
        </AppBar>
      </HideOnScroll>

      {/* Notify AppBar - appears only WHEN scrolling down */}
      <ShowOnScroll>
        <AppBar sx={{ boxShadow: "none" }}>
          {!hideNotifyRoutes.includes(pathname) && <Notify />}
        </AppBar>
      </ShowOnScroll>

      {/* Spacer below header for non-home pages */}
      {pathname !== "/" && (
        <Box sx={{ height: "64px", display: { xs: "block", sm: "none" } }} />
      )}
    </>
  );
}
