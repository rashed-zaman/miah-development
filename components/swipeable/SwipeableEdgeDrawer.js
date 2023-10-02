import React, { useEffect, useState, useRef } from "react";
import { Divider, List, ListItem, Grid, Box } from "@mui/material";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";

import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import OrderSummary from "../route/check-out/OrderSummary";
import { IMAGE_URL } from "../../service/serviceConfig";
import Image from "next/image";
import { useSelector } from "react-redux";

const drawerBleeding = 100;

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor:
    theme.palette.mode === "light"
      ? grey[100]
      : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 50,
  height: 4,
  backgroundColor:
    theme.palette.mode === "light"
      ? "rgba(0, 0, 0, 0.2)"
      : "rgba(0, 0, 0, 0.2)",
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

export default function SwipeableEdgeDrawer({
  digitalDiscount,
  shippingCharge,
  couponDiscount,
  shoppingCart,
}) {
  // hooks
  const offerDiscount = useSelector((state) => state.checkout.offerDiscount);
  const couponDiscountObj = useSelector((state) => state.checkout.coupon);
  const creditDiscountObj = useSelector((state) => state.checkout.credit);
  const siteOptions = useSelector((state) => state.menu.siteOptions);

  // local state
  const [open, setOpen] = useState(false);
  const [cartLenght, setCartLeng] = useState(0);
  const [totalamount, setTotalAmount] = useState(0);
  const [tax, seTaxt] = useState(0);

  // methods
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleTouchStart = () => {
    const element = document.getElementById("__next");
    element.style.overflow = "hidden";
  };

  const handleTouchEnd = () => {
    const element = document.getElementById("__next");
    element.style.overflow = "";
  };

  const calculateTex = () => {
    if (totalamount > 0) {
      const tax = (siteOptions.tax * totalamount) / 100;
      seTaxt(tax);
    }
  };

  // side effects
  useEffect(() => {
    setCartLeng(shoppingCart.reduce((a, b) => a + (b.qty || 0), 0));
    setTotalAmount(shoppingCart.reduce((a, b) => a + (b.amount || 0), 0));
    calculateTex();
  }, [shoppingCart]);

  // site effects
  useEffect(() => {
    calculateTex();
  }, [totalamount]);

  return (
    <div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <Root>
        <CssBaseline />
        <Global
          styles={{
            ".MuiDrawer-root > .MuiPaper-root": {
              minHeight: `calc(50% - ${drawerBleeding}px)`,
              overflow: "visible",
              maxHeight: "80%",
            },
          }}
        />
        <SwipeableDrawer
          anchor="bottom"
          open={open}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          swipeAreaWidth={drawerBleeding}
          disableSwipeToOpen={false}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <div className="swipeable-drawer">
            <StyledBox
              sx={{
                position: "absolute",
                top: -drawerBleeding,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                visibility: "visible",
                overflow: "none",
                right: 0,
                left: 0,
                borderTop: "1px solid rgba(0,0,0,.05)",
              }}
            >
              <Puller />
              <Grid container sx={{ p: 2, px: 4, position: "relative" }}>
                <Grid item xs={6}>
                  <strong>{cartLenght} Items</strong>
                </Grid>
                <Grid item xs={6} sx={{ textAlign: "right" }}>
                  <strong>
                    ৳{" "}
                    {totalamount +
                      tax +
                      parseInt(shippingCharge) -
                      digitalDiscount -
                      offerDiscount.discountValue -
                      creditDiscountObj.amount -
                      couponDiscountObj.discountAmount}
                  </strong>
                </Grid>
                {/* <div style={{position: "absolute", background:"#ffffff", height:'200px', width:'100%', bottom: "-44px", left:0}}>

                </div> */}
              </Grid>
            </StyledBox>
          </div>
          <StyledBox
            sx={{
              px: 2,
              pb: 2,
              height: "100%",
              overflow: "auto",
              position: "relative",
              top: "-60px",
            }}
          >
            <Box sx={{ paddingBottom: "50px" }}>
              <OrderSummary
                digitalDiscount={digitalDiscount}
                shippingCharge={shippingCharge}
                couponDiscount={couponDiscount}
                shoppingCart={shoppingCart}
                type="mobile drawer"
              />
              {shoppingCart.map((item, pos) => {
                return (
                  <div className="ps-checkout__row ps-product" key={pos}>
                    <Grid container key={pos} spacing={2} mb={3}>
                      <Grid item md={3} xs={3}>
                        <Image
                          src={`${IMAGE_URL}${item.image}`}
                          alt="Picture of the author"
                          width={300}
                          height={300}
                          layout="responsive"
                        />
                      </Grid>
                      <Grid item md={5} xs={4}>
                        <div className="ps-product__name">{item.name}</div>
                        <div className="ps-product__name">Qty: {item.qty}</div>
                      </Grid>
                      <Grid item md={3} xs={5}>
                        <div className="ps-product__price">
                          Tk {item.qty * item.unitPrice}
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                );
              })}
            </Box>
          </StyledBox>
        </SwipeableDrawer>
      </Root>
    </div>
  );
}
