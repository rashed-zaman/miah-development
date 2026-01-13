"use client";

import React, { useEffect, useState } from "react";
import commonService from "@/service/menu/commonService";
import { useSelector, useDispatch } from "react-redux";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import { Grid, Box } from "@mui/material";
import BillingInfo from "@/components/route/order/BillingInfo";
import ShippingInfo from "@/components/route/order/ShippingInfo";
import OrderItem from "@/components/route/order/OrderItem";
import OrderSummary from "@/components/route/order/OrderSummary";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { setBagNull } from "@/store/shoppingBagSlice";


export default function OrderSuccess() {
  // redux
  const userInfo = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();

  // next
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderid");

  // state
  const [cart, setCart] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null);


console.log(userInfo, orderId);


  // effects
  useEffect(() => {
    if (!orderId || !userInfo?.token) return;

    commonService
      .authGetData(`orderDetails/${orderId}`, userInfo.token)
      .then((res) => {
        setOrderDetails(res.data.data.order);
        setCart(res.data.data.details);
        dispatch(setBagNull());
      })
      .catch((error) => {
        console.log(error);
      });
  }, [orderId, userInfo, dispatch]);

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      mb={10}
      className="mt-5"
    >
      <Grid size={{sm:7, xs:12}}>
        <Box sx={{ background: "#eff0f4" }}>
          <div className="text-center">
            <CardGiftcardIcon fontSize="large" color="success" />
            <h2 className="marginTopZero">IT&apos;S ORDERED !</h2>
            <p>
              <b>Order # {orderId}</b>
            </p>
          </div>

          <Grid container spacing={2} p={2}>
            <Grid  size={6}>
              <BillingInfo orderDetails={orderDetails} />
            </Grid>
            <Grid size={6}>
              <ShippingInfo orderDetails={orderDetails} />
            </Grid>
          </Grid>

          <Grid container>
            <Grid size={12}>
              <OrderItem cart={cart} />
            </Grid>
          </Grid>

          <Grid container>
            <Grid size={12}>
              <OrderSummary orderDetails={orderDetails} />
            </Grid>
          </Grid>

          <Box
            sx={{
              borderTop: "1px solid rgba(0,0,0,0.12)",
              paddingBottom: "15px",
              mt: 3,
            }}
          >
            <Grid container justifyContent="center" p={1}>
              <Grid size={12}>
                <p className="textCenter">
                  We have received your order and will contact you as soon as
                  your package is shipped. You can find your purchase
                  information by accessing your{" "}
                  <Link href="/dashboard/account-information?id=0">
                    <u>Account</u>
                  </Link>
                  .
                </p>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
