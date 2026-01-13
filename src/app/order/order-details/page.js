"use client";

import React, { useEffect, useState } from "react";
import commonService from "@/service/menu/commonService";
import { useSelector } from "react-redux";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import { Grid, Box } from "@mui/material";
import BillingInfo from "@/components/route/order/BillingInfo";
import ShippingInfo from "@/components/route/order/ShippingInfo";
import OrderItem from "@/components/route/order/OrderItem";
import OrderSummary from "@/components/route/order/OrderSummary";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function OrderSuccess() {
  // hooks
  const userInfo = useSelector((state) => state.auth.userInfo);
  const searchParams = useSearchParams();
  const orderid = searchParams.get("orderid");

  // state
  const [cart, setCart] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null);

  // side effects
  useEffect(() => {
    if (orderid) {
      commonService
        .authGetData("orderDetails/" + orderid, userInfo.token)
        .then((res) => {
          setOrderDetails(res.data.data.order);
          setCart(res.data.data.details);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [orderid, userInfo]);

  return (
    <div className="container">
      <Grid container spacing={2} justifyContent="center" mb={12} mt={5}>
        <Grid  size={{sm:7, xs:12}}>
          <Box sx={{ background: "#eff0f4" }}>
            <Box pt={2}>
              <div className="text-center">
                <h3>Order # {orderid}</h3>
              </div>

              <Grid container spacing={2}>
                <Grid  size={{sm:6, xs:6}}>
                  <BillingInfo orderDetails={orderDetails} />
                </Grid>
                <Grid size={{sm:6, xs:6}}>
                  <ShippingInfo orderDetails={orderDetails} />
                </Grid>
              </Grid>

              <Grid container spacing={0}>
                <Grid size={{sm:12, xs:12}}>
                  <OrderItem cart={cart} />
                </Grid>
              </Grid>

              <Grid container spacing={0}>
                <Grid size={{sm:12, xs:12}}>
                  <OrderSummary orderDetails={orderDetails} />
                </Grid>
              </Grid>

              <br />
              <br />
              <Box sx={{ borderTop: "1px solid rgba(0,0,0,0.12)", paddingBottom: "15px" }}>
                <Grid container spacing={2} justifyContent="center" p={1}>
                  <Grid  size={{sm:12, xs:12}}>
                    <p className="textCenter">
                      We have received your order and will contact you as soon as your package is shipped. 
                      You can find your purchase information by accessing your{" "}
                      <Link href="/dashboard/account-information?id=0">
                        <u>Account</u>
                      </Link>
                      .
                    </p>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
