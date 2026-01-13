import React from "react";
import { Grid, Box } from "@mui/material";
import Image from "next/image";
import { IMAGE_URL } from "../../../service/serviceConfig";

export default function OrderItem({ cart }) {
  return (
    <>
      <Box sx={{ background: "#000" }}>
        <Grid container spacing={0}>
          <Grid item xs={8} sm={8}>
            <p className="text-center text-white mb-0">ITEM</p>
          </Grid>
          <Grid item xs={4} sm={4}>
            <p className="text-center text-white mb-0">TOTAL</p>
          </Grid>
        </Grid>
      </Box>
      {cart.length
        ? cart.map((item, pos) => {
            return (
              <Grid container spacing={0} key={pos} pt={2}>
                <Grid item xs={3} sm={3}>
                  <Image
                    src={`${IMAGE_URL}m_thumb/${item.p_img}`}
                    alt="Picture of the author"
                    width={300}
                    height={300}
                    layout="responsive"
                    placeholder="blur"
                    blurDataURL="/homeAsset/bckgnd.png"
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <div className="parentMarginZero">
                    <p>
                      <b>{item.product_name}</b>
                    </p>
                    <p>Sku: {item.sku}</p>
                    {item.size ? <p>Sku: {item.sku}</p> : null}
                    <p>Qty: {item.qty}</p>
                    <p>Unit Price: Tk {parseFloat(item.sales_cost)}</p>
                  </div>
                </Grid>
                <Grid item xs={3} sm={3}>
                  <div className="parentMarginZero">
                    <p>
                      <b>TK {item.qty * item.sales_cost}</b>
                    </p>
                  </div>
                </Grid>
              </Grid>
            );
          })
        : null}
    </>
  );
}
