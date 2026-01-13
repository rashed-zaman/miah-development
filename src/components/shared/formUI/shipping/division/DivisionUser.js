import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch } from "react-redux";
import { useField, useFormikContext } from "formik";
import {  setShippingCity } from "@/store/checkoutSlice";





export default function Divison({ defaultValue, options }) {
  // hooks
  const dispatch = useDispatch();
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField("shippingDivision");

  // local state
  const [value, setValue] = React.useState(defaultValue);
  const [inputValue, setInputValue] = React.useState("");

  const [err, seterr] = React.useState(false);
  const [errTxt, seterrTxt] = React.useState("");

  // methods
  const onChange = (event, newValue) => {
    setValue(newValue);
    if (newValue) {
      setFieldValue("shippingDivision", newValue);
      setFieldValue("shippingInfo.divisionId", newValue.id);
      dispatch(setShippingCity(newValue.city));
    }
  };

  const params = {
    ...field,
    variant: "outlined",
    fullWidth: true,
  };

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

  // side effects
  React.useEffect(() => {
    setValue(defaultValue);
    if (defaultValue) {
      setFieldValue("shippingDivision", defaultValue);
      setFieldValue("shippingInfo.divisionId", defaultValue.id);
      dispatch(setShippingCity(defaultValue.city));
    }
  }, [defaultValue]);

  // configarations
  const autoCompleteConfig = {
    value: value || null,
    inputValue: inputValue || "",
  };
  
  return (
    <div>
      <Autocomplete
        {...autoCompleteConfig}
        onChange={onChange}
        disableClearable
        inputValue={inputValue}
        id="shippingDivision"
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        options={options}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderInput={(params) => (
          <TextField
            {...params}
            name="shippingDivision"
            label="Division"
            error={err ? true : false}
            helperText={err ? errTxt : ""}
          />
        )}
      />
    </div>
  );
}
