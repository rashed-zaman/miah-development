"use client"

import Signin from "@/components/route/signin/Signin"
import { Box } from "@mui/material"
import Head from "next/head"


export default function SignInPage() {
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
