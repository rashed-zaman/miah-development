"use client";

import React, { useState, useEffect } from "react";
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
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import { useOrderSubmit } from "../../../hooks/useOrderHooks";
import commonService from "../../../service/menu/commonService";

import Billing from "./Billing";
import Shipping from "./Shipping";
import CardContaier from "./CardContaier";
import PaymentMathod from "./PaymentMathod";
import CheckoutOtpContainer from "../../opt/CheckoutOtpContainer";
// import FormikDebugPanel from "./FormikDebugPanel";
import Order from "./Order";
import CouponCard from "./CouponCard";

import {
  MiahLoadingButton,
  MiahSubmitButton,
} from "../../core/button/MiahButton";
import { setUserInfo } from "@/store/authSlice";
import {
  fetchDefaultAddress,
  fetchLocations,
  setHasShipping,
} from "@/store/checkoutSlice";

import { axiosCredential } from "../../../service/serviceConfig";
import { checkOutDataLayer } from "../../../service/data-layer-creator/dataLayerCreator";

export default function CheckOut({ newUserMobile }) {
  const dispatch = useDispatch();
  const route = useRouter();
  const submitOrder = useOrderSubmit();

  const INITIAL_FORM_STATE = useSelector(
    (state) => state.checkout.formInitialValue
  );
  const defaultAddress = useSelector((state) => state.checkout.defaultAddress);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const shoppingBag = useSelector((state) => state.shoppingBag.shoppingCart);

  const [formState, setFormState] = useState(INITIAL_FORM_STATE);
  const [mobileNumberDialog, setMobileNumberDialog] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [formValue, setFormValue] = useState({});
  const [otpOpen, setOtpOpen] = useState(false);
  const [otpVarifyBody, setOtpVarifyBody] = useState({});
  const [hasShipping, setLocalHasShipping] = useState(false);
  const [shippingCharge, setShippingCharge] = useState(0);
  const [digitalDiscount, setDigitalDiscount] = useState(0);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [value, setValue] = useState("old");
  const [hasLoggedIn, setHasLoggedIn] = useState(false);
  const [schema, setSchema] = useState(null);
  const [debugMode, setDebugMode] = useState(true);

  const DEBUG_LOG = (label, data) => {
    if (debugMode) {
      console.log(
        `%c🐛 [${label}]`,
        "color: #ff6b6b; font-weight: bold;",
        data
      );
    }
  };

  const registerUser = (values) => {
    const body = {
      phone: values.billigInfo.phone,
      email: values.billigInfo.email,
      first_name: values.billigInfo.fName,
      last_name: values.billigInfo.lName,
      countryid: 555,
    };

    axiosCredential.get("sanctum/csrf-cookie").then(() => {
      commonService
        .postData("userRegistration", body)
        .then((res) => {
          if (res.data.data.response === "success") {
            dispatch(setUserInfo(res.data.data));
            submitOrder(values, res.data.data.token);
          }
        })
        .catch(console.log);
    });
  };

  const handleSendOtp = (values) => {
    axiosCredential.get("sanctum/csrf-cookie").then(() => {
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
        .catch(console.log);
    });
  };

  const handleMobileDialog = () => {
    setMobileNumberDialog(false);
    setBtnLoading(false);
  };

  const verifySucceed = () => {
    submitOrder(formValue, userInfo.token);
    setBtnLoading(false);
  };

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

  const handeOtpDialog = (status) => {
    setOtpOpen(status);
    setBtnLoading(false);
  };

  const handleOrderSubmit = (values) => {
    DEBUG_LOG("FORM SUBMISSION", {
      formValues: values,
      hasShipping,
      shippingCharge,
      couponDiscount,
      digitalDiscount,
      userToken: userInfo.token ? "✓ Exists" : "✗ Missing",
    });

    values.hasShipping = hasShipping;
    if (values?.paymentType === "cash") setBtnLoading(true);

    if (userInfo.token) {
      submitOrder(values, userInfo.token, shippingCharge);
    } else {
      values.billigInfo.addNewBilling = true;
      registerUser(values);
    }
  };

  const handleHasShipping = (event) => {
    dispatch(setHasShipping(event.target.checked));
    setLocalHasShipping(event.target.checked);
  };

  const handleShippingCharge = (val) => setShippingCharge(val);
  const handleDigilatDicount = (val) => setDigitalDiscount(val);
  const handleCouponDiscount = (val) => setCouponDiscount(val);

  const createValidationSchema = () => {
    const required = Yup.object().required("Required");
    const phoneSchema = Yup.string()
      .required("Required")
      .matches(/^[0-9]{11}$/, "Must be exactly 11 digits");

    const schema = Yup.object().shape({
      billingCity: required,
      billingArea: required,
      billingDivision: required,
      shippingDivision: hasShipping ? required : Yup.mixed().notRequired(),
      shippingCity: hasShipping ? required : Yup.mixed().notRequired(),
      shippingArea: hasShipping ? required : Yup.mixed().notRequired(),
      billigInfo: Yup.object().shape({
        fName: Yup.string().required("Required"),
        lName: Yup.string().required("Required"),
        phone: phoneSchema,
        address: Yup.string().required("Required"),
        zipcode: Yup.string().required("Required"),
      }),
      shippingInfo: hasShipping
        ? Yup.object().shape({
            fName: Yup.string().required("Required"),
            lName: Yup.string().required("Required"),
            phone: phoneSchema,
            address: Yup.string().required("Required"),
            zipcode: Yup.string().required("Required"),
          })
        : Yup.mixed().notRequired(),
    });

    setSchema(schema);
  };

  useEffect(() => {
    dispatch(fetchLocations());
  }, []);

  useEffect(() => {
    checkOutDataLayer(shoppingBag);
  }, []);

  useEffect(() => {
    if (userInfo.token) {
      dispatch(fetchDefaultAddress(userInfo.token));
      setHasLoggedIn(true);
    }
  }, [userInfo]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const path = window.location.pathname || "/checkout";
      const key = `miah_checkout_refreshed:${path}`;
      if (!sessionStorage.getItem(key)) {
        sessionStorage.setItem(key, "1");
        route.refresh();
      }
    } catch (e) {
      console.warn("checkout refresh guard error", e);
    }
  }, [route]);

  useEffect(() => {
    if (!hasLoggedIn) return;

    const hasBillingAll =
      defaultAddress &&
      defaultAddress.billingAllData &&
      Object.keys(defaultAddress.billingAllData).length > 0;

    if (hasBillingAll) {
      const b = defaultAddress.billingAllData;
      const s = defaultAddress.shippingAllData || {};

      const merged = {
        ...INITIAL_FORM_STATE,
        billingDivision: b.division || INITIAL_FORM_STATE.billingDivision,
        billingCity: b.city || INITIAL_FORM_STATE.billingCity,
        billingArea: b.area || INITIAL_FORM_STATE.billingArea,
        billigInfo: {
          ...INITIAL_FORM_STATE.billigInfo,
          addNewBilling:
            b.addNew || INITIAL_FORM_STATE.billigInfo.addNewBilling,
          fName: b.fName || INITIAL_FORM_STATE.billigInfo.fName,
          lName: b.lName || INITIAL_FORM_STATE.billigInfo.lName,
          phone: b.contact || INITIAL_FORM_STATE.billigInfo.phone,
          email: b.email || INITIAL_FORM_STATE.billigInfo.email,
          address: b.address || INITIAL_FORM_STATE.billigInfo.address,
          zipcode: b.zip || INITIAL_FORM_STATE.billigInfo.zipcode,
        },
        shippingDivision: s.division || INITIAL_FORM_STATE.shippingDivision,
        shippingCity: s.city || INITIAL_FORM_STATE.shippingCity,
        shippingArea: s.area || INITIAL_FORM_STATE.shippingArea,
        shippingInfo: {
          ...INITIAL_FORM_STATE.shippingInfo,
          addNewShipping:
            s.addNew || INITIAL_FORM_STATE.shippingInfo.addNewShipping,
          fName: s.fName || INITIAL_FORM_STATE.shippingInfo.fName,
          lName: s.lName || INITIAL_FORM_STATE.shippingInfo.lName,
          phone: s.contact || INITIAL_FORM_STATE.shippingInfo.phone,
          email: s.email || INITIAL_FORM_STATE.shippingInfo.email,
          address: s.address || INITIAL_FORM_STATE.shippingInfo.address,
          zipcode: s.zip || INITIAL_FORM_STATE.shippingInfo.zipcode,
        },
      };

      setFormState(merged);
      setLocalHasShipping(INITIAL_FORM_STATE.hasShipping || false);
    } else {
      setFormState(INITIAL_FORM_STATE);
      setLocalHasShipping(INITIAL_FORM_STATE.hasShipping || false);
    }
  }, [INITIAL_FORM_STATE, hasLoggedIn, defaultAddress]);

  useEffect(() => {
    createValidationSchema();
  }, [hasShipping]);

  return (
    <div className="ps-checkout">
      <div className="container">
        <Formik
          initialValues={{ ...formState }}
          validationSchema={schema}
          enableReinitialize
          onSubmit={handleOrderSubmit}
          validate={(values) => {
            console.log("🔍 FORMIK VALIDATE CALLED", values);
            return {};
          }}
        >
          <Form>
            <Grid container spacing={2} sx={{ mb: 12 }}>
              <Grid size={{ xs: 12, sm: 8 }}>
                {userInfo.token ? (
                  <Card>
                    <CardContaier title="Billing Details">
                      <Box px={1}>
                        <Billing
                          handleShippingCharge={handleShippingCharge}
                          hasShipping={hasShipping}
                        />
                      </Box>
                      <Grid container spacing={2} px={2}>
                        <Grid size={{ xs: 12, sm: 6 }}>
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
                      {hasShipping && (
                        <Shipping
                          hasShipping={hasShipping}
                          handleShippingCharge={handleShippingCharge}
                        />
                      )}
                    </CardContaier>
                  </Card>
                ) : (
                  <Card sx={{ marginBottom: "15px" }}>
                    <CardContaier title="Billing Details">
                      <Billing
                        newUserMobile={newUserMobile}
                        handleShippingCharge={handleShippingCharge}
                      />
                      <Box px={2}>
                        <Grid container spacing={2}>
                          <Grid size={{ xs: 12, sm: 7 }}>
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
                      {hasShipping && (
                        <Shipping
                          handleShippingCharge={handleShippingCharge}
                          hasShipping={hasShipping}
                        />
                      )}
                    </CardContaier>
                  </Card>
                )}

                <Box
                  sx={{
                    display: { xs: "block", sm: "none" },
                    mt: { xs: 2, sm: 0 },
                  }}
                >
                  <CouponCard />
                </Box>

                <Card
                  sx={{ textAlign: "center", borderRadius: 1, mt: 2, py: 2 }}
                >
                  <CardContaier title="Select Payment Method">
                    <Box px={2} ml={3}>
                      <PaymentMathod
                        handleDigilatDicount={handleDigilatDicount}
                      />
                    </Box>
                  </CardContaier>
                </Card>

                <Box className="bgbutton">
                  <Box className="ps-checkout__payment">
                    {btnLoading ? (
                      <MiahLoadingButton />
                    ) : (
                      <MiahSubmitButton>Place Order</MiahSubmitButton>
                    )}
                  </Box>
                </Box>

                <Typography
                  variant="body2"
                  sx={{ mt: 1, mb: { xs: 5 }, color: "rgba(0, 0, 0, 0.6)" }}
                >
                  By clicking &apos;place order&apos;, I agree to Miah&apos;s{" "}
                  <a target="_blank" href="/page/termCondition">
                    terms & conditions
                  </a>
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <Order
                  digitalDiscount={digitalDiscount}
                  shippingCharge={shippingCharge}
                  couponDiscount={couponDiscount}
                />
              </Grid>
            </Grid>

            {/* <FormikDebugPanel showPanel={debugMode} /> */}
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

        <CheckoutOtpContainer
          otpVarifyBody={otpVarifyBody}
          formValue={formValue}
          open={otpOpen}
          handeDialog={handeOtpDialog}
          verifySucceed={verifySucceed}
        />

        <Dialog open={mobileNumberDialog} onClose={handleMobileDialog}>
          <Box p={5}>
            <p className="textCenter textRed">
              Please check your mobile Number
            </p>
          </Box>
        </Dialog>
      </div>
    </div>
  );
}
