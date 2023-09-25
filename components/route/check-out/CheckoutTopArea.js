import React from "react";
import Typography from "@mui/material/Typography";
import Link from "next/link";

export default function CheckoutTopArea() {
  return (
    <>
      <Typography
        variant="subtitle1"
        gutterBottom
        component="div"
        style={{
          margin: "5px 0px",
          fontFamily: "Jost",
        }}
      >
        Do not have account ?
        <Link href="/createaccount" scroll={false}>
          <a>
            {" "}
            <u>Create Account.</u>{" "}
          </a>
        </Link>
        <Link href="/password-recovery" scroll={false}>
          <a>
            {" "}
            <u>Forget Password. </u>{" "}
          </a>
        </Link>
      </Typography>
      <Typography
        variant="subtitle1"
        gutterBottom
        component="div"
        style={{ fontFamily: "Jost" }}
      >
        Please fill in the fields below and place order to complete your
        purchase!
      </Typography>
      <br />
    </>
  );
}
