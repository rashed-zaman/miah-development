import React, { useState, useEffect } from "react";
import { Card, Box, Grid, Button, Divider } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import commonService from "../../../service/menu/commonService";
import AddnewAddress from "./AddnewAddress";
import EditAddress from "./EditAddress";
import { fetchLocations } from "../../../redux/checkout/checkoutActions";

export default function AddressBook() {
  // hooks
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const locations = useSelector((state) => state.checkout.locations);

  // state
  const [open, setOpen] = useState(false);
  const [newAddress, setNewAddress] = useState(false);
  const [billingAddress, setBillingAddress] = useState([]);
  const [deaultBillingAddress, setDefaultBillingAddress] = useState({});
  const [ShippingAddress, setShippingAddress] = useState([]);
  const [defaultShippingAddress, setDefaultShippingAddress] = useState({});
  const [addressToEdit, setAddressToEdit] = useState({});

  // methods
  const handleDialog = () => {
    setOpen((prv) => !prv);
  };

  const handeShowHideNewAdd = () => {
    setNewAddress((prv) => !prv);
  };
  const getBillingAddress = () => {
    dispatch(fetchLocations());
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
      .catch((err) => {
        console.log(err)
        if (err.response.status == 401 || "401") {
          localStorage.clear();
          location.reload();
          console.log(err);
        }
      });
  };

  const editBilling = (address, type) => {
    address.type = type;
    setOpen((prv) => !prv);
    setAddressToEdit(address);
    console.log(address);
  };

  const setDefaultAddress = (id, type) => {
    commonService
      .authGetData(type + "/" + id, userInfo.token)
      .then((res) => {
        getBillingAddress();
        getShippingAddress();
      })
      .catch((err) => console.log(err));
  };

  const deleteAddress = (id, type) => {
    commonService
      .authGetData(type + "/" + id, userInfo.token)
      .then((res) => {
        getBillingAddress();
        getShippingAddress();
      })
      .catch((err) => console.log(err));
  };

  const getAllAddress = () => {
    getBillingAddress();
    getShippingAddress();
  };
  // side effects
  useEffect(() => {
    getAllAddress();
  }, [userInfo]);

  return (
    <>
      <h3>Address Book</h3>
      <Button
        variant="contained"
        sx={{
          borderColor: "#000",
          background: "#000",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#9a7448",
            borderColor: "#9a7448",
          },
        }}
        size="small"
        onClick={handeShowHideNewAdd}
      >
        Add new address
      </Button>
      {newAddress ? (
        <Card variant="outlined" sx={{ marginTop: "20px" }}>
          <Box
            sx={{
              borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
              padding: "0px 15px",
            }}
          >
            <h4>Add New Address</h4>
          </Box>
          <Box
            sx={{
              borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
              padding: "10px 8px",
            }}
          >
            <Grid container spacing={2}>
              <Grid item sm={6} xs={12}>
                <AddnewAddress
                  userInfo={userInfo}
                  getAllAddress={getAllAddress}
                />
              </Grid>
            </Grid>
          </Box>
        </Card>
      ) : null}
      <Card variant="outlined" sx={{ marginTop: "20px" }}>
        <Box
          sx={{
            borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
            padding: "0px 15px",
            paddingTop: "5px",
          }}
        >
          <h4>Default Address</h4>
        </Box>
        <Grid container spacing={2}>
          <Grid item sm={6} xs={12}>
            <Box sx={{ padding: "5px 15px" }}>
              <p>
                <b>Default Billing Address</b>
              </p>
            </Box>
            {deaultBillingAddress ? (
              <Box className="parentMarginZero" sx={{ padding: "5px 15px" }}>
                <p>{userInfo.full_name}</p>
                <p>{deaultBillingAddress.billing_address}</p>
                <p>
                  {deaultBillingAddress.areaName},
                  {deaultBillingAddress.cityName},
                  {deaultBillingAddress.billing_zip_code},
                  {deaultBillingAddress.regionName}
                </p>
                <p>Bangladesh</p>
                <p>
                  <b>Mobile: {userInfo.phone}</b>
                </p>
              </Box>
            ) : (
              <p className="textCenter">No default billing address found</p>
            )}
          </Grid>
          <Grid item xs={12} sx={{ display: { xs: "block", sm: "none" } }}>
            <Divider />
          </Grid>
          <Grid item sm={6} xs={12}>
            <Box sx={{ padding: "5px 15px" }}>
              <p>
                <b>Default Shipping Address</b>
              </p>
            </Box>
            {defaultShippingAddress ? (
              <Box className="parentMarginZero" sx={{ padding: "5px 15px" }}>
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
              </Box>
            ) : (
              <p className="textCenter">No default shipping address found</p>
            )}
          </Grid>
        </Grid>
      </Card>
      <Card variant="outlined" sx={{ marginTop: "20px" }}>
        <Box
          sx={{
            borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
            padding: "0px 15px",
            paddingTop: "5px",
          }}
        >
          <h4>Billing Address</h4>
        </Box>
        <Grid container spacing={2}>
          {billingAddress.map((billing, pos) => {
            return (
              <Grid item sm={6} xs={12} key={pos}>
                <Box className="parentMarginZero" sx={{ padding: "5px 15px" }}>
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
                  <Grid container spacing={0}>
                    <Grid item xs={6}>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{
                          borderColor: "#000",
                          background: "transpatent",
                          color: "#000",
                          marginRight: "5px",
                          "&:hover": {
                            backgroundColor: "#000",
                            borderColor: "#000",
                            color: "#fff",
                          },
                        }}
                        onClick={() => editBilling(billing, "billing")}
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() =>
                          deleteAddress(billing.id, "removeBilling")
                        }
                      >
                        Dlete
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        onClick={() =>
                          setDefaultAddress(billing.id, "defaultBilling")
                        }
                        variant="contained"
                        size="small"
                        sx={{
                          borderColor: "#000",
                          background: "#000",
                          color: "#fff",
                          "&:hover": {
                            backgroundColor: "#9a7448",
                            borderColor: "#9a7448",
                          },
                        }}
                      >
                        set as defualt
                      </Button>
                    </Grid>
                  </Grid>
                  <Divider />
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Card>

      <Card variant="outlined" sx={{ marginTop: "20px" }}>
        <Box
          sx={{
            borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
            padding: "0px 15px",
            paddingTop: "7px",
          }}
        >
          <h4>Shipping Address</h4>
        </Box>
        <Grid container spacing={2}>
          {ShippingAddress &&
            ShippingAddress.map((shipping, pos) => {
              return (
                <Grid item sm={6} xs={12} key={pos}>
                  <Box
                    className="parentMarginZero"
                    sx={{ padding: "5px 15px" }}
                  >
                    <p>
                      {shipping.first_name} {shipping.last_name}
                    </p>
                    <p>{shipping.shipping_address}</p>
                    <p>
                      {shipping.areaName},{shipping.cityName},
                      {shipping.shipping_zip_code},{shipping.regionName}
                    </p>
                    <p>Bangladesh</p>
                    <p>
                      <b>Mobile: {userInfo.phone}</b>
                    </p>
                    <Grid container spacing={0}>
                      <Grid item xs={6}>
                        <Button
                          onClick={() => editBilling(shipping, "shipping")}
                          variant="outlined"
                          size="small"
                          sx={{
                            borderColor: "#000",
                            background: "trasparent",
                            color: "#000",
                            marginRight: "5px",
                            "&:hover": {
                              backgroundColor: "#000",
                              borderColor: "#000",
                              color: "#fff",
                            },
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() =>
                            deleteAddress(shipping.id, "removeShipping")
                          }
                        >
                          Dlete
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Button
                          onClick={() =>
                            setDefaultAddress(shipping.id, "defaultShipping")
                          }
                          variant="contained"
                          size="small"
                          sx={{
                            borderColor: "#000",
                            background: "#000",
                            color: "#fff",
                            "&:hover": {
                              transform: "transletY(-5px)",
                            },
                          }}
                        >
                          set as defualt
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              );
            })}
        </Grid>
      </Card>
      {open && (
        <EditAddress
          addressToEdit={addressToEdit}
          getAllAddress={getAllAddress}
          userInfo={userInfo}
          open={open}
          handleDialog={handleDialog}
          locations={locations}
        />
      )}
    </>
  );
}
