import React, { useEffect, useState } from "react";
import { Grid, Box, Card } from "@mui/material";
import DashboradSideMenu from "./DashboradSideMenu";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import CircularProgress from "@mui/material/CircularProgress";
import HeaderUserInfo from "./HeaderUserInfo";
import Link from "next/link";
import SecondaryNavigation from "./SecondaryNavigation";
import TurnLeftIcon from '@mui/icons-material/TurnLeft';


export default function LayoutDashboard({ children }) {
  const [board, setBoard] = useState(true);
  const [page, setPage] = useState(true);
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

  const handleChange = () => {
    setBoard(true);
    // setPage(false);
  }

  useEffect(()=>{
    if(page===true){
      setBoard(false)
    }
  },[])
  console.log(board, page);                                                     
  return (
    <>
      <SecondaryNavigation />
      <div className="layoutBg">
        <div className="container dashboardb">
          {userInfo.token ? (
            <>
              <Box sx={{ display: { sm: 'none', xs: 'block' } }}>
                <Grid container pt={5} pb={10}>
                  {route.asPath === ('/profile/rewards') ? <Grid sm={12} xs={12} item> {children}</Grid> : route.asPath === ("/profile/order-history") ? <Grid sm={12} xs={12} item>{children}</Grid> : <>{board ? <Grid sm={4} xs={12} item><DashboradSideMenu page={page} setBoard={setBoard}/></Grid> : <Grid sm={8} xs={12} item><>
                    <Box sx={{ cursor: 'pointer' }}>
                      <TurnLeftIcon /><span onClick={handleChange}>Back</span>
                    </Box>
                    {children}
                  </></Grid>}
                  </>}
                </Grid>
              </Box>
              <Box sx={{ display: { sm: 'block', xs: 'none' } }}>
                <Grid container pt={5} pb={10}>
                  {route.asPath === ('/profile/rewards') ? <Grid sm={12} xs={12} item> {children}</Grid> : route.asPath === ("/profile/order-history") ? <Grid sm={12} xs={12} item>{children}</Grid> : <><Grid sm={4} xs={12} item><DashboradSideMenu page={page} setBoard={setBoard}/></Grid> <Grid sm={8} xs={12} item>{children}</Grid></>}
                </Grid>
              </Box>
            </>
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
      </div>
    </>
  );
}
