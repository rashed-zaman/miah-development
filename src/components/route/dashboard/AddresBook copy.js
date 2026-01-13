import React, { useState } from "react";
import { Card, Divider, Box, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import commonService from "../../../service/menu/commonService";
import AddnewAddress from "./AddnewAddress";
import EditAddress from "./EditAddress";

export default function AddressBook() {
  // hooks
  const userInfo = useSelector((state) => state.auth.userInfo);

  // state
  const [open, setOpen] = useState(false);
  const [billingAddress, setBillingAddress] = useState([]);
  const [deaultBillingAddress, setDefaultBillingAddress] = useState({});
  const [ShippingAddress, setShippingAddress] = useState([]);
  const [defaultShippingAddress, setDefaultShippingAddress] = useState({});
  const [addressToEdit, setAddressToEdit] = useState({});

  React.useEffect(() => {
    // console.log(userInfo);
    getBillingAddress();
    getShippingAddress();
  }, []);

  const handleDialog = () => {
    setOpen(prv => !prv)
  }
  const getBillingAddress = () => {
    commonService
      .authGetData("billing", userInfo.token)
      .then((res) => {
        if (res.data.status === 1) {
          setBillingAddress(
            res.data.data.billing.filter((bill) => bill.status === 0)
          );
          setDefaultBillingAddress(
            res.data.data.billing.find((bill) => bill.status === 1)
          );
        }
      })
      .catch((err) => console.log(err));
  };
  const getShippingAddress = () => {
    commonService
      .authGetData("shipping", userInfo.token)
      .then((res) => {
        setShippingAddress(
          res.data.data.filter((shipping) => shipping.status === 0)
        );
        setDefaultShippingAddress(
          res.data.data.find((shipping) => shipping.status === 1)
        );
      })
      .catch((err) => console.log(err));
  };

  const editBilling = (address) => {
    address.type = 'Billing Address'
    setOpen(prv => !prv)
    setAddressToEdit(address)
  }
  return (
    <>
      <h1>Address Book</h1>
      <Card variant="outlined" sx={{ marginTop: "20px" }}>
        <Box>
          <h3>Add New Address</h3>
          <Divider />
        </Box>
        <Grid container spacing={2}>
        <Grid item sm={6}>
          <AddnewAddress userInfo={userInfo} />
        </Grid>
        </Grid>
      </Card>
      <Card variant="outlined" sx={{ marginTop: "20px" }}>
        <Box>
          <h3>Default Address</h3>
          <Divider />
        </Box>
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <p>
              <b>Default Billing Address</b>
            </p>
            <p>{userInfo.full_name}</p>
            <p>{/* {deaultBillingAddress.billingAllData.address} */}</p>
            <p>
              {deaultBillingAddress.areaName},{deaultBillingAddress.cityName},
              {deaultBillingAddress.billing_zip_code},
              {deaultBillingAddress.regionName}
            </p>
            <p>Bangladesh</p>
            <p>
              <b>Mobile: {userInfo.phone}</b>
            </p>
          </Grid>

          <Grid item sm={6}>
            <p>
              <b>Default Shipping Address</b>
            </p>
            <p>{userInfo.full_name}</p>
            <p>{defaultShippingAddress.shipping_address},</p>
            <p>
              {defaultShippingAddress.areaName},
              {defaultShippingAddress.cityName},
              {defaultShippingAddress.shipping_zip_code},
              {defaultShippingAddress.regionName},
            </p>
            <p>Bangladesh</p>
            <p>
              <b>Mobile: {defaultShippingAddress.contact}</b>
            </p>
          </Grid>
        </Grid>
      </Card>
      <Card variant="outlined" sx={{ marginTop: "20px" }}>
        <Box>
          <h3>Billing Address</h3>
          <Divider />
        </Box>
        <Grid container spacing={2}>
          {billingAddress.map((billing, pos) => {
            return (
              <Grid item sm={6} key={pos}>
                <p>{userInfo.full_name}</p>
                <p>{billing.billing_address}</p>
                <p>
                  {billing.areaName},{billing.cityName},
                  {billing.billing_zip_code},{billing.regionName}
                </p>
                <p>Bangladesh</p>
                <p>
                  <b>Mobile: {userInfo.phone}</b>
                </p>
                <button onClick={() => editBilling(billing)}>Edit</button>
                <button>Dlete</button>
              </Grid>
            );
          })}
        </Grid>
      </Card>

      <Card variant="outlined" sx={{ marginTop: "20px" }}>
        <Box>
          <h3>Shipping Address</h3>
          <Divider />
        </Box>
        <Grid container spacing={2}>
          {ShippingAddress
            ? ShippingAddress.map((billing, pos) => {
                return (
                  <Grid item sm={6} key={pos}>
                    <p>
                      {billing.first_name} {billing.last_name}
                    </p>
                    <p>{billing.shipping_address}</p>
                    <p>
                      {billing.areaName},{billing.cityName},
                      {billing.shipping_zip_code},{billing.regionName}
                    </p>
                    <p>Bangladesh</p>
                    <p>
                      <b>Mobile: {userInfo.phone}</b>
                    </p>
                    <button>Edit</button>
                    <button>Dlete</button>
                  </Grid>
                );
              })
            : null}
        </Grid>
      </Card>
      {
        open
        ?
        (
          <EditAddress addressToEdit={addressToEdit} userInfo={userInfo} open={ open } handleDialog={handleDialog} />
        )
        :
        null
      }
    </>
  );
}
