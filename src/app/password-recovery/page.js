"use client";

import React, { useState } from "react";
import { Grid, Box } from "@mui/material";
import { Formik, Form } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

import PasswordOtpContainer from "@/components/opt/PasswordOtpContainer";
import { axiosCredential, BASE_URL } from "@/service/serviceConfig";
import TextFieldWrapper from "@/components/shared/formUI/textField";
import PasswordWrapper from "@/components/shared/formUI/passwordFeild/PasswordWrapper";
import {
  MiahLoadingButton,
  MiahSubmitButton,
} from "@/components/core/button/MiahButton";

export default function PasswordRecover() {
  // hooks
  const router = useRouter();

  // form initial values
  const INITIAL_FORM_STATE = {
    phone: "",
    new_password: "",
    new_confirm_password: "",
  };

  // form validation schema
  const FORM_VALIDATION = Yup.object().shape({
    phone: Yup.string()
      .required("Requird")
      .matches(/^[0-9]{11}$/, "Mobile must be exactly 11 digits"),
    new_password: Yup.string().required("Requird"),
    new_confirm_password: Yup.string()
      .required("Please retype your password.")
      .oneOf([Yup.ref("new_password"), null], "Passwords must match"),
  });

  // local state
  const [formData, setFormData] = useState({});
  const [dialog, setDialog] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  // ================= Methods =================

  const verifySucceed = () => {
    setDialog(false);
    router.push("/signin");
  };

  const handeDialog = (status) => {
    setDialog(status);
  };

  const onSubmit = (values) => {
    setBtnLoading(true);

    axiosCredential.get("sanctum/csrf-cookie").then(() => {
      axios
        .post(BASE_URL + "forgotPassword", { phone: values.phone })
        .then((response) => {
          if (response.data.status === true) {
            setFormData(values);
            setDialog(true);
            setBtnLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setBtnLoading(false);
        });
    });

    setFormData(values);
  };

  // ================= Render =================

  return (
    <div className="container">
      <Box sx={{ height: "80vh", marginTop: 5 }}>
        <Formik
          initialValues={INITIAL_FORM_STATE}
          validationSchema={FORM_VALIDATION}
          enableReinitialize
          onSubmit={onSubmit}
        >
          <Form>
            <Grid container spacing={2} justifyContent="center">
              <Grid size={{md:3, xs:12}}>
                <h3 className="ps-ps-form__title">PASSWORD RECOVER</h3>

                <Grid container spacing={2}>
                  <Grid size={{md:12, xs:12}}>
                    <TextFieldWrapper
                      name="phone"
                      label="Mobile Number"
                      type="text"
                    />
                  </Grid>

                  <Grid size={{md:12, xs:12}}>
                    <PasswordWrapper name="new_password" label="Password" />
                  </Grid>

                  <Grid size={12}>
                    <PasswordWrapper
                      name="new_confirm_password"
                      label="Confirm Password"
                    />
                  </Grid>

                  <Grid size={12}>
                    {btnLoading ? (
                      <MiahLoadingButton />
                    ) : (
                      <MiahSubmitButton>Submit</MiahSubmitButton>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        </Formik>

        <PasswordOtpContainer
          formData={formData}
          open={dialog}
          verifySucceed={verifySucceed}
          handeDialog={handeDialog}
        />
      </Box>
    </div>
  );
}
