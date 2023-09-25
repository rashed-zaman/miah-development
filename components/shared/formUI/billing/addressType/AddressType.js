import React from "react";
import TextField from "@mui/material/TextField";
// import { useField, useFormikContext } from "formik";
import Autocomplete from "@mui/material/Autocomplete";

const AddressType = ({ name, label, ...otherProps }) => {
  const options = [
    {
      id: 10075543,
      billing_address: "Add New",
      billing_region_id: 2,
      billing_city_id: 59,
      billing_area_id: 1260,
      billing_zip_code: 1400,
      status: 0,
    }
  ]
  const initVal = {
    id: 10075543,
    billing_address: "Add New",
    billing_region_id: 2,
    billing_city_id: 59,
    billing_area_id: 1260,
    billing_zip_code: 1400,
    status: 0,
  };
  const [value, setValue] = React.useState(initVal);
  const configSelect = {
    ...otherProps,
    variant: "outlined",
    fullWidth: true,
  };



  React.useEffect(() => {
    setValue(initVal)
  }, []);

  return (
    <div>
      <Autocomplete
        value={value}
        disableClearable
        autoHighlight
        id={name}
        options={options}
        getOptionLabel={(option) => option[otherProps.optionLabel]}
        isOptionEqualToValue={(option, value) => option.id === value.id }
        renderInput={(configSelect) => (
          <TextField
            {...configSelect}
            label={label}
          />
        )}
      />
    </div>
  );
};

export default AddressType;
