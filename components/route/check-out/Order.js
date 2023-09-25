import React from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import { IMAGE_URL } from "../../../service/serviceConfig";
import { Box, Button, Divider, Grid } from "@mui/material";
import OrderSummary from "./OrderSummary";
import { useState } from "react";
import SwipeableEdgeDrawer from "../../swipeable/SwipeableEdgeDrawer";

export default function Order({
  digitalDiscount,
  shippingCharge,
  couponDiscount,
}) {
  const shoppingCart = useSelector((state) => state.shoppingBag.shoppingCart);
  const totalAmount = useSelector((state) =>
    state.shoppingBag.shoppingCart.reduce((a, b) => a + (b.amount || 0), 0)
  );
  const [touch, setTouch] = useState("bgClose");
  const handleClick = (e) => {
    if (touch === "bgClose") {
      setTouch("bgOpen");
    } else {
      setTouch("bgClose");
    }
  };
  return (
    <div className="col-12 px-0">
      <Box sx={{ display: { sm: "block", xs: "none" } }}>
        <div className="ps-checkout__order">
          <OrderSummary
            digitalDiscount={digitalDiscount}
            shippingCharge={shippingCharge}
            couponDiscount={couponDiscount}
            shoppingCart={shoppingCart}
          />
        </div>
        <div className="ps-checkout__order">
          <h6 className="ps-checkout__heading" style={{ paddingLeft: "10px" }}>
            Orders Details
          </h6>
          <Divider />
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
          <Divider />
        </div>
      </Box>
      <Box sx={{ display: { sm: "none", xs: "block" } }}>
        <SwipeableEdgeDrawer
          digitalDiscount={digitalDiscount}
          shippingCharge={shippingCharge}
          couponDiscount={couponDiscount}
          shoppingCart={shoppingCart}
        />

        {/* <div className={`ps-checkout__order ${touch}`}>
          <button className="swipeButton" type="button" ></button>
          <OrderSummary
            digitalDiscount={digitalDiscount}
            shippingCharge={shippingCharge}
            couponDiscount={couponDiscount}
            shoppingCart={shoppingCart}
          />
          <h6 className="ps-checkout__heading" sx={{mt:{xs:'0', sm:'20px'}, pl:{xs:'10', sm:'10px'}}}>Orders Details</h6>
          <Divider/>

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
                    <div className="ps-product__price">Tk {item.amount}</div>
                  </Grid>
                </Grid>
              </div>
            );
          })}
          
          <Divider/>
        </div> */}
      </Box>
    </div>
  );
}
