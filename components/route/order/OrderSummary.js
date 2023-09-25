import React from "react";
import { Grid, Box, Button } from "@mui/material";

export default function OrderSummary({ orderDetails }) {
  return (
    <>
      {orderDetails ? (
        <Grid container spacing={0} mt={5}>
          <Grid item sm={8} xs={6} pl={2} pt={2}>
            <Box>
              <Grid
                container
                spacing={0}
                justifyContent="center"
                className="mb-2"
              >
                <Grid item sm={4} xs={12}>
                  <Button variant="contained" fullWidth size="small">
                    Cash back TK {orderDetails.cash_back}
                  </Button>
                </Grid>
              </Grid>
              <Grid container spacing={0} justifyContent="center">
                <Grid item sm={4} xs={12}>
                  <Button variant="contained" fullWidth size="small">
                    Rewards Point {orderDetails.reward_point}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item sm={4} xs={6}>
            <Box sx={{ borderTop: "1px solid rgba(0, 0, 0, 0.12)" }}>
              <Grid container spacing={2}>
                <Grid xs={6} sm={6} item>
                  <Box sx={{ textAlign: "right" }}>Subtotal</Box>
                </Grid>
                <Grid xs={6} sm={6} item>
                  <Box sx={{ textAlign: "left" }}>
                    Tk {parseFloat(orderDetails.cart_total)}
                  </Box>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid xs={6} sm={6} item>
                  <Box sx={{ textAlign: "right" }}>Shipping</Box>
                </Grid>
                <Grid xs={6} sm={6} item>
                  <Box sx={{ textAlign: "left" }}>
                    Tk {parseFloat(orderDetails.shipping)}
                  </Box>
                </Grid>
              </Grid>
              {orderDetails.credit_amount > 0 ? (
                <Grid container spacing={2}>
                  <Grid xs={6} sm={6} item>
                    <Box sx={{ textAlign: "right", color: "red" }}>Credit</Box>
                  </Grid>
                  <Grid xs={6} sm={6} item>
                    <Box sx={{ textAlign: "left", color: "red" }}>
                      -Tk {parseFloat(orderDetails.credit_amount)}
                    </Box>
                  </Grid>
                </Grid>
              ) : null}

              {orderDetails.credit_amount > 0 ? (
                <Grid container spacing={2}>
                  <Grid xs={6} sm={6} item>
                    <Box sx={{ textAlign: "right", color: "red" }}>
                      Discount
                    </Box>
                  </Grid>
                  <Grid xs={6} sm={6} item>
                    <Box sx={{ textAlign: "left", color: "red" }}>
                      -Tk{" "}
                      {parseFloat(orderDetails.credit_amount) -
                        -parseFloat(orderDetails.credit_amount)}
                    </Box>
                  </Grid>
                </Grid>
              ) : null}
              <Grid container spacing={2}>
                <Grid xs={6} sm={6} item>
                  <Box sx={{ textAlign: "right" }}>Tax</Box>
                </Grid>
                <Grid xs={6} sm={6} item>
                  <Box sx={{ textAlign: "left" }}>
                    Tk {parseFloat(orderDetails.tax)}
                  </Box>
                </Grid>
              </Grid>
              {orderDetails.discount_amount > 0 ? (
                <Grid container spacing={2}>
                  <Grid xs={6} sm={6} item>
                    <Box sx={{ textAlign: "right", color:'red' }}>Discount</Box>
                  </Grid>
                  <Grid xs={6} sm={6} item>
                    <Box sx={{ textAlign: "left", color:'red' }}>
                      - Tk {parseFloat(orderDetails.discount_amount)}
                    </Box>
                  </Grid>
                </Grid>
              ) : null}
              <Grid container spacing={2}>
                <Grid xs={6} sm={6} item>
                  <Box sx={{ textAlign: "right" }}>
                    <b>Total</b>
                  </Box>
                </Grid>
                <Grid xs={6} sm={6} item>
                  <Box sx={{ textAlign: "left" }}>
                    <b>Tk {parseFloat(orderDetails.grand_total)}</b>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      ) : null}
    </>
  );
}
