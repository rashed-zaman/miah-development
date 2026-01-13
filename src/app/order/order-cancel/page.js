"use client"

import { Box, Grid, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import { MiahButton } from "@/components/core/button/MiahButton";

export default function OrderFail() {
  return (
    <div>
      <Box
        sx={{
          height: "600px",
          textAlign: "center",
          textTransform: "captalize",
          padding: "100px 10px",
        }}
      >
        <Typography variant="h5">
          <span className="text-danger">
            Somethigns went worng ! <br /> with your <b> Digital Payment </b>
          </span>
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item sm="2">
            <br />
            <br />
            <br />
            <Link href="/checkout">
              <MiahButton>go to checkout</MiahButton>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
