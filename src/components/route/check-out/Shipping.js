import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Box } from "@mui/material";
import TextFieldWrapper from "../../shared/formUI/textField";
import AddressTypeUser from "../../shared//formUI/shipping/addressType/AddressTypeUser";
import AddressType from "../../shared//formUI/shipping/addressType/AddressType";
import DivisionUser from "../../shared/formUI/shipping/division/DivisionUser";
import Division from "../../shared/formUI/shipping/division/Division";
import CityUser from "../../shared/formUI/shipping/city/CityUser";
import City from "../../shared/formUI/shipping/city/City";
import AreaUser from "../../shared/formUI/shipping/area/AreaUser";
import Area from "../../shared/formUI/shipping/area/Area";
import { fetchDefaultAddress } from "@/store/checkoutSlice";

export default function Shipping({ handleShippingCharge, hasShipping }) {
  // redux state
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const locations = useSelector((state) => state.checkout.locations);
  const city = useSelector((state) => state.checkout.shippingCities);
  const area = useSelector((state) => state.checkout.shippingAreas);
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
    setDefaultDivision(formInitialValue.shippingDivision);
    setDefaultCity(formInitialValue.shippingCity);
    setDefaultArea(formInitialValue.shippingArea);
    // console.log(formInitialValue.shippingInfo.addNewShipping);
  }, [formInitialValue]);

  return (
    <>
      <Grid container spacing={1} rowSpacing={2}  p={2}>
        <Grid item size={6}>
          {hasLoggedIn && defaultAddress?.shippingAlldata?.defaultShipping ? (
            <AddressTypeUser
              name="addressType"
              optionLabel="shipping_address"
              label="Address Type"
              defaultAddress={defaultAddress.defaultShipping}
              options={defaultAddress.shipping}
            />
          ) : (
            <AddressType
              name="addressType"
              optionLabel="shipping_address"
              label="Address Type"
            />
          )}
        </Grid>
        </Grid>
        <Grid container spacing={1} rowSpacing={2} mb={1} p={2} pt={0}>
        <Grid item size={{ xs: 12, sm: 6 }}>
          <TextFieldWrapper name="shippingInfo.fName" label="Frist Name" />
        </Grid>
        <Grid item size={{ xs: 12, sm: 6 }}>
          <TextFieldWrapper name="shippingInfo.lName" label="Last Name" />
        </Grid>
        <Grid item size={{ xs: 12, sm: 6 }}>
          <TextFieldWrapper name="shippingInfo.phone" label="Mobile Number" />
        </Grid>
        <Grid item size={{ xs: 12, sm: 6 }}>
          <TextFieldWrapper name="shippingInfo.email" label="Email" />
        </Grid>
        <Grid item size={{ xs: 12, sm: 6 }}>
          <TextFieldWrapper name="shippingInfo.address" label="Address" />
        </Grid>
        <Grid item size={{ xs: 12, sm: 6 }}>
          <TextFieldWrapper name="shippingInfo.zipcode" label="Zip Code" />
        </Grid>
        <Grid item size={{ xs: 12, sm: 6 }}>
          {hasLoggedIn ? (
            <>
              {formInitialValue.shippingInfo.addNewShipping ? (
                <Division options={locations} />
              ) : (
                <DivisionUser
                  defaultValue={defaultDivision}
                  options={locations}
                />
              )}
            </>
          ) : (
            <Division options={locations} />
          )}
        </Grid>

        <Grid item size={{ xs: 12, sm: 6 }}>
          {hasLoggedIn ? (
            <>
              {formInitialValue.shippingInfo.addNewShipping ? (
                <City options={city} />
              ) : (
                <CityUser defaultValue={defaultCity} options={city} />
              )}
            </>
          ) : (
            <City options={city} />
          )}
        </Grid>

        <Grid item size={{ xs: 12, sm: 6 }}>
          {hasLoggedIn ? (
            <>
              {formInitialValue.shippingInfo.addNewShipping ? (
                <Area
                  options={area}
                  handleShippingCharge={handleShippingCharge}
                  hasShipping={hasShipping}
                  />
                  ) : (
                    <AreaUser
                    options={area}
                    defaultValue={defaultArea}
                    handleShippingCharge={handleShippingCharge}
                    hasShipping={hasShipping}
                />
              )}
            </>
          ) : (
            <Area options={area} handleShippingCharge={handleShippingCharge} />
          )}
        </Grid>
      </Grid>
      {/* <Grid container spacing={1}>
      </Grid> */}
    </>
  );
}
