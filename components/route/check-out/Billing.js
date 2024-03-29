import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Box } from "@mui/material";
import dynamic from "next/dynamic";

import TextFieldWrapper from "../../shared/formUI/textField";
import { fetchDefaultAddress } from "../../../redux/checkout/checkoutActions";
import AddressTypeUser from "../../shared/formUI/billing/addressType/AddressTypeUser";
import AddressType from "../../shared/formUI/billing/addressType/AddressType";
import DivisionUser from "../../shared/formUI/billing/division/DivisionUser";
import Division from "../../shared/formUI/billing/division/Division";
import CityUser from "../../shared/formUI/billing/city/CityUser";
import City from "../../shared/formUI/billing/city/City";
import AreaUser from "../../shared/formUI/billing/area/AreaUser";
import Area from "../../shared/formUI/billing/area/Area";
// import UserSummary from "../../components/route/check-out/UserSummary";
// import UserSummary from "./UserSummary";

const UserSummary = dynamic(() => import("./UserSummary"));

export default function Billing({
  hasShipping,
  handleShippingCharge,
  newUserMobile,
}) {
  // hooks
  const dispatch = useDispatch();
  // redux state
  const userInfo = useSelector((state) => state.auth.userInfo);
  const locations = useSelector((state) => state.checkout.locations);
  const city = useSelector((state) => state.checkout.billingCities);
  const area = useSelector((state) => state.checkout.billingAreas);
  const defaultAddress = useSelector((state) => state.checkout.defaultAddress);
  const formInitialValue = useSelector(
    (state) => state.checkout.formInitialValue
  );

  // locat state
  const [defaultDivision, setDefaultDivision] = useState("");
  const [defaultCity, setDefaultCity] = useState("");
  const [defaultArea, setDefaultArea] = useState("");
  const [hasLoggedIn, setHasLoggedIn] = useState(false);

  // side effects
  useEffect(() => {
    if (userInfo.token) {
      dispatch(fetchDefaultAddress(userInfo.token));
      setHasLoggedIn(true);
    }
  }, [userInfo]);

  useEffect(() => {
    setDefaultDivision(formInitialValue.billingDivision);
    setDefaultCity(formInitialValue.billingCity);
    setDefaultArea(formInitialValue.billingArea);
  }, [formInitialValue]);

  return (
    <>
      {hasLoggedIn && defaultAddress.defaultBilling !== "" && (
        <UserSummary defaultAddress={defaultAddress} />
      )}

      {hasLoggedIn && defaultAddress.defaultBilling !== "" && (
        <Box
          sx={{
            height: "0px",
            overflow: "hidden",
          }}
        >
          <Box p={2}>
            <Grid container spacing={1} rowSpacing={2} mb={1}>
              <Grid item sm={6} xs={12}>
                {hasLoggedIn && defaultAddress.billingAllData.defaultBilling ? (
                  <AddressTypeUser
                    name="addressType"
                    optionLabel="billing_address"
                    label="Address Type"
                    defaultAddress={defaultAddress.defaultBilling}
                    options={defaultAddress.billing}
                  />
                ) : (
                  <AddressType
                    name="addressType"
                    optionLabel="billing_address"
                    label="Address Type"
                  />
                )}
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item sm={6} xs={12}>
                {hasLoggedIn ? (
                  <TextFieldWrapper
                    readOnly={true}
                    name="billigInfo.fName"
                    label="Frist Name"
                  />
                ) : (
                  <TextFieldWrapper
                    name="billigInfo.fName"
                    label="Frist Name"
                  />
                )}
              </Grid>
              <Grid item sm={6} xs={12}>
                {hasLoggedIn ? (
                  <TextFieldWrapper
                    readOnly={true}
                    name="billigInfo.lName"
                    label="Last Name"
                  />
                ) : (
                  <TextFieldWrapper name="billigInfo.lName" label="Last Name" />
                )}
              </Grid>
              <Grid item sm={6} xs={12}>
                {hasLoggedIn ? (
                  <TextFieldWrapper
                    readOnly={true}
                    name="billigInfo.phone"
                    label="Mobile Number"
                  />
                ) : (
                  <TextFieldWrapper
                    name="billigInfo.phone"
                    label="Mobile Number"
                  />
                )}
              </Grid>
              <Grid item sm={6} xs={12}>
                {hasLoggedIn ? (
                  <TextFieldWrapper
                    readOnly={true}
                    name="billigInfo.email"
                    label="Email"
                  />
                ) : (
                  <TextFieldWrapper name="billigInfo.email" label="Email" />
                )}
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextFieldWrapper name="billigInfo.address" label="Address" />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextFieldWrapper name="billigInfo.zipcode" label="Postal Code" />
              </Grid>
              <Grid item sm={6} xs={12}>
                {hasLoggedIn ? (
                  <>
                    {formInitialValue?.billigInfo?.address !== "Add New" ? (
                      <DivisionUser
                        defaultValue={defaultDivision}
                        options={locations}
                      />
                    ) : (
                      <Division options={locations} />
                    )}
                  </>
                ) : (
                  <Division options={locations} />
                )}
              </Grid>

              <Grid item sm={6} xs={12}>
                {hasLoggedIn ? (
                  <>
                    {formInitialValue?.billigInfo?.address !== "Add New" ? (
                      <CityUser defaultValue={defaultCity} options={city} />
                    ) : (
                      <City options={city} />
                    )}
                  </>
                ) : (
                  <City options={city} />
                )}
              </Grid>

              <Grid item sm={6} xs={12}>
                {hasLoggedIn ? (
                  <>
                    {formInitialValue?.billigInfo?.address !== "Add New" ? (
                      <AreaUser
                        options={area}
                        defaultValue={defaultArea}
                        handleShippingCharge={handleShippingCharge}
                        hasShipping={hasShipping}
                      />
                    ) : (
                      <Area
                        options={area}
                        handleShippingCharge={handleShippingCharge}
                      />
                    )}
                  </>
                ) : (
                  <Area
                    options={area}
                    handleShippingCharge={handleShippingCharge}
                  />
                )}
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}

      {hasLoggedIn && defaultAddress.defaultBilling === "" && (
        <Box p={2}>
          <Grid container spacing={1} rowSpacing={2} mb={1}>
            <Grid item sm={6} xs={12}>
              {hasLoggedIn && defaultAddress.billingAllData.defaultBilling ? (
                <AddressTypeUser
                  name="addressType"
                  optionLabel="billing_address"
                  label="Address Type"
                  defaultAddress={defaultAddress.defaultBilling}
                  options={defaultAddress.billing}
                />
              ) : (
                <AddressType
                  name="addressType"
                  optionLabel="billing_address"
                  label="Address Type"
                />
              )}
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item sm={6} xs={12}>
              {hasLoggedIn ? (
                <TextFieldWrapper
                  readOnly={true}
                  name="billigInfo.fName"
                  label="Frist Name"
                />
              ) : (
                <TextFieldWrapper name="billigInfo.fName" label="Frist Name" />
              )}
            </Grid>
            <Grid item sm={6} xs={12}>
              {hasLoggedIn ? (
                <TextFieldWrapper
                  readOnly={true}
                  name="billigInfo.lName"
                  label="Last Name"
                />
              ) : (
                <TextFieldWrapper name="billigInfo.lName" label="Last Name" />
              )}
            </Grid>
            <Grid item sm={6} xs={12}>
              {hasLoggedIn ? (
                <TextFieldWrapper
                  readOnly={true}
                  name="billigInfo.phone"
                  label="Mobile Number"
                />
              ) : (
                <TextFieldWrapper
                  name="billigInfo.phone"
                  label="Mobile Number"
                />
              )}
            </Grid>
            <Grid item sm={6} xs={12}>
              {hasLoggedIn ? (
                <TextFieldWrapper
                  readOnly={true}
                  name="billigInfo.email"
                  label="Email"
                />
              ) : (
                <TextFieldWrapper name="billigInfo.email" label="Email" />
              )}
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextFieldWrapper name="billigInfo.address" label="Address" />
            </Grid>
            
            <Grid item sm={6} xs={12}>
              {hasLoggedIn ? (
                <>
                  {formInitialValue?.billigInfo?.address !== "Add New" ? (
                    <DivisionUser
                      defaultValue={defaultDivision}
                      options={locations}
                    />
                  ) : (
                    <Division options={locations} />
                  )}
                </>
              ) : (
                <Division options={locations} />
              )}
            </Grid>
            <Grid item sm={6} xs={12}>
              {hasLoggedIn ? (
                <>
                  {formInitialValue?.billigInfo?.address !== "Add New" ? (
                    <CityUser defaultValue={defaultCity} options={city} />
                  ) : (
                    <City options={city} />
                  )}
                </>
              ) : (
                <City options={city} />
              )}
            </Grid>
            <Grid item sm={6} xs={12}>
              {hasLoggedIn ? (
                <>
                  {formInitialValue?.billigInfo?.address !== "Add New" ? (
                    <AreaUser
                      options={area}
                      defaultValue={defaultArea}
                      handleShippingCharge={handleShippingCharge}
                      hasShipping={hasShipping}
                    />
                  ) : (
                    <Area
                      options={area}
                      handleShippingCharge={handleShippingCharge}
                    />
                  )}
                </>
              ) : (
                <Area
                  options={area}
                  handleShippingCharge={handleShippingCharge}
                />
              )}
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextFieldWrapper name="billigInfo.zipcode" label="Postal Code" />
            </Grid>
          </Grid>
        </Box>
      )}

      {!hasLoggedIn && (
        <Box p={2}>
          <Grid container spacing={1} rowSpacing={2} mb={1}>
            <Grid item sm={6} xs={12}>
              {hasLoggedIn && defaultAddress.billingAllData.defaultBilling ? (
                <AddressTypeUser
                  name="addressType"
                  optionLabel="billing_address"
                  label="Address Type"
                  defaultAddress={defaultAddress.defaultBilling}
                  options={defaultAddress.billing}
                />
              ) : (
                <AddressType
                  name="addressType"
                  optionLabel="billing_address"
                  label="Address Type"
                />
              )}
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item sm={6} xs={12}>
              {hasLoggedIn ? (
                <TextFieldWrapper
                  readOnly={true}
                  name="billigInfo.fName"
                  label="Frist Name"
                />
              ) : (
                <TextFieldWrapper name="billigInfo.fName" label="Frist Name" />
              )}
            </Grid>
            <Grid item sm={6} xs={12}>
              {hasLoggedIn ? (
                <TextFieldWrapper
                  readOnly={true}
                  name="billigInfo.lName"
                  label="Last Name"
                />
              ) : (
                <TextFieldWrapper name="billigInfo.lName" label="Last Name" />
              )}
            </Grid>
            <Grid
              item
              sm={6}
              xs={12}
              sx={{display:'none'}}
            >
              {hasLoggedIn ? (
                <TextFieldWrapper
                  readOnly={true}
                  name="billigInfo.phone"
                  label="Mobile Number"
                />
              ) : (
                <TextFieldWrapper
                  name="billigInfo.phone"
                  label="Mobile Number"
                  readOnly={true}
                  defaultvalue={newUserMobile}
                />
              )}
            </Grid>
            <Grid item sm={6} xs={12}>
              {hasLoggedIn ? (
                <TextFieldWrapper
                  readOnly={true}
                  name="billigInfo.email"
                  label="Email"
                />
              ) : (
                <TextFieldWrapper name="billigInfo.email" label="Email" />
              )}
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextFieldWrapper name="billigInfo.address" label="Address" />
            </Grid>
            <Grid item sm={6} xs={12}>
              {hasLoggedIn ? (
                <>
                  {formInitialValue?.billigInfo?.address !== "Add New" ? (
                    <DivisionUser
                      defaultValue={defaultDivision}
                      options={locations}
                    />
                  ) : (
                    <Division options={locations} />
                  )}
                </>
              ) : (
                <Division options={locations} />
              )}
            </Grid>

            <Grid item sm={6} xs={12}>
              {hasLoggedIn ? (
                <>
                  {formInitialValue?.billigInfo?.address !== "Add New" ? (
                    <CityUser defaultValue={defaultCity} options={city} />
                  ) : (
                    <City options={city} />
                  )}
                </>
              ) : (
                <City options={city} />
              )}
            </Grid>

            <Grid item sm={6} xs={12}>
              {hasLoggedIn ? (
                <>
                  {formInitialValue?.billigInfo?.address !== "Add New" ? (
                    <AreaUser
                      options={area}
                      defaultValue={defaultArea}
                      handleShippingCharge={handleShippingCharge}
                      hasShipping={hasShipping}
                    />
                  ) : (
                    <Area
                      options={area}
                      handleShippingCharge={handleShippingCharge}
                    />
                  )}
                </>
              ) : (
                <Area
                  options={area}
                  handleShippingCharge={handleShippingCharge}
                />
              )}
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextFieldWrapper name="billigInfo.zipcode" label="Postal Code" />
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
}
