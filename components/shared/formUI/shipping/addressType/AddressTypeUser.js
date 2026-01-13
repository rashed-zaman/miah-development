import React from "react";
import TextField from "@mui/material/TextField";
// import { useField, useFormikContext } from "formik";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch } from "react-redux";
import { getShippingAddress } from "../../../../../redux/checkout/checkoutActions";
const AddressType = ({
  name,
  options,
  defaultAddress,
  label,
  ...otherProps
}) => {
  const dispatch = useDispatch();
  const initVal = {
    id: 10075555,
    shipping_address: "Add New",
    shipping_region_id: 2,
    shipping_city_id: 59,
    shipping_area_id: 1260,
    shipping_zip_code: 1400,
    status: 0,
  };
  const [value, setValue] = React.useState(initVal);

  // const { setFieldValue } = useFormikContext();
  // const [field, meta] = useField(name);

  const [err, seterr] = React.useState(false);
  const [errTxt, seterrTxt] = React.useState("");

  // handel
  const handleChange = (evt, v) => {
    setValue(v);
    dispatch(getShippingAddress(v));
    console.log(v);
    // setFieldValue(name, v);
    if (otherProps.parentMethod) {
      childMethods(name, v);
    }
  };

  const configSelect = {
    // ...field,
    ...otherProps,
    variant: "outlined",
    fullWidth: true,
  };

  // React.useEffect(() => {
  //   if (meta && meta.touched && meta.error) {
  //     configSelect.error = true;
  //     configSelect.helperText = meta.error;
  //     seterr(configSelect.error);
  //     seterrTxt("Required");
  //   } else {
  //     seterr(false);
  //     seterrTxt("");
  //   }
  // }, [meta]);

  React.useEffect(() => {
    setValue(defaultAddress);
    // console.log('default address', defaultAddress);
  }, [defaultAddress]);

  return (
    <div>
      <Autocomplete
        value={value}
        disableClearable
        onChange={handleChange}
        autoHighlight
        id={name}
        options={options}
        getOptionLabel={(option) => option[otherProps.optionLabel]}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderInput={(configSelect) => (
          <TextField
            {...configSelect}
            label={label}
            error={err ? true : false}
            helperText={err ? errTxt : ""}
          />
        )}
      />
    </div>
  );
};

export default AddressType;
