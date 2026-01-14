import * as React from "react";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import SelectWrapper from "./Select/SelectWrapper";
import DialogTitle from "@mui/material/DialogTitle";
import { useSelector } from "react-redux";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import Grid from "@mui/material/Grid";
import TextField from "../../shared/formUI/textField";
import commonService from "../../../service/menu/commonService";
import { MiahSubmitLoadingButton } from "../../core/button/MiahButton";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import ClearIcon from "@mui/icons-material/Clear";
import { Box } from "@mui/material";

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
  // lName: Yup.string().required("Requird"),
  // mobile: Yup.string().required("Requird"),
  // email: Yup.string().required("Requird"),
  // division: Yup.object().required("Requird"),
  // city: Yup.object().required("Requird"),
  // area: Yup.object().required("Requird"),
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function EditAddress({
  locations,
  addressToEdit,
  open,
  setOpen,
  handleDialog,
  userInfo,
  getAllAddress,
}) {
  // hooks
  // const locations = useSelector((state) => state.checkout.locations);

  const [isloading, setIsLoading] = React.useState(false);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [zipcode, setZipcode] = React.useState("");
  const [division, setDivision] = React.useState({});
  const [city, setCity] = React.useState({});
  const [area, setArea] = React.useState({});

  const [cities, setCities] = React.useState([]);
  const [areas, setAreas] = React.useState([]);

  const [addressId, setAddressId] = React.useState(0);

  const [msg, setMsg] = React.useState("");
  const handleClose = () => setOpen(false);
  const onSubmit = (values) => {
    let api = "";
    let body = {};
    if (addressToEdit.type === "billing") {
      api = "updateBilling";
      body = {
        billing_region_id: values.division.id,
        billing_city_id: values.city.id,
        billing_area_id: values.area.id,
        billing_zip_code: values.zipcode,
        billing_address: values.address,
        id: addressId,
      };
    } else {
      api = "updateShipping";
      body = {
        first_name: values.fName,
        last_name: values.lName,
        email: values.email,
        contact: values.mobile,
        shipping_region_id: values.division.id,
        shipping_city_id: values.city.id,
        shipping_area_id: values.area.id,
        shipping_zip_code: values.zipcode,
        shipping_address: values.address,
        id: addressId,
      };
    }
    setIsLoading(true);
    setMsg("");
    commonService
      .postAuthData(api, body, userInfo.token)
      .then((res) => {
        setIsLoading(false);
        setMsg(res.data.data.msg);
        getAllAddress();
        console.log(res.data.data.msg);
        // setOpen(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };
  // const handleClose = () => {
  //   handleDialog();
  // };

  const handleSetCity = (name, value) => {
    setCities(value.city);
  };
  const handleSetArea = (name, value) => {
    setAreas(value.area);
    console.log(value);
  };

  React.useEffect(() => {
    setEditData();
    setAddressId(addressToEdit.id);
  }, [addressToEdit]);

  useEffect(() => {
    if (msg === "Billing address update successfully") {
      setTimeout(() => setOpen(false), 500);
    }
  }, [msg]);

  const setEditData = () => {
    if (locations) {
      if (addressToEdit.type === "billing") {
        const billingDivision = locations.find(
          (item) => item.id === addressToEdit.billing_region_id
        );
        const billingCity = billingDivision?.city.find(
          (item) => item.id === addressToEdit.billing_city_id
        );
        const billingArea = billingCity?.area.find(
          (item) => item.id === addressToEdit.billing_area_id
        );
        setDivision(billingDivision);
        setCity(billingCity);
        setArea(billingArea);

        setCities(billingDivision.city);
        setAreas(billingCity.area);

        setFirstName(userInfo.first_name);
        setLastName(userInfo.last_name);
        setEmail(userInfo.email);
        setMobile(userInfo.phone);
        setAddress(addressToEdit.billing_address);
        setZipcode(addressToEdit.billing_zip_code);
      } else {
        const billingDivision = locations.find(
          (item) => item.id === addressToEdit.shipping_region_id
        );
        const billingCity = billingDivision?.city.find(
          (item) => item.id === addressToEdit.shipping_city_id
        );
        const billingArea = billingCity?.area.find(
          (item) => item.id === addressToEdit.shipping_area_id
        );
        setDivision(billingDivision);
        setCity(billingCity);
        setArea(billingArea);

        setCities(billingDivision.city);
        setAreas(billingCity.area);

        setFirstName(addressToEdit.first_name);
        setLastName(addressToEdit.last_name);
        setEmail(addressToEdit.email);
        setMobile(addressToEdit.contact);
        setAddress(addressToEdit.shipping_address);
        setZipcode(addressToEdit.shipping_zip_code);
      }
    }
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            UPDATE ADDRESS {addressId}
            <div className="cancelIcon" onClick={handleClose}>
              <ClearIcon />
            </div>
          </Typography>
          <Formik
            initialValues={{
              ...INITIAL_FORM_STATE,
            }}
            validationSchema={FORM_VALIDATION}
            enableReinitialize={true}
            onSubmit={onSubmit}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid size={{ sm: 6 }}>
                  <TextField
                    name="fName"
                    defaultvalue={firstName}
                    label="First Name"
                  />
                </Grid>
                <Grid size={{ sm: 6 }}>
                  <TextField
                    name="lName"
                    defaultvalue={lastName}
                    label="Last Name"
                  />
                </Grid>
                <Grid size={{ sm: 6 }}>
                  <TextField
                    name="mobile"
                    defaultvalue={mobile}
                    label="Mobile Number"
                  />
                </Grid>
                <Grid size={{ sm: 6 }}>
                  <SelectWrapper
                    optionLabel="name"
                    options={locations}
                    parentMethod={handleSetCity}
                    defaultOption={division}
                    label="Division"
                    name="division"
                  />
                </Grid>
                <Grid size={{ sm: 6 }}>
                  <SelectWrapper
                    optionLabel="name"
                    options={cities}
                    parentMethod={handleSetArea}
                    defaultOption={city}
                    label="City"
                    name="city"
                  />
                </Grid>
                <Grid size={{ sm: 6 }}>
                  <SelectWrapper
                    optionLabel="name"
                    defaultOption={area}
                    options={areas}
                    label="Area"
                    name="area"
                  />
                </Grid>
                <Grid size={{ sm: 6 }}>
                  <TextField name="email" defaultvalue={email} label="Emial" />
                </Grid>
                <Grid size={{ sm: 6 }}>
                  <TextField
                    name="zipcode"
                    defaultvalue={zipcode}
                    label="Zip Code"
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    name="address"
                    defaultvalue={address}
                    label="Address"
                  />
                </Grid>
              </Grid>
              <br />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isloading}
              >
                {isloading ? "Updating..." : "Update Address"}
              </Button>
              {/* <MiahSubmitLoadingButton type="submit" isloading={isloading}>
                update address
              </MiahSubmitLoadingButton> */}
              <div>{msg}</div>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </>
  );
}
