import React from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import Image from "next/image";
import Divider from "@mui/material/Divider";
import CouponCard from "./CouponCard";
import { IMAGE_URL } from "../../../service/serviceConfig";
import Moment from "react-moment";

export default function ReveiwOrder() {
  const shoppingCart = useSelector((state) => state.shoppingBag.shoppingCart);
  const totalAmount = useSelector((state) =>
    state.shoppingBag.shoppingCart.reduce((a, b) => a + (b.amount || 0), 0)
  );
  const date = new Date();
  return (
    <>
      <p>Estimate Delivery Date:</p>
      <p>
        <b>
          {/* <Moment add={{ days: 7 }} format="MMMM Do YYYY">
            {date}
          </Moment>{" "}
          -{" "}
          <Moment add={{ days: 15 }} format="MMMM Do YYYY">
            {date}
          </Moment> */}
        </b>
      </p>
      <h4 style={{ textAlign: "right" }}>Subtotal: Tk {totalAmount}</h4>

      <Box>
        {shoppingCart.map((item, pos) => {
          return (
            <Grid container key={pos} spacing={2} mb={1}>
              <Grid item md={3} xs={3}>
                <Image
                  src={`${IMAGE_URL}${item.image}`}
                  alt="Picture of the author"
                  width={300}
                  height={300}
                  layout="responsive"
                />
              </Grid>
              <Grid item md={4} xs={6}>
                <p className="marginTopZero">
                  <b>{item.name}</b>
                </p>
                <p>Qty: {item.qty}</p>
                <p>Unit Price: {item.unitPrice}</p>
              </Grid>
              <Grid item md={5} xs={3}>
                <Box sx={{ textAlign: "right" }}>
                  <p>
                    <b>Tk {item.amount}</b>
                  </p>
                </Box>
              </Grid>
            </Grid>
          );
        })}
        <br />
        <Divider />
        <br />
        <br />
        <CouponCard />
      </Box>
    </>
  );
}
