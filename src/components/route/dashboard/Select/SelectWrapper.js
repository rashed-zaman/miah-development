import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useField, useFormikContext } from "formik";

const SelectWrapper = ({ name, options, defaultOption, label, ...otherProps }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const [defaultValue, setdefaultValue] = React.useState("");

  // child methods for parent
  const childMethods = (name, value) => {
    if (otherProps.parentMethod) {
      otherProps.parentMethod(name, value);
    }
  };
  
  // handel method
  const handleChange = (evt) => {
    const { value } = evt.target;
    setFieldValue(name, value);
    childMethods(name, value);
    setdefaultValue(value);
  };

  const configSelect = {
    ...field,
    select: true,
    value: defaultValue,
    label: label,
    variant: "outlined",
    fullWidth: true,
    onChange: handleChange,
  };

  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }
React.useEffect(() => {
  if (defaultOption) {
    setdefaultValue(defaultOption)
    setFieldValue(name, defaultOption);
  }
}, []);

  return (
    <div>
      <TextField {...configSelect}>
        {options.length > 0 ? (
          options.map((item, pos) => {
            return (
              <MenuItem key={pos} value={item}>
                {item[otherProps.optionLabel]}
              </MenuItem>
            );
          })
        ) : (
          <MenuItem value=" "> </MenuItem>
        )}
      </TextField>
    </div>
  );
};

export default SelectWrapper;
