import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch } from "react-redux";
import { useField, useFormikContext } from "formik";
import { setShippingArea } from "../../../../../redux/checkout/checkoutActions";

export default function City({ options }) {
  // hooks
  const dispatch = useDispatch();
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField("shippingCity");

  // state
  const [value, setValue] = React.useState(null);
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

  // side effects
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

  React.useEffect(() => {
    setValue(null);
    setFieldValue("shippingCity", "");
  }, [options]);

  return (
    <Autocomplete
      value={value}
      onChange={onChange}
      disableClearable
      options={options}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField
          {...params}
          name="shippingCity"
          label="City"
          error={err ? true : false}
          helperText={err ? errTxt : ""}
        />
      )}
    />
  );
}
