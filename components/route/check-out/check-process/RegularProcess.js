import React from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Button, CircularProgress, Grid, IconButton, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import EditIcon from "@mui/icons-material/Edit";

import { MiahSubmitButton } from "../../../core/button/MiahButton";
import TextFieldWrapper from "../../../shared/formUI/textField";
import Link from "next/link";
import Order from "../Order";

export default function RegularProcess({
  setMobile,
  mobile,
  btnLoading,
  setProcesstype,
  handleSubmit,
  isOtpSent,
  code,
  setCode,
  reSendOpt,
  setIsOtpSent,
  err,
}) {
  // formik
  const INITIAL_FORM_STATE = {
    mobile: mobile,
    code: code,
  };

  const FORM_VALIDATION = Yup.object().shape({
    mobile: Yup.string().required("Requird").matches(/^[0-9]{11}$/, "Mobile must be exactly 11 digits"),
    code: isOtpSent ? Yup.string().required("Requird") : "",
  });

  // methods
  const handleMobileValues = (res) => {
    setMobile(res);
  };

  const handleCodeValues = (res) => {
    setCode(res);
  };

  const handleEdit = () => {
    setIsOtpSent(false);
    setCode("");
  };

  return (
    <>
      <div className="ps-checkout">
        <div className="container">
          <h6 className="ps-checkout__title text-center py-5">Checkout</h6>
          <hr />
          <Grid container spacing={2}>
            <Grid item sm={6}>
            <Typography variant="h5" component="h5" className="mb-1">
                Choose How You Would Like To Checkout
              </Typography>
              <Typography variant="p" component="h5">
                Sign in for a faster checkout.
              </Typography>
              <br />
              <p className="mb-4">
                Please choose an option below to place order to complete your
                purchase!
              </p>
              <Formik
                initialValues={{
                  ...INITIAL_FORM_STATE,
                }}
                validationSchema={FORM_VALIDATION}
                enableReinitialize={true}
                onSubmit={() => handleSubmit()}
              >
                {({ values, handleChange, setFieldValue }) => (
                  <Form>
                    <Grid container spacing={2} className="pb-5">
                      <Grid item xs={12} sx={{ position: "relative" }}>
                        <TextFieldWrapper
                          name="mobile"
                          label="Phone Number"
                          type="text"
                          value={values.mobile}
                          onChange={handleChange}
                          readOnly={isOtpSent ? true : false}
                          onBlur={() => handleMobileValues(values.mobile)}
                        />
                        {isOtpSent && (
                          <IconButton
                            aria-label="edit"
                            onClick={handleEdit}
                            sx={{
                              position: "absolute",
                              right: 10,
                              top: "50%",
                              transform: "translate(0, -30%)",
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        )}
                      </Grid>
                      {isOtpSent && (
                        <Grid item xs={12}>
                          <TextFieldWrapper
                            name="code"
                            label="Code"
                            type="text"
                            value={values.code}
                            onChange={handleChange}
                            onBlur={() => handleCodeValues(values.code)}
                          />
                        </Grid>
                      )}
                      <Grid item xs={12}>
                        {isOtpSent && (
                          <div>
                            {err && (
                              <p className="text-danger"><b>{"Verify code dosen't match"}</b></p>
                            )}
                            <p>
                              {
                                "4 digits code was sent to your phone number. Didn't receive any OTP?"
                              }
                              <Button
                                onClick={() => reSendOpt()}
                                type="button"
                                size="small"
                                sx={{
                                  marginBottom: "2px",
                                  padding: 0,
                                  textTransform: "capitalize",
                                  fontWeight: "400",
                                }}
                              >
                                Resend
                              </Button>
                            </p>
                          </div>
                        )}
                        {!btnLoading ? (
                          <MiahSubmitButton>
                            {isOtpSent ? "Submit" : "Proceed To Checkout"}
                          </MiahSubmitButton>
                        ) : (
                          <Button
                            variant="contained"
                            fullWidth
                            size="large"
                            type="button"
                            className="pt-3"
                          >
                            <CircularProgress
                              color="inherit"
                              sx={{ marginRight: "10px" }}
                              size={18}
                            />
                          </Button>
                        )}
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        className="text-center"
                        sx={{ position: "relative" }}
                      >
                        <Link href="/signin" scroll={false}>
                          <a>
                            <Button className="text-capitalize">Sign In</Button>
                          </a>
                        </Link>
                        <span className="text-capitalize">|</span>
                        <Link href="/password-recovery" scroll={false}>
                          <a>
                            <Button className="text-capitalize">
                              Forget Password
                            </Button>
                          </a>
                        </Link>
                        <hr
                          style={{
                            position: "absolute",
                            bottom: -30,
                            left: 0,
                            width: "100%",
                          }}
                        />
                      </Grid>
                      <Grid item xs={6} className="text-right pt-1">
                        <span
                          style={{
                            background: "#ffffff",
                            position: "relative",
                            zIndex: 10,
                            padding: "0px 5px",
                            display: "inline-block",
                          }}
                        >
                          OR
                        </span>
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          fullWidth
                          onClick={() => setProcesstype("easy")}
                          type="button"
                          variant="outlined"
                          size="large"
                          className="pt-3"
                        >
                          Easy Checkout <NavigateNextIcon />
                        </Button>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Grid>
            <Grid item sm={6}>
              <Order />
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
}
