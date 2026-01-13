"use client";

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { setSearchPanel } from "../../../../redux/menu/menuActions";
import Notify from "./Notify";

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function ShowOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });
  return (
    <Slide appear={false} direction="down" in={trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

export default function MobileHeader(props) {
  const route = useRouter();
  const dispatch = useDispatch();
  const [scrollY, setScrollY] = useState(0);

  const showSearchPanel = () => {
    dispatch(setSearchPanel(true));
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar className={scrollY === 0 ? "background-trasparent" : "background-white"}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              {scrollY === 0 ? (
                <Link href="/" passHref>
                  <img
                    src={route.pathname === "/" ? "/img/logo.gif" : "/img/web-black-logo.gif"}
                    alt="Logo"
                    style={{ width: "150px" }}
                  />
                </Link>
              ) : (
                <Link href="/" passHref>
                  <img src="/img/web-black-logo.gif" alt="Logo" style={{ width: "150px" }} />
                </Link>
              )}
            </Grid>
            <Grid item xs={6}>
              <div className="text-right pr-3 pt-3" onClick={showSearchPanel}>
                <img src="/img/icon/search.svg" alt="Search" className="mt-1" />
              </div>
            </Grid>
          </Grid>
        </AppBar>
      </HideOnScroll>

      <ShowOnScroll {...props}>
        <AppBar sx={{ boxShadow: "none" }}>
          {!["/profile/rewards","/profile/order-history","/profile/account-information","/profile/address-book","/profile/wish-list"].includes(route.pathname) && (
            // <Notify />
            <></>
          )}
        </AppBar>
      </ShowOnScroll>

      {route.pathname !== "/" && <Box sx={{ height: "64px", display: { xs: "block", sm: "none" } }} />}
    </>
  );
}
