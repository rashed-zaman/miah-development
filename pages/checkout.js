import React, { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import {
  Box,
  Checkbox,
  Dialog,
  FormGroup,
  FormControlLabel,
  Typography,
  Grid,
  Card,
} from "@mui/material";
import { Formik, Form } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "../service/serviceConfig";
import {
  fetchLocations,
  setHasShippingAction,
} from "../redux/checkout/checkoutActions";

import useSchema from "../hooks/useSchema";
import { useOrderSubmit } from "../hooks/useOrderHooks";
import { useRouter } from "next/router";
import commonService from "../service/menu/commonService";

import Billing from "../components/route/check-out/Billing";
import Shipping from "../components/route/check-out/Shipping";
import CardContaier from "../components/route/check-out/CardContaier";
import PaymentMathod from "../components/route/check-out/PaymentMathod";
import CheckoutOtpContainer from "../components/opt/CheckoutOtpContainer";
import CheckOutSignin from "../components/route/check-out/CheckOutSignin";

import {
  MiahLoadingButton,
  MiahSubmitButton,
} from "../components/core/button/MiahButton";
import Order from "../components/route/check-out/Order";
import { checkOutDataLayer } from "../service/data-layer-creator/dataLayerCreator";
import { axiosCredential } from "../service/serviceConfig";
// import CheckboxWraper from "../components/shared/formUI/checkbox/CheckboxWraper";
import { FormControl, FormLabel, Button } from "@mui/material";
// import UserSummary from "../components/route/check-out/UserSummary";
import CouponCard from "../components/route/check-out/CouponCard";
import AddressForm from "../components/route/check-out/signin/AddressForm";
import { fetchDefaultAddress } from "../redux/checkout/checkoutActions";
import axios from "axios";

export default function Checkout() {
  //=================== hooks =================
  const dispatch = useDispatch();
  const route = useRouter();
  const submitOrder = useOrderSubmit();
  const INITIAL_FORM_STATE = useSelector(
    (state) => state.checkout.formInitialValue
  );
  const userInfo = useSelector((state) => state.auth.userInfo);
  const shoppingBag = useSelector((state) => state.shoppingBag.shoppingCart);
  const persist = useSelector((state) => state);
  const [schema] = useSchema();
  // ============= state =========================
  const [formState, setFormState] = useState(INITIAL_FORM_STATE);
  const [mobileNumberDialog, setMobileNumberDialog] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [formValue, setFormValue] = useState({});
  const [otpOpen, setOtpOpen] = useState(false);
  const [otpVarifyBody, setOtpVarifyBody] = useState({});
  const [hasShipping, setHasShipping] = useState(false);
  const [shippingCharge, setShippingCharge] = useState(0);
  const [digitalDiscount, setDigitalDiscount] = useState(0);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [value, setValue] = React.useState("old");
  const [hasLoggedIn, setHasLoggedIn] = useState(false);

  // =================== methods =================
  // send otp
  const handleSendOtp = (values) => {
    axiosCredential.get("sanctum/csrf-cookie").then((res) => {
      commonService
        .postData("alienOtp", { phone: values.billigInfo.phone })
        .then((res) => {
          if (res.data.status === true) {
            setOtpOpen(true);
            verifyOtp(values);
          }
          if (res.data.status === false) {
            setMobileNumberDialog(true);
          }
        })
        .catch((error) => {
          console.log("errror", error);
        });
    });
  };

  const handleMobileDialog = () => {
    setMobileNumberDialog(false);
    setBtnLoading(false);
  };

  // verify succedd
  const verifySucceed = () => {
    submitOrder(formValue, userInfo.token);
    setBtnLoading(false);
  };

  // verify otp
  const verifyOtp = (values) => {
    const body = {
      phone: values.billigInfo.phone,
      email: values.billigInfo.email,
      first_name: values.billigInfo.fName,
      last_name: values.billigInfo.lName,
      countryid: 555,
    };
    setOtpVarifyBody(body);
    setFormValue(values);
  };

  // otp dialog
  const handeOtpDialog = (status) => {
    setOtpOpen(status);
    setBtnLoading(false);
  };

  const handleOrderSubmit = (values) => {
    // console.log('hello');
    values?.paymentType === "cash" && setBtnLoading(true);
    if (userInfo.token) {
      submitOrder(values, userInfo.token, shippingCharge);
    } else {
      values.billigInfo.addNewBilling = true;
      handleSendOtp(values);
    }
  };

  const handleHasShipping = (event) => {
    dispatch(setHasShippingAction(event.target.checked));
    setHasShipping(event.target.checked);
  };

  const handleShippingCharge = (val) => {
    setShippingCharge(val);
  };

  const handleDigilatDicount = (val) => {
    setDigitalDiscount(val);
  };

  const handleCouponDiscount = (val) => {
    setCouponDiscount(val);
  };

  // ==================== side effects ==============
  // dispatch(fetchLocations());

  useEffect(() => {
    setFormState(INITIAL_FORM_STATE);
  }, [hasLoggedIn && INITIAL_FORM_STATE ]);

  useEffect(() => {
    dispatch(fetchLocations());
  }, []);

  useEffect(() => {
    console.log("create data layer");
    checkOutDataLayer(shoppingBag);
  }, []);

  useEffect(() => {
    if (persist._persist.rehydrated) {
      if (shoppingBag.length < 1) {
        route.push("/");
      }
    }
  }, [persist]);
  // console.log(userInfo);
  useEffect(() => {
    if (userInfo.token) {
      dispatch(fetchDefaultAddress(userInfo.token));
      setHasLoggedIn(true);
    }
  }, [userInfo]);

  return (
    <>
      <div className="ps-checkout">
        <div className="container">
          <h6 className="ps-checkout__title"> Checkout</h6>
          <Grid container spacing={2}>
            <Grid item sm={8} xs={12}>
              <CheckOutSignin value={value} setValue={setValue} />
            </Grid>
          </Grid>
          <Formik
            initialValues={{
              ...formState,
            }}
            validationSchema={schema}
            enableReinitialize={true}
            onSubmit={(values) => {
              handleOrderSubmit(values);
            }}
          >
            <Form>
              <Grid container spacing={2} sx={{ mb: 12 }}>
                <Grid item sm={8} xs={12}>
                  {userInfo.token ? (
                    <Card>
                      <CardContaier
                        titleTypographyProps={{ fontSize: 122 }}
                        title="Billing Details"
                      >
                        <Box px={1}>
                            <Billing
                              handleShippingCharge={handleShippingCharge}
                              hasShipping={hasShipping}
                            />
                          {/* <UserSummary /> */}
                        </Box>
                        <Grid container spacing={2} px={2}>
                          <Grid item sm={7} md={6} xs={12}>
                            <FormGroup>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={hasShipping}
                                    onChange={handleHasShipping}
                                  />
                                }
                                label="Ship to a different address ?"
                              />
                            </FormGroup>
                          </Grid>
                        </Grid>
                        {hasShipping ? (
                          <Shipping
                            hasShipping={hasShipping}
                            handleShippingCharge={handleShippingCharge}
                          />
                        ) : null}
                      </CardContaier>
                    </Card>
                  ) : value === "new" ? (
                    <Card chekout="true" sx={{ marginBottom: "15px" }}>
                      <CardContaier
                        titleTypographyProps={{ fontSize: 122 }}
                        title="Billing Details"
                      >
                        <Billing handleShippingCharge={handleShippingCharge} />
                        <Box px={2}>
                          <Grid container spacing={2}>
                            <Grid item sm={7} md={6} xs={12}>
                              <FormGroup>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={hasShipping}
                                      onChange={handleHasShipping}
                                    />
                                  }
                                  label="Ship to a different address ?"
                                />
                              </FormGroup>
                            </Grid>
                          </Grid>
                        </Box>
                        {hasShipping ? (
                          <Shipping
                            handleShippingCharge={handleShippingCharge}
                            hasShipping={hasShipping}
                          />
                        ) : null}
                      </CardContaier>
                    </Card>
                  ) : null}
                  <Box
                    sx={{
                      display: { xs: "block", sm: "none" },
                      mt: { xs: "15px", sm: 0 },
                    }}
                  >
                    <CouponCard />
                  </Box>
                  <Card
                    sx={{
                      textAlign: "center",
                      borderRadius: "4px",
                      mt: { xs: "15px", sm: 0 },
                      py: 2,
                    }}
                  >
                    <CardContaier title="Select Payment Method">
                      <Box px={2} ml={3}>
                        <PaymentMathod
                          handleDigilatDicount={handleDigilatDicount}
                        />
                      </Box>
                    </CardContaier>
                  </Card>
                  <div className="bgbutton">
                    <div className="ps-checkout__payment">
                      {btnLoading ? (
                        <MiahLoadingButton></MiahLoadingButton>
                      ) : (
                        <MiahSubmitButton>Place Order</MiahSubmitButton>
                      )}
                    </div>
                  </div>
                  {/* <CheckboxWraper/> */}
                  <Typography
                    variant="p"
                    sx={{
                      marginTop: "7px",
                      marginBottom: { xs: "45px" },
                      fontSize: "1rem",
                      color: "rgba(0, 0, 0, 0.6)",
                      fontFamily: "Jost",
                      fontWeight: "400",
                    }}
                  >
                    By clicking &apos;place order&apos;, i agree to Miah&apos;s
                    <a target="_blank" href="/page/termCondition">
                      <u> terms & conditions </u>
                    </a>
                  </Typography>
                </Grid>
                {value === "new" || hasLoggedIn ? (
                  <Grid item sm={4} xs={12}>
                    <Order
                      digitalDiscount={digitalDiscount}
                      shippingCharge={shippingCharge}
                      couponDiscount={couponDiscount}
                    />
                  </Grid>
                ) : (
                  <Grid item sm={4} xs={12} mt={{ xs: 0, sm: -14 }}>
                    <Order
                      digitalDiscount={digitalDiscount}
                      shippingCharge={shippingCharge}
                      couponDiscount={couponDiscount}
                    />
                  </Grid>
                )}
              </Grid>
            </Form>
          </Formik>

          <button
            style={{ visibility: "hidden" }}
            id="sslczPayBtn"
            token="2345678"
            postdata=""
            order="1"
            endpoint="https://api.miah.shop/api/sslz"
            className="btn btn-primary btn-block"
          >
            Place order
          </button>

          {/* ==================== otp container ==================== */}
          <CheckoutOtpContainer
            otpVarifyBody={otpVarifyBody}
            formValue={formValue}
            open={otpOpen}
            handeDialog={handeOtpDialog}
            verifySucceed={verifySucceed}
          />
          <Dialog
            open={mobileNumberDialog}
            onClose={handleMobileDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <Box p={5}>
              <p className="textCenter textRed">
                Please check your mobile Number
              </p>
            </Box>
          </Dialog>
        </div>
      </div>
    </>
  );
}
