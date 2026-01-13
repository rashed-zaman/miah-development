"use client";

import React, { useEffect } from "react";
import { Grid, Card, CardContent, Box } from "@mui/material";
import TextField from "../../shared/formUI/textField/index";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import Link from "next/link";
import { MiahSubmitButton } from "../../core/button/MiahButton";
import PasswordWrapper from "../../shared/formUI/passwordFeild/PasswordWrapper";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchUserInfo } from "@/store/authSlice";

const INITIAL_FORM_STATE = {
  email: "",
  password: "",
};

const FORM_VALIDATION = Yup.object().shape({
  email: Yup.string().required("Requird"),
  password: Yup.string().required("Requird"),
});

export default function Signin({ chekout }) {
  // hooks
  const loading = useSelector((state) => state.auth.loading);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const shoppingBag = useSelector((state) => state.shoppingBag.shoppingCart);
  const dispatch = useDispatch();
  const route = useRouter();
  // methods
  const onSubmit = (values) => {
    const body = {
      email: values.email,
      password: values.password,
    };
    dispatch(
      fetchUserInfo({
        body: body,
        localShoppingBag: shoppingBag,
      })
    );
  };

  // side effects

  useEffect(() => {
    if (userInfo.token) {
      signIn("credentials", {
        userToken: userInfo.token,
        redirect: false,
        // callbackUrl: "/dashboard/account-information?id=0",
      });
      route.push("/profile/rewards");
    }
  }, [userInfo, route.isReady]);

  return (
    <div className="container">
      <Box sx={{ marginBottom: 12, paddingBottom: 12 }}>
        <Formik
          initialValues={{
            ...INITIAL_FORM_STATE,
          }}
          validationSchema={FORM_VALIDATION}
          enableReinitialize={true}
          onSubmit={onSubmit}
        >
          <Form>
            {chekout ? (
              <Card>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 5 }}>
                      <TextField
                        name="email"
                        label="Email or Phone Number"
                        type="text"
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 5 }}>
                      {/* <TextField name="password" label="Password" type="password" /> */}
                      <PasswordWrapper label="Password" name="password" />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 2 }}>
                      <MiahSubmitButton>Sign In</MiahSubmitButton>
                    </Grid>
                    {userInfo.response === "error" ? (
                      <Grid size={{ xs: 12, sm: 12 }}>
                        <p className="textCenter text-danger">{userInfo.msg}</p>
                      </Grid>
                    ) : null}
                  </Grid>
                </CardContent>
              </Card>
            ) : (
              <Grid container spacing={2} justifyContent="center">
                <Grid item size={{ xs: 12, md: 4 }}>
                  <Grid container spacing={2}>
                    <Grid size={12}>
                      <h3 className="ps-ps-form__title"> Login </h3>
                    </Grid>
                    <Grid size={12}>
                      <TextField
                        name="email"
                        label="Email or Phone Number"
                        type="text"
                      />
                    </Grid>
                    <Grid size={12}>
                      {/* <TextField
                        name="password"
                        label="Password"
                        type="password"
                      /> */}
                      <PasswordWrapper label="Password" name="password" />
                    </Grid>
                    <Grid size={12}>
                      {userInfo.response === "error" ? (
                        <p className="textCenter text-danger">{userInfo.msg}</p>
                      ) : null}
                      <MiahSubmitButton>Sign In</MiahSubmitButton>
                      <br />
                      <br />
                      {"Don't have account ? "}
                      <Link href="/createaccount">
                        <u>Create Account.</u>
                      </Link>
                      <span style={{ marginLeft: "2px" }}> </span>
                      <Link href="/password-recovery">
                        <u>Forget Password.</u>
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Form>
        </Formik>
      </Box>
    </div>
  );
}
