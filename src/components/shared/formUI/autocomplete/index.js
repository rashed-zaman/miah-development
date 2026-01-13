import React from "react";
import TextField from "@mui/material/TextField";
import { useField, useFormikContext } from "formik";
import Autocomplete from "@mui/material/Autocomplete";

const AutocompletetWrapper = ({ name, options, label, ...otherProps }) => {
  const { setFieldValue } = useFormikContext();
  const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState('');
  const [field, meta] = useField(name);

  const [err, seterr] = React.useState(false);
  const [errTxt, seterrTxt] = React.useState("");


  // child methods for paren
  const childMethods = (name, value) => {
    otherProps.parentMethod(name, value );
  };

  // handel
  const handleChange = (evt, v) => {
    setValue(v);
    setFieldValue(name, v);
    if (otherProps.parentMethod) { 
      childMethods(name, v);
    }
  };

  const configSelect = {
    ...field,
    ...otherProps,
    variant: "outlined",
    fullWidth: true,
  };

  React.useEffect(() => {
    if (meta && meta.touched && meta.error) {
      configSelect.error = true;
      configSelect.helperText = meta.error;
      seterr(configSelect.error);
      seterrTxt("Required");
    } else {
      seterr(false);
      seterrTxt("");
    }
  }, [meta]);

  React.useEffect(() => {
    if (otherProps.defaultValue) {
      setValue(otherProps.defaultValue)
      setFieldValue(name, otherProps.defaultValue);
    }
    console.log(options[0]);
  }, [otherProps.defaultValue]);

  return (
    <div>
      <Autocomplete
        value={value}
        onChange={handleChange}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        autoHighlight
        id={name}
        options={options}
        getOptionLabel={(option) => option[otherProps.optionLabel] || ""}
        isOptionEqualToValue={(option, val) => val === null || option.id === val.id}
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

export default AutocompletetWrapper;