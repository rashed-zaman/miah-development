import React, {useEffect} from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useSelector } from "react-redux";
import { useField, useFormikContext } from "formik";
import shippingCalculation from "../../../../../service/shippingCalculation/shippingCalculation";

export default function Area({ defaultValue, handleShippingCharge, hasShipping }) {
  // hooks
  const BagWight = useSelector((state) => state.shoppingBag.shoppingCart.reduce((a, b) => a + ((b.weight) || 0), 0))
  const area = useSelector((state) => state.checkout.billingAreas);
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField("billingCity");

  // local state
  const [options, setOptions] = React.useState([]);
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");

  const [err, seterr] = React.useState(false);
  const [errTxt, seterrTxt] = React.useState("");

  // methods
  const onChange = (event, newValue) => {
    setFieldValue("billingArea", newValue);
    setFieldValue("billigInfo.areaId", newValue.id);
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
    setFieldValue("billingArea", defaultValue);
    setFieldValue("billigInfo.areaId", defaultValue.id);
    handleShippingCharge(shippingCalculation.calculateShipping(defaultValue, BagWight))
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
          {...params} name="billingArea" 
          label="Area"
          error={err ? true : false}
          helperText={err ? errTxt : ""}
        />
      )}
    />
  );
}
