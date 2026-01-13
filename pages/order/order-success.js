import React, { useEffect, useState } from "react";
import commonService from "../../service/menu/commonService";
import { useSelector, useDispatch } from "react-redux";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import { Grid, Box } from "@mui/material";
import BillingInfo from "../../components/route/order/BillingInfo";
import ShippingInfo from "../../components/route/order/ShippingInfo";
import OrderItem from "../../components/route/order/OrderItem";
import OrderSummary from "../../components/route/order/OrderSummary";
import { useRouter } from "next/router";
import Link from "next/link";
import { setBagNull } from "../../redux/shoppingBag/shoppingBagActions";

export default function OrderSuccess() {
  // hooks
  const userInfo = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();
  const router = useRouter();

  // state
  const [cart, setCart] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null);

  // side effects
  useEffect(() => {
    if (router.isReady) {
      commonService
        .authGetData("orderDetails/" + router.query.orderid, userInfo.token)
        .then((res) => {
          setOrderDetails(res.data.data.order);
          setCart(res.data.data.details);
          dispatch(setBagNull());
        })
        .catch((error) => {
          console.log(error);
        });
    }
    // console.log(router.query);
  }, [router.query.orderid, userInfo, router.isReady]);

  return (
    <>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        mb={10}
        className="mt-5"
      >
        <Grid item sm={7} xs={12}>
          <Box
            sx={{
              background: "#eff0f4",
            }}
          >
            <Box>
              <div className="text-center">
                <CardGiftcardIcon fontSize="large" color="success" />
                <h2 className="marginTopZero">{"IT'S ORDERED !"}</h2>
                <p>
                  <b>Order # {router.query.orderid}</b>
                </p>
              </div>
              <Grid container spacing={2} p={2}>
                <Grid item sm={6} xs={6}>
                  <BillingInfo orderDetails={orderDetails} />
                </Grid>
                <Grid item sm={6} xs={6}>
                  <ShippingInfo orderDetails={orderDetails} />
                </Grid>
              </Grid>
              <Grid container spacing={0}>
                <Grid item sm={12} xs={12}>
                  <OrderItem cart={cart} />
                </Grid>
              </Grid>
              <Grid container spacing={0}>
                <Grid item sm={12} xs={12}>
                  <OrderSummary orderDetails={orderDetails} />
                </Grid>
              </Grid>
              <br />
              <br />
              <Box
                sx={{
                  borderTop: "1px solid rgba(0,0,0,0.12)",
                  paddingBottom: "15px",
                }}
              >
                <Grid container spacing={2} justifyContent="center" p={1}>
                  <Grid item sm={8} xs={12}>
                    <p className="textCenter">
                      We have received your order and will contact you as soon
                      as your package is shipped, you can find your purchase
                      information by Accessing Your
                      <Link href="/dashboard/account-information?id=0">
                        <a>
                          <u> Account. </u>
                        </a>
                      </Link>
                    </p>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
