// import React from "react";
// import TextField from "@mui/material/TextField";
// import { useField, useFormikContext } from "formik";

// const TextFieldWrapper = ({ name, defaultvalue, ...otherProps }) => {
//   const { setFieldValue } = useFormikContext();
//   const [field, mata] = useField(name);

//   const configTextfield = {
//     ...field,
//     ...otherProps,
//     fullWidth: true,
//     variant: "outlined",
//   };

//   if (mata && mata.touched && mata.error) {
//     configTextfield.error = true;
//     configTextfield.helperText = mata.error;
//     // window.scroll(0,0)
//   }

//   React.useEffect(() => {
//     if (defaultvalue && defaultvalue !== "") {
//       setFieldValue(name, defaultvalue);
//     }
//     if (!defaultvalue && defaultvalue === "") {
//       setFieldValue(name, "");
//     }
//   }, [defaultvalue]);

//   return (
//     <div>
//       <TextField {...configTextfield} inputProps={{ readOnly: otherProps.readOnly ? true : false }} />
//     </div>
//   );
// };
// export default TextFieldWrapper;


import React from "react";
import TextField from "@mui/material/TextField";
import { useField, useFormikContext } from "formik";

const TextFieldWrapper = ({ name, defaultvalue, ...otherProps }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  React.useEffect(() => {
    if (defaultvalue !== undefined && defaultvalue !== null) {
      setFieldValue(name, defaultvalue);
    }
  }, [defaultvalue, name, setFieldValue]);

  const showError = meta.touched && meta.error;

  const configTextfield = {
    value: field.value ?? "", // ensure value is never null
    onChange: field.onChange,
    onBlur: field.onBlur,
    name: field.name,
    ...otherProps,
    fullWidth: true,
    variant: "outlined",
    error: !!showError,
    helperText: showError ? meta.error : "",
    inputProps: {
      readOnly: !!otherProps.readOnly,
    },
  };

  return <TextField {...configTextfield} />;
};

export default TextFieldWrapper;

