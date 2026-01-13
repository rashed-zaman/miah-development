import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import PasswordWrapper from "../../shared/formUI/passwordFeild/PasswordWrapper";
import { MiahSubmitButton, MiahLoadingButton } from "../../core/button/MiahButton";
import commonService from "../../../service/menu/commonService";
import { axiosCredential } from "../../../service/serviceConfig";

const INITIAL_FORM_STATE = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const FORM_VALIDATION = Yup.object().shape({
  oldPassword: Yup.string().required("Requird"),
  newPassword: Yup.string().required("Requird"),
  confirmPassword: Yup.string()
    .required("Requird")
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
});

export default function ChangePassword({userInfo, setOpenc}) {
  const [loadding, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const onSubmit = (values, { resetForm }) => {
    setLoading(true);
    setMsg("");
    const body = {
      current_password: values.oldPassword,
      new_password: values.newPassword,
      new_confirm_password: values.confirmPassword,
    };

    axiosCredential.get("sanctum/csrf-cookie").then((res) => {
      commonService
        .postAuthData("updatePassword", body, userInfo.token)
        .then((res) => {
          setLoading(false);
          if (res.data.status === true) {
            setMsg(res.data.data);
            resetForm();
          }
          if (res.data.status === "error") {
            setMsg(res.data.msg.current_password[0]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    })
  };
  useEffect(() => {
    if(msg === 'Password update successfully' || msg==='The current password is match with old password.'){
      setTimeout(()=>setOpenc(false),500)
    }
  }, [msg]);
  return (
    <Formik
      initialValues={{
        ...INITIAL_FORM_STATE,
      }}
      validationSchema={FORM_VALIDATION}
      enableReinitialize={true}
      onSubmit={onSubmit}
    >
      <Form>
        <Box px={2} py={1}>
          <Grid container spacing={2}>
            <Grid item sm={12} xs={12}>
              <PasswordWrapper label="Old Password" name="oldPassword" />
            </Grid>
            <Grid item sm={12} xs={12}>
              <PasswordWrapper label="New Password" name="newPassword" />
            </Grid>
            <Grid item sm={12} xs={12}>
              <PasswordWrapper
                label="Confirm Password"
                name="confirmPassword"
              />
            </Grid>
            <Grid item sm={12} xs={12}>
              <p style={{ textAlign: "center" }}>{msg}</p>
              {!loadding ? (
                <MiahSubmitButton>Change Password</MiahSubmitButton>
              ) : (
                <MiahLoadingButton>processing</MiahLoadingButton>
              )}
            </Grid>
          </Grid>
        </Box>
      </Form>
    </Formik>
  );
}
