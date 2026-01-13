import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { useField, useFormikContext } from "formik";
import { setShippingArea } from "@/store/checkoutSlice";
// import { setShippingArea } from "../../../../../redux/checkout/checkoutActions";



export default function CityUser({ defaultValue }) {
  // hooks
  const dispatch = useDispatch();
  const city = useSelector((state) => state.checkout.shippingCities);
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField("shippingCity");

  // local state
  const [options, setOptions] = React.useState([]);
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");

  const [err, seterr] = React.useState(false);
  const [errTxt, seterrTxt] = React.useState("");

  // methods
  const onChange = (event, newValue) => {
    setValue(newValue);
    if (newValue) {
      setFieldValue("shippingCity", newValue);
      setFieldValue("shippingInfo.cityId", newValue.id);
      dispatch(setShippingArea(newValue.area));
    }
  };

  const params = {
    ...field,
    variant: "outlined",
    fullWidth: true,
  };

  // configarations
  const autoCompleteConfig = {
    value: value || null,
    inputValue: inputValue || "",
  };

  // side effects
  React.useEffect(() => {
    setValue(defaultValue);
    if (defaultValue) {
      dispatch(setShippingArea(defaultValue.area));
      setFieldValue("shippingInfo.cityId", defaultValue.id);
      setFieldValue("shippingCity", defaultValue);
    }
  }, [defaultValue]);

  React.useEffect(() => {
    if (city !== undefined) {
      setOptions(city);
    } else {
      setOptions([]);
    }
  }, [city]);

  React.useEffect(() => {
    if (meta && meta.touched && meta.error) {
      params.error = true;
      params.helperText = meta.error;
      seterr(params.error);
      seterrTxt("Required");
    } else {
      seterr(false);
      seterrTxt("");
    }
  }, [meta]);

  return (
    <Autocomplete
      {...autoCompleteConfig}
      onChange={onChange}
      disableClearable
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      options={options}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => (
        <TextField
          {...params}
          name="shippingCity"
          label="City shipping"
          error={err ? true : false}
          helperText={err ? errTxt : ""}
        />
      )}
    />
  );
}
