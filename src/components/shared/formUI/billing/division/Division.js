import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useFormikContext, useField } from "formik";
import { useDispatch } from "react-redux";
import { setBillingCity } from "@/store/checkoutSlice";
// import { getBillingCity } from "../../../../../redux/checkout/checkoutActions";


export default function Divison({ options }) {

  // hooks
  const dispatch = useDispatch();
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField("billingDivision");

  // state
  const [value, setValue] = React.useState(null);
  const [err, seterr] = React.useState(false);
  const [errTxt, seterrTxt] = React.useState("");

  const onChange = (event, newValue) => {
    setValue(newValue);
    if (newValue) {
      setFieldValue("billingDivision", newValue);
      setFieldValue("billigInfo.divisionId", newValue.id);
      dispatch(setBillingCity(newValue.city));
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
    dispatch(setBillingCity([]))
  }, []);

  return (
    <div>
      <Autocomplete
        value={value}
        onChange={onChange}
        disableClearable
        options={options}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField
            {...params}
            name="billingDivision"
            label="Division"
            error={err ? true : false}
            helperText={err ? errTxt : ""}
          />
        )}
      />
    </div>
  );
}
