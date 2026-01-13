import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { useField, useFormikContext } from "formik";
import shippingCalculation from "../../../../../service/shippingCalculation/shippingCalculation";

export default function Area({ options, handleShippingCharge }) {
  const BagWight = useSelector((state) => state.shoppingBag.shoppingCart.reduce((a, b) => a + ((b.weight) || 0), 0))
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField("shippingArea");

  const [value, setValue] = React.useState(null);
  const [err, seterr] = React.useState(false);
  const [errTxt, seterrTxt] = React.useState("");

  const params = {
    ...field,
    variant: "outlined",
    fullWidth: true,
  };

  const onChange = (event, newValue) => {
    setFieldValue('shippingArea', newValue);
    setFieldValue("shippingInfo.areaId", newValue.id);
    setValue(newValue);
    handleShippingCharge(shippingCalculation.calculateShipping(newValue, BagWight))
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

  React.useEffect(() => {
    setValue(null);
    setFieldValue('shippingArea', "");
    setFieldValue("shippingInfo.areaId", "");
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
          name="shippingArea"
          label="Area"
          error={err ? true : false}
          helperText={err ? errTxt : ""}  
        />
      )}
    />
  );
}
