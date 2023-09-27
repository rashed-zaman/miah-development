import  React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { useField, useFormikContext } from "formik";
import shippingCalculation from "../../../../../service/shippingCalculation/shippingCalculation";
import { useEffect } from "react";

export default function Area({ defaultValue, handleShippingCharge, hasShipping }) {
  // hooks
  const area = useSelector((state) => state.checkout.shippingAreas);
  const BagWight = useSelector((state) => state.shoppingBag.shoppingCart.reduce((a, b) => a + ((b.weight) || 0), 0))
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField("shippingCity");

  // local state
  const [options, setOptions] = React.useState([]);
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");

  const [err, seterr] = React.useState(false);
  const [errTxt, seterrTxt] = React.useState("");

  // methods
  const onChange = (event, newValue) => {
    setFieldValue("shippingCity", newValue);
    setFieldValue("shippingInfo.areaId", newValue.id);
    setValue(newValue);
    handleShippingCharge(shippingCalculation.calculateShipping(newValue, BagWight))
  };


  // textFields param
  const params = {
    ...field,
    variant: "outlined",
    fullWidth: true,
  };


  // side effescts
  useEffect(() => {
    setValue(defaultValue);
    setFieldValue("shippingCity", defaultValue);
    setFieldValue("shippingInfo.areaId", defaultValue.id);
  }, [defaultValue]);

  useEffect(() => {
    if (area !== undefined) {
      setOptions(area);
    } else {
      setOptions([]);
    }
  }, [area]);


  // select configarations
  const autoCompleteConfig = {
    value: value || null,
    inputValue: inputValue || "",
  };

  useEffect(() => {
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


  useEffect(() => {
    if(hasShipping){
      setValue(defaultValue);
      setFieldValue("shippingCity", defaultValue);
      setFieldValue("shippingInfo.areaId", defaultValue.id);
    }
  }, [hasShipping, defaultValue])
  

  return (
    <Autocomplete
      {...autoCompleteConfig}
      disableClearable
      onChange={onChange}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      options={options}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => (
        <TextField
          {...params}
          name="shippingCity" 
          label="Area"
          error={err ? true : false}
          helperText={err ? errTxt : ""}
        />
      )}
    />
  );
}
