import React from "react";
import { Box } from "@mui/material";
import Signin from "../components/route/signin/Signin";
import Head from "next/head";

export default function Sigin() {
  return (
    <>
      <Head>
        <title>Signin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={{ height: "80vh", marginTop: 5 }}>
        <Signin />
      </Box>
    </>
  );
}
