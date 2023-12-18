import React, { useState, useEffect } from "react";
import { Card, Box, Grid, Button, Divider } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import commonService from "../../../service/menu/commonService";
import AddnewAddress from "./AddnewAddress";
import EditAddress from "./EditAddress";
import { fetchLocations } from "../../../redux/checkout/checkoutActions";
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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
  const [msg, setMsg] = useState("");
  const [openM, setOpenM] = React.useState(false);
  const handleOpen = () => setOpenM(true);
  const handleClose = () => setOpenM(false);

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
      .catch((err) => console.log(err));
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
      <Card variant="outlined">
        <Box
          sx={{
            padding: "0px 15px",
            paddingTop: '5px',
            paddingBottom: '60px',
          }}
        >
          <div className="pt-15">
            <h3>ADDRESS BOOK</h3>
          </div>
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
            size="medium"
            // onClick={handeShowHideNewAdd}
            onClick={handleOpen}
          >
            Add new address
          </Button>
          <Modal
            open={openM}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Add New Address
                <div className="cancelIcon" onClick={handleClose}>
                  <ClearIcon />
                </div>
              </Typography>
              <Box
                sx={{
                  padding: "10px 8px",
                  width: '100%'
                }}
              >
                <Grid container spacing={2}>
                  <Grid item sm={12} xs={12}>
                    <AddnewAddress
                      userInfo={userInfo}
                      getAllAddress={getAllAddress}
                      setOpenM={setOpenM}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Modal>
          <div className="pt-15">
            {/* <h3>Default Address</h3> */}
          </div>
          <Grid container spacing={2}>
            <Grid item sm={6} xs={12}>
              <Box sx={{ padding: "5px 15px", border: '1px solid', minHeight: '236px' }}>
                <p>
                  <b>Default Billing Address</b>
                </p>
                {deaultBillingAddress ? (
                  <>
                    <p>{userInfo.full_name}</p>
                    <p>{deaultBillingAddress.billing_address},
                      {deaultBillingAddress.areaName}-
                      {deaultBillingAddress.billing_zip_code},
                      {deaultBillingAddress.cityName},
                      {deaultBillingAddress.regionName}
                    </p>
                    <p>Bangladesh</p>
                    <p>
                      <b>Mobile: {userInfo.phone}</b>
                    </p>
                  </>
                ) : (
                  <p className="textCenter">No default billing address found</p>
                )
                }
              </Box>
            </Grid>
            <Grid item xs={12} sx={{ display: { xs: "block", sm: "none" } }}>
              <Divider />
            </Grid>
            <Grid item sm={6} xs={12}>
              <Box sx={{ padding: "5px 15px", border: '1px solid', minHeight: '236px' }}>
                <p>
                  <b>Default Shipping Address</b>
                </p>
                {defaultShippingAddress ? (
                  <>
                    <p>{userInfo.full_name}</p>
                    <p>{defaultShippingAddress.shipping_address},
                      {defaultShippingAddress.areaName}-
                      {defaultShippingAddress.shipping_zip_code},
                      {defaultShippingAddress.cityName},
                      {defaultShippingAddress.regionName},
                    </p>
                    <p>Bangladesh</p>
                    <p>
                      <b>Mobile: {defaultShippingAddress.contact}</b>
                    </p>
                  </>
                ) : (
                  <p className="textCenter">No default shipping address found</p>
                )}
              </Box>
            </Grid>
          </Grid>
          <div className="pt-15">
            <h3>Billing Address</h3>
          </div>
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
          <div className="pt-15">
            <h3>Shipping Address</h3>
          </div>
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
        </Box>
      </Card>

      {open && (
        <EditAddress
          addressToEdit={addressToEdit}
          getAllAddress={getAllAddress}
          userInfo={userInfo}
          open={open}
          setOpen={setOpen}
          handleDialog={handleDialog}
          locations={locations}
        />
      )}
    </>
  );
}
