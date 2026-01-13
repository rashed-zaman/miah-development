// import * as React from "react";
// import TextField from "@mui/material/TextField";
// import Autocomplete from "@mui/material/Autocomplete";
// import { useDispatch } from "react-redux";
// import { useField, useFormikContext } from "formik";
// import { getBillingCity } from "../../../../../redux/checkout/checkoutActions";

// export default function Divison({ defaultValue, options }) {
//   // hooks
//   const dispatch = useDispatch();
//   const { setFieldValue } = useFormikContext();
//   const [field, meta] = useField("billingDivision");

//   // local state
//   const [value, setValue] = React.useState(defaultValue);
//   const [inputValue, setInputValue] = React.useState("");

//   const [err, seterr] = React.useState(false);
//   const [errTxt, seterrTxt] = React.useState("");

//   // methods
//   const onChange = (event, newValue) => {
//     setValue(newValue);
//     if (newValue) {
//       setFieldValue("billingDivision", newValue);
//       setFieldValue("billigInfo.divisionId", newValue.id);
//       dispatch(getBillingCity(newValue.city));
//     }
//   };

//   const params = {
//     ...field,
//     variant: "outlined",
//     fullWidth: true,
//   };

//   React.useEffect(() => {
//     if (meta && meta.touched && meta.error) {
//       params.error = true;
//       params.helperText = meta.error;
//       seterr(params.error);
//       seterrTxt("Required");
//     } else {
//       seterr(false);
//       seterrTxt("");
//     }
//   }, [meta]);

//   // side effects
//   React.useEffect(() => {
//     setValue(defaultValue);
//     if (defaultValue) {
//       setFieldValue("billigInfo.divisionId", defaultValue.id);
//       dispatch(getBillingCity(defaultValue.city));
//     }
//   }, [defaultValue]);

//   // configarations
//   const autoCompleteConfig = {
//     value: value || null,
//     inputValue: inputValue || "",
//   };

//   return (
//     <div>
//       <Autocomplete
//         {...autoCompleteConfig}
//         onChange={onChange}
//         disableClearable
//         inputValue={inputValue}
//         id="division"
//         onInputChange={(event, newInputValue) => {
//           setInputValue(newInputValue);
//         }}
//         options={options}
//         getOptionLabel={(option) => option.name}
//         isOptionEqualToValue={(option, value) => option.id === value.id}
//         renderInput={(params) => (
//           <TextField
//             {...params}
//             name="billingDivision"
//             label="Division"
//             error={err ? true : false}
//             helperText={err ? errTxt : ""}
//           />
//         )}
//       />
//     </div>
//   );
// }



import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch } from "react-redux";
import { useField, useFormikContext } from "formik";
import { setBillingCity } from "@/store/checkoutSlice";


export default function Division({ defaultValue, options }) {
  const dispatch = useDispatch();
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField("billingDivision");

  const [value, setValue] = React.useState(defaultValue);
  const [inputValue, setInputValue] = React.useState("");

  const showError = Boolean(meta.touched && meta.error);

  const handleChange = (_, newValue) => {
    setValue(newValue);
    if (newValue) {
      setFieldValue("billingDivision", newValue);
      setFieldValue("billigInfo.divisionId", newValue.id);
      dispatch(setBillingCity(newValue.city));
    }
  };

  React.useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
      setFieldValue("billigInfo.divisionId", defaultValue.id);
      dispatch(setBillingCity(defaultValue.city));
    }
  }, [defaultValue]);

  return (
    <Autocomplete
      id="division"
      value={value || null}
      inputValue={inputValue}
      onChange={handleChange}
      onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
      options={options}
      disableClearable
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => (
        <TextField
          {...params}
          {...field}
          name="billingDivision"
          label="Division"
          variant="outlined"
          fullWidth
          error={showError}
          helperText={showError ? meta.error : ""}
        />
      )}
    />
  );
}
