import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useFormikContext, useField } from "formik";
import { useDispatch } from "react-redux";
import { setBillingCity, setShippingCity } from "@/store/checkoutSlice";





export default function Divison({ options }) {
  // hooks
  const dispatch = useDispatch();
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField("shippingDivision");

  // state
  const [value, setValue] = React.useState(null);
  const [err, seterr] = React.useState(false);
  const [errTxt, seterrTxt] = React.useState("");

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

  return (
    <div>
      <Autocomplete
        onChange={onChange}
        disableClearable
        id="shippingDivision"
        options={options}
        getOptionLabel={(option) => option.name}
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
