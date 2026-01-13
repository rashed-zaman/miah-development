import React, {useState} from "react";
import {Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useField } from 'formik';

export default function PasswordWrapper({ label, name }) {
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const [field, mata] = useField(name);
  
  const configTextfield = {
    ...field,
    fullWidth:true
  };
  if (mata && mata.touched && mata.error) {
    configTextfield.error = true;
    // configTextfield.helperText = mata.error;
  }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <FormControl variant="outlined" {...configTextfield} fullWidth>
          <InputLabel htmlFor="outlined-adornment-password">
            {label}
          </InputLabel>
          <OutlinedInput
            name={name}
            type={values.showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
      </Grid>
    </Grid>
  );
}
