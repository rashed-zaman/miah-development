import React, { useEffect, useState } from "react";
import { Divider, List, ListItem, Grid, Box } from "@mui/material";
import { useSelector } from "react-redux";
import OfferDiscount from "./OfferDiscount";
import Image from "next/image";
import CouponCard from "./CouponCard";

export default function OrderSummary({
  digitalDiscount,
  shippingCharge,
  type
}) {
  const ProductLength = useSelector((state) =>
    state.shoppingBag.shoppingCart.reduce((a, b) => a + (b.qty || 0), 0)
  );
  // hooks
  const shoppingBag = useSelector((state) => state.shoppingBag.shoppingCart);
  const shoppingCart = useSelector((state) => state.shoppingBag.shoppingCart);
  // const totalAmount = useSelector((state) =>
  //   state.shoppingBag.shoppingCart.reduce((a, b) => a + (b.amount || 0), 0)
  // );
  
  function calculateTotalAmount(items) {
    let totalAmount = 0;
  
    for (const item of items) {
      totalAmount += item.unitPrice * item.qty;
    }
  
    return totalAmount;
  }
  
  // // Calculate total cost of all items
  const totalAmount = calculateTotalAmount(shoppingBag);

  const billingAreas = useSelector(
    (state) => state.checkout.formInitialValue.billingArea
  );
  const offerDiscount = useSelector((state) => state.checkout.offerDiscount);
  const couponDiscountObj = useSelector((state) => state.checkout.coupon);
  const creditDiscountObj = useSelector((state) => state.checkout.credit);
  const siteOptions = useSelector((state) => state.menu.siteOptions);

  // local state
  const [tax, seTaxt] = useState(0);

  // methods

  const calculateTex = () => {
    if (totalAmount > 0) {
      const tax = (siteOptions.tax * totalAmount) / 100;
      seTaxt(tax);
    }
  };

  // site effects
  useEffect(() => {
    calculateTex();
  }, [totalAmount]);

  return (
    <>
     <Box sx={{display:{sm:'block', xs: 'none'}}}>
      <h3 className="ps-checkout__heading">Order Summary</h3>
    </Box>
      {offerDiscount.discountValue > 0 ? (
        <Box sx={{ position: "relative", padding: 2 }}>
          <Image
            src="/common-asset/cash_back_icon.svg"
            alt="Miah Banner"
            width={200}
            height={40}
            layout="intrinsic"
          />
          <Box
            sx={{
              position: "absolute",
              padding: 2,
              top: 20,
              left: 70,
            }}
          >
            <b className="miahfornt">100 Tk</b>
          </Box>
        </Box>
      ) : null}
        <List component="nav" aria-label="mailbox folders">
            <ListItem sx={{pb:{xs:'0', sm:'8px'}, pt:{xs:'0', sm:'8px'}, display:{sm:'block', xs: 'none'}}}>
              <Grid container spacing={0}>
                <Grid item xs={6}>
                  {ProductLength} items
                  {/* <b></b> */}
                </Grid>
                <Grid item xs={6} className="text-right">
                  &#2547; {totalAmount}
                  {/* <b></b> */}
                </Grid>
              </Grid>
            </ListItem>
            <ListItem sx={{pb:{xs:'0', sm:'8px'}, pt:{xs:'0', sm:'8px'}}}>
              <Grid container spacing={0}>
                <Grid item xs={6}>
                  Shipping
                </Grid>
                <Grid item xs={6} className="text-right">
                &#2547; {shippingCharge ? shippingCharge: 0}
                </Grid>
              </Grid>
            </ListItem>
            <ListItem sx={{pb:{xs:'0', sm:'8px'}, pt:{xs:'0', sm:'8px'}}}>
              <Grid container spacing={0}>
                <Grid item xs={6}>
                  Vat
                </Grid>
                <Grid item xs={6} className="text-right">
                &#2547; {tax}
                </Grid>
              </Grid>
            </ListItem>
            {/* <Divider /> */}
            {offerDiscount.discountValue > 0 ? (
              <ListItem sx={{pb:{xs:'0', sm:'8px'}, pt:{xs:'0', sm:'8px'}}}>
                <Grid container spacing={0}>
                  <Grid item xs={6}>
                    <span className="text-danger">Discount</span>
                  </Grid>
                  <Grid item xs={6} className="text-right">
                    <span className="text-danger">
                      -&#2547; {offerDiscount.discountValue}
                    </span>
                  </Grid>
                </Grid>
              </ListItem>
            ) : null}
            {couponDiscountObj.discountAmount > 0 ? (
              <ListItem sx={{pb:{xs:'0', sm:'8px'}, pt:{xs:'0', sm:'8px'}}}>
                <Grid container spacing={0}>
                  <Grid item xs={6}>
                    <span className="text-danger">Coupon</span>
                    <span className="text-danger"> ({couponDiscountObj.code})</span>
                  </Grid>
                  <Grid item xs={6} className="text-right">
                    <span className="text-danger">
                      -&#2547; {couponDiscountObj.discountAmount}
                    </span>
                  </Grid>
                </Grid>
              </ListItem>
            ) : null }
            {creditDiscountObj.amount > 0 ? (
              <>
                <Divider />
                <ListItem sx={{pb:{xs:'0', sm:'8px'}, pt:{xs:'0', sm:'8px'}}}>
                  <Grid container spacing={0}>
                    <Grid item xs={6}>
                      <span className="text-danger">Credit</span>
                    </Grid>
                    <Grid item xs={6} className="text-right">
                      <span className="text-danger">
                        -&#2547; {creditDiscountObj.amount}
                      </span>
                    </Grid>
                  </Grid>
                </ListItem>
              </>
            ) : null}
            {offerDiscount.shippingFree ? (
              <ListItem sx={{pb:{xs:'0', sm:'8px'}, pt:{xs:'0', sm:'8px'}}}>
                <Grid container spacing={0}>
                  <Grid item xs={6}>
                    <span className="text-danger">Shipping Discount</span>
                  </Grid>
                  <Grid item xs={6} className="text-right">
                    <span className="text-danger">-Tk 20</span>
                  </Grid>
                </Grid>
              </ListItem>
            ) : null}

            { digitalDiscount > 0 ? (
              <ListItem sx={{pb:{xs:'0', sm:'8px'}, pt:{xs:'0', sm:'8px'}}}>
                <Grid container spacing={0}>
                  <Grid item xs={6}>
                    <span className="text-danger">Digital Payment Discount</span>
                  </Grid>
                  <Grid item xs={6} className="text-right">
                    <span className="text-danger">&#2547; {digitalDiscount}</span>
                  </Grid>
                </Grid>
              </ListItem>
            ) : null }
            <Divider />
            <ListItem sx={{pb:{xs:'0', sm:'8px'}, pt:{xs:'0', sm:'8px'}}}>
              <Grid container spacing={0}>
                <Grid item xs={6}>
                  {
                    type == "mobile drawer" ?
                    <span>Total</span>:
                    <b>Total</b>
                  }
                </Grid>
                <Grid item xs={6} className="text-right">
                  {
                     type == "mobile drawer" ?
                     <>
                      {totalAmount +
                        tax +
                        parseInt(shippingCharge ? shippingCharge : 0 ) -
                        parseInt(digitalDiscount ? digitalDiscount : 0) -
                        offerDiscount.discountValue -
                        creditDiscountObj.amount -
                        couponDiscountObj.discountAmount}
                     </>

                  :
                  <b>
                  &#2547;{" "}
                    {totalAmount +
                      tax +
                      parseInt(shippingCharge ? shippingCharge : 0 ) -
                      parseInt(digitalDiscount ? digitalDiscount : 0) -
                      offerDiscount.discountValue -
                      creditDiscountObj.amount -
                      couponDiscountObj.discountAmount}
                  </b>
}
                </Grid>
              </Grid>
            </ListItem>
        </List>
      <OfferDiscount />
      <Box sx={{display:{xs:'none', sm:'block'}}}>
        <CouponCard/>
      </Box>
   </>
  );
}
