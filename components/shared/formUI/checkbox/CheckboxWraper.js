import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { FormControl, FormLabel, Radio } from "@mui/material";
import { useField, useFormikContext } from "formik";

export default function CheckboxWraper() {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField("terms");

  const handleOnchange = (evt) => {
    // console.log(evt.target.checked);
    setFieldValue("terms", evt.target.checked);
  };

  const checkboxConfig = {
    ...field,
    onChange: handleOnchange,
  };

  const configFormControl = {};
  if (meta && meta.touched && meta.error) {
    configFormControl.error = true;
  }
  
  return (
    <FormControl {...configFormControl}>
      <FormGroup>
        <FormControlLabel
          name="terms"
          control={
            <Checkbox {...checkboxConfig} color="success" size="small"/>
          } label='Place Order'
        />
      </FormGroup>
    </FormControl>
  );
}
