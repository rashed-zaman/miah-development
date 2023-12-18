import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import { MenuItem, Box, Grid, Button } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "../../shared/formUI/textField";
import SelectWrapper from "./Select/SelectWrapper";
import { useSelector, useDispatch } from "react-redux";
import { fetchLocations } from "../../../redux/checkout/checkoutActions";
import commonService from "../../../service/menu/commonService";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { MiahSubmitLoadingButton } from "../../core/button/MiahButton";

const INITIAL_FORM_STATE = {
  fName: "",
  lName: "",
  email: "",
  address: "",
  mobile: "",
  division: "",
  city: "",
  area: "",
  zipcode: "",
};

const FORM_VALIDATION = Yup.object().shape({
  fName: Yup.string().required("Requird"),
  lName: Yup.string().required("Requird"),
  mobile: Yup.string().required("Requird"),
  email: Yup.string().required("Requird"),
  division: Yup.object().required("Requird"),
  city: Yup.object().required("Requird"),
  area: Yup.object().required("Requird"),
  zipcode: Yup.string().required("zipcode"),
  address: Yup.string().required("address"),
});

export default function AddnewAddress({ userInfo, getAllAddress,setOpenM }) {
  // hooks
  const locations = useSelector((state) => state.checkout.locations);
  const dispatch = useDispatch();

  // state

  const [msg, setMsg] = useState("");
  const [isloading, setIsLoading] = React.useState(false);
  const [selectedType, setSelectedType] = useState("Billing Address");
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [firstName, setFirstName] = useState([]);
  const [lastName, setLastName] = useState([]);
  const [mobile, setMobile] = useState([]);
  const [email, setEmail] = useState([]);

  //  methods
  const handleChange = (event) => {
    setSelectedType(event.target.value);
  };
  const onSubmit = (values, { resetForm }) => {
    if (selectedType === "Billing Address") {
      saveBillingAddress(values, resetForm);
    } else {
      saveShippingAddress(values, resetForm);
    }
  };

  const handleSetCity = (name, value) => {
    setCities(value.city);
  };
  const handleSetArea = (name, value) => {
    setAreas(value.area);
  };

  const saveBillingAddress = (formValue, resetForm) => {
    setMsg("");
    setIsLoading(true);
    const body = {
      billing_region_id: formValue.division.id,
      billing_city_id: formValue.city.id,
      billing_area_id: formValue.area.id,
      billing_zip_code: formValue.zipcode,
      billing_address: formValue.address,
    };
    commonService
      .postAuthData("billing", body, userInfo.token)
      .then((res) => {
        if (res.data.status === "success") {
          setMsg(res.data.data.msg);
          setIsLoading(false);
          getAllAddress();
          resetForm();
        }
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const saveShippingAddress = (formValue, resetForm) => {
    setMsg("");
    setIsLoading(true);
    const body = {
      first_name: formValue.fName,
      last_name: formValue.lName,
      email: formValue.email,
      contact: formValue.mobile,
      shipping_region_id: formValue.division.id,
      shipping_city_id: formValue.city.id,
      shipping_area_id: formValue.area.id,
      shipping_zip_code: formValue.zipcode,
      shipping_address: formValue.address,
    };
    commonService
      .postAuthData("shipping", body, userInfo.token)
      .then((res) => {
        if (res.data.status === "success") {
          setMsg(res.data.data.msg);
          getAllAddress();
          resetForm();
          setIsLoading(false);
        }
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //  side effects

  React.useEffect(() => {
    dispatch(fetchLocations());
    console.log(userInfo);
  }, []);

  React.useEffect(() => {
    if (selectedType === "Billing Address") {
      setFirstName(userInfo.first_name);
      setLastName(userInfo.last_name);
      setEmail(userInfo.email);
      setMobile(userInfo.phone);
    }
    if (selectedType === "Shipping Address") {
      setFirstName("");
      setLastName("");
      setEmail("");
      setMobile("");
    }
  }, [selectedType]);

  useEffect(() => {
    if(msg === 'Billing address added successfully' || msg === 'Shipping address added successfully'){
      setTimeout(()=>setOpenM(false),500)
    }
  }, [msg]);
  return (
    <>
      <Formik
        initialValues={{
          ...INITIAL_FORM_STATE,
        }}
        validationSchema={FORM_VALIDATION}
        enableReinitialize={true}
        onSubmit={onSubmit}
      >
        <Form>
          <Box sx={{ minWidth: '100%', padding: "5px 8px" }}>
            <Grid container spacing={2}>
              <Grid item sm={6} xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Address Type</InputLabel>
                  <Select
                    value={selectedType}
                    label="Address Type"
                    helpertext="req"
                    onChange={handleChange}
                  >
                    <MenuItem value="Billing Address">
                      {" "}
                      Billing Address{" "}
                    </MenuItem>
                    <MenuItem value="Shipping Address">
                      {" "}
                      Shipping Address{" "}
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <br />
            <Grid container columnSpacing={1} spacing={2}>
              <Grid item sm={12} xs={12}>
                <TextField
                  name="email"
                  label="Email"
                  defaultvalue={email}
                  type="email"
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  name="fName"
                  defaultvalue={firstName}
                  label="First Name"
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  name="lName"
                  defaultvalue={lastName}
                  label="Last Name"
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                <TextField name="mobile" defaultvalue={mobile} label="Mobile" />
              </Grid>
              <Grid item sm={6} xs={12}>
                <SelectWrapper
                  optionLabel="name"
                  parentMethod={handleSetCity}
                  options={locations}
                  label="Division"
                  name="division"
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <SelectWrapper
                  optionLabel="name"
                  parentMethod={handleSetArea}
                  options={cities}
                  label="City"
                  name="city"
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <SelectWrapper
                  optionLabel="name"
                  options={areas}
                  label="area"
                  name="area"
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField name="zipcode" label="Zipcode" />
              </Grid>
              <Grid item sm={12} xs={12}>
                <TextField name="address" label="Address" />
              </Grid>
            </Grid>
            <br />
            <Button variant="contained" size="small" type="submit" fullWidth isloading={isloading}>
              submit
            </Button>
            {/* <MiahSubmitLoadingButton  type="submit" isloading={isloading}>
              submit
            </MiahSubmitLoadingButton> */}
            <div>{msg}</div>
          </Box>
        </Form>
      </Formik>
    </>
  );
}
