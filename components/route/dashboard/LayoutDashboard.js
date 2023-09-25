import React, { useEffect } from "react";
import { Grid, Box } from "@mui/material";
import DashboradSideMenu from "./DashboradSideMenu";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import CircularProgress from "@mui/material/CircularProgress";
import HeaderUserInfo from "./HeaderUserInfo";

export default function LayoutDashboard({ children }) {
  // hooks
  const userInfo = useSelector((state) => state.auth.userInfo);
  const persist = useSelector((state) => state);
  const route = useRouter();

  useEffect(() => {
    if (persist._persist.rehydrated) {
      if (!userInfo.token) {
        route.push("/signin");
      }
    }
  }, [persist]);
  return (
    <div className="container">
      {userInfo.token ? (
        <Grid container spacing={2} pt={5} marginBottom={10}>
          {/* <Grid sm={4} xs={12} item>
            <h3>Dashboard</h3>
          </Grid> */}
          <Grid sm={4} xs={12} item>
            <Box sx={{display:{sm:'none', xs:'block'}}}>
            {/* <Box > */}
              <HeaderUserInfo/>
            </Box>
            <DashboradSideMenu />
          </Grid>
          <Grid sm={8} xs={12} item>
            {children}
          </Grid>
        </Grid>
      ) : (
        <Box
          sx={{
            textAlign: "center",
            marginBottom: 12,
            marginTop: 12,
            paddingTop: 12,
            paddingBottom: 12,
            height: '50vh'
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </div>
  );
}
