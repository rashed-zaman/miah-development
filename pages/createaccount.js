import React, { useState, useEffect } from "react";
import { Grid, Button, CircularProgress, Box } from "@mui/material";
import TextField from "../components/shared/formUI/textField/index";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import OtpContainer from "../components/opt/OtpContainer";
import axios from "axios";
import { axiosCredential, BASE_URL } from "../service/serviceConfig";
import Select from "../components/shared/formUI/select";
import Autocomplete from "../components/shared/formUI/autocomplete";
import Link from "next/link";
import { MiahSubmitButton } from "../components/core/button/MiahButton";
import commonService from "../service/menu/commonService";
import { useRouter } from "next/router";
import PasswordWrapper from "../components/shared/formUI/passwordFeild/PasswordWrapper";

const INITIAL_FORM_STATE = {
  title: "",
  country: "",
  phone: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const FORM_VALIDATION = Yup.object().shape({
  title: Yup.object().required("Requird"),
  country: Yup.object().required("Requird"),
  phone: Yup.string().required("Requird"),
  firstName: Yup.string().required("Requird"),
  lastName: Yup.string().required("Requird"),
  email: Yup.string().required("Requird"),
  password: Yup.string().required("Requird"),
  confirmPassword: Yup.string()
    .required("Requird")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export default function Createaccount() {
  // hooks
  const route = useRouter();
  const iniTitle = [
    {
      id: 1,
      name: "Mr.",
    },
    {
      id: 2,
      name: "Mrs.",
    },
  ];

  // locat state
  const [title] = useState(iniTitle);
  const [countries, setcountries] = useState([]);
  const [formData, setformData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [dialog, setDialog] = useState(false);

  // side effects
  useEffect(() => {
    axios
      .get(BASE_URL + "country")
      .then(function (response) {
        // handle success
        setcountries(response.data.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  const handeDialog = (status) => {
    setDialog(status);
  };

  const createNewUser = (formData) => {
    commonService
      .postData("register", formData)
      .then((res) => {
        if (res.data.data.response === "success") {
          setDialog(false);
          route.push("/signin");
        } else {
          setErrMsg(res.data.msg);
        }
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const verifySucceed = () => {
    createNewUser(formData);
  };

  const onSubmit = (values) => {
    setLoading(true);
    setErrMsg("");
    const body = {
      title: values.title.name,
      countryid: values.country.id,
      phone: values.phone,
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      password: values.password,
      confirm_password: values.confirmPassword,
    };

    axiosCredential.get("sanctum/csrf-cookie").then((res) => {
      axios
        .post(BASE_URL + "otp", { phone: values.phone, email: values.email })
        .then(function (response) {
          if (response.data.status === true) {
            setformData(body);
            setDialog(true);
            setLoading(false);
            // setformData(values)
          }
          if (response.data.status === false) {
            setLoading(false);
            setErrMsg(response.data.msg);
          }
          // setformData(values)
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  };

  const logVal = () => {
    console.log(formData);
  };

  return (
    <div className="container">
      <Box sx={{ minHeight: "80vh", marginTop: 5, marginBottom: 15 }}>
        <Formik
          initialValues={{
            ...INITIAL_FORM_STATE,
          }}
          validationSchema={FORM_VALIDATION}
          enableReinitialize={true}
          onSubmit={onSubmit}
        >
          <Form>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} md={6}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <h3 className="ps-ps-form__title"> Create Account</h3>
                  </Grid>
                  <Grid item xs={12}>
                    <Select
                      name="title"
                      label="Title"
                      optionLabel="name"
                      options={title}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Autocomplete
                      name="country"
                      label="Country"
                      optionLabel="country"
                      options={countries}
                    />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <TextField name="phone" label="Mobile Number" />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField name="firstName" label="First Name" />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField name="lastName" label="Last Name" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField name="email" label="Email" type="email" />
                  </Grid>
                  <Grid item xs={12}>
                    <PasswordWrapper name="password" label="Password" />
                  </Grid>
                  <Grid item xs={12}>
                    <PasswordWrapper
                      name="confirmPassword"
                      label="Confirm Password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <p className="textCenter text-danger">{errMsg}</p>
                    {loading ? (
                      <Button variant="contained" fullWidth>
                        <CircularProgress
                          color="inherit"
                          sx={{ marginRight: "10px" }}
                          size={18}
                        />
                      </Button>
                    ) : (
                      <MiahSubmitButton>Submit</MiahSubmitButton>
                    )}
                    {/* <MiahSubmitButton>Submit</MiahSubmitButton> */}
                    <br />
                    <br />
                    Already Have An Account ?
                    <Link href="/signin" scroll={false}>
                      <a>
                        {" "}
                        <u> Signin. </u>{" "}
                      </a>
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        </Formik>
        {/* <button onClick={logVal}>Log value</button> */}
        <OtpContainer
          phoneNumber={formData.phone}
          email={formData.email}
          open={dialog}
          verifySucceed={verifySucceed}
          handeDialog={handeDialog}
        />
      </Box>
    </div>
  );
}
