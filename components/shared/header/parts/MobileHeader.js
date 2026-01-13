import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import { useRouter } from "next/router";
import { Box } from "@mui/material";
import { setSearchPanel } from "../../../../redux/menu/menuActions";
import { useDispatch } from "react-redux";
import Notify from "./Notify";

// import Notify from "./Notify";

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
  // hooks
  const route = useRouter();
  const dispatch = useDispatch();
  const [scrollY, setScrollY] = useState(0);

  // methods

  const showSearchPanel = () => {
    dispatch(setSearchPanel(true));
  };

  // side effects

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar
          className={
            scrollY === 0 ? "background-trasparent" : "background-white"
          }
        >
          <Grid container spacing={1}>
            <Grid item xs={6}>
              {scrollY === 0 ? (
                <Link href="/">
                  <a>
                    {route.asPath === "/" ? (
                      <img
                        src={"/img/logo.gif"}
                        alt=""
                        style={{ width: "150px" }}
                      />
                    ) : (
                      <img
                        src={"/img/web-black-logo.gif"}
                        alt=""
                        style={{ width: "150px" }}
                      />
                    )}
                  </a>
                </Link>
              ) : (
                <Link href="/">
                  <a>
                    <img
                      src={"/img/web-black-logo.gif"}
                      alt=""
                      style={{ width: "150px" }}
                    />
                  </a>
                </Link>
              )}
            </Grid>
            <Grid item xs={6}>
              <div className="text-right pr-3 pt-3" onClick={showSearchPanel}>
                <img src="/img/icon/search.svg" alt="" className="mt-1" />
              </div>
            </Grid>
          </Grid>
        </AppBar>
      </HideOnScroll>
      <ShowOnScroll {...props}>
        <AppBar sx={{ boxShadow: "none" }}>
          {route.asPath === "/profile/rewards" ? null : route.asPath ===
            "/profile/order-history" ? null : route.asPath ===
            "/profile/account-information" ? null : route.asPath ===
            "/profile/address-book" ? null : route.asPath ===
            "/profile/wish-list" ? null : (
            <Notify />
          )}
          {/* <Notify /> */}
        </AppBar>
      </ShowOnScroll>
      {route.asPath !== "/" && (
        <Box sx={{ height: "64px", display: { xs: "block", sm: "none" } }} />
      )}
    </>
  );
}
