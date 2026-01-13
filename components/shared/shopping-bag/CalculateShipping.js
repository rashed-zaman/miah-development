import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { fetchLocations } from "../../../redux/checkout/checkoutActions";
import { useSelector, useDispatch } from "react-redux";
import shippingCalculation from "../../../service/shippingCalculation/shippingCalculation";
import LayoutForm from "../layout/LayoutForm";


export default function CalculateShipping({ handleShippingCharg }) {
  // ======= hooks =============
  const dispatch = useDispatch();
  const locations = useSelector((state) => state.checkout.locations);
  const BagWight = useSelector((state) =>
    state.shoppingBag.shoppingCart.reduce((a, b) => a + (b.weight || 0), 0)
  );

  //  local state
  const [region, setRegion] = useState("");

  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("");

  const [areas, setAreas] = useState([]);
  const [area, setArea] = useState("");

  const handleRegionChange = (event) => {
    const { value } = event.target;
    setRegion(value);
    setCities(value.city);
  };

  const handleCityChange = (event) => {
    const { value } = event.target;
    setCity(value);
    setAreas(value.area);
  };

  const handleAreaChange = (event) => {
    const { value } = event.target;
    setArea(value);
    handleShippingCharg(shippingCalculation.calculateShipping(value, BagWight));
  };

  // side effects

  useEffect(() => {
    dispatch(fetchLocations());
  }, []);
  return (
    <LayoutForm>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h4>Calculate Shipping </h4>
          <br />
          <FormControl fullWidth size="small">
            <InputLabel>Select Region</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={region}
              onChange={handleRegionChange}
            >
              {locations.map((region, pos) => {
                return (
                  <MenuItem value={region} key={pos}>
                    {region.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small">
            <InputLabel
              style={{ background: "#ffffff" }}
              id="demo-simple-select-label"
            >
              Select City
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={city}
              onChange={handleCityChange}
            >
              {cities.map((city, pos) => {
                return (
                  <MenuItem value={city} key={pos}>
                    {city.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small">
            <InputLabel
              style={{ background: "#ffffff" }}
              id="demo-simple-select-label"
            >
              Select Area
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={area}
              onChange={handleAreaChange}
            >
              {areas.map((area, pos) => {
                return (
                  <MenuItem value={area} key={pos}>
                    {area.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </LayoutForm>
  );
}
