import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";              
// import FormControl from "@mui/material/FormControl";
import { CashPayment, DigitalPayment } from "./IconLabel";
import { useField, useFormikContext } from "formik";
import { useSelector } from "react-redux";
import { Checkbox, FormControl, FormGroup, Box } from "@mui/material";
import { withStyles } from "@mui/styles";
// import { Box, Grid } from "@mui/material";
// import Image from "next/image";
// import { IMAGE_URL } from "../../../service/serviceConfig";
// import { MiahPaymentButton } from "../../core/button/MiahButton";

export default function PaymentMathod({ handleDigilatDicount }) {
  // hooks
  const siteOption = useSelector((state) => state.menu.siteOptions);
  const totalAmount = useSelector((state) =>
    state.shoppingBag.shoppingCart.reduce((a, b) => a + (b.amount || 0), 0)
  );

  const { setFieldValue } = useFormikContext();
  const [value, setValue] = React.useState("cash");

  const handleChange = (event) => {
    setValue(event.target.value);
    setFieldValue("paymentType", event.target.value);
    if (event.target.value === "digital") {
      handleDigilatDicount(
        (totalAmount * Number(siteOption.cardPaymentDiscount)) / 100
      );
    } else {
      handleDigilatDicount(0);
    }
  };
  const shoppingCart = useSelector((state) => state.shoppingBag.shoppingCart);
  // const formControlLabelStyle = {
  //   "& .MuiFormControlLabel-label": {
  //     fontSize:{sm:'1.1rem', xs:'.7rem'},
  //     fontWeight:'600',
  //     fontFamily:'Jost !important',
  //     // color:'white',
  //     marginLeft:{xs:'-26px'},
  //   }
  // }
  
  return (
    <Box mt={2}>
      <FormControl sx={{ display:'inline', marginLeft:'auto', marginRight:'auto'}}>
        <RadioGroup
          row
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel
            value="cash"
            control={<Radio
            sx={{
              color: 'transparent',
              '&.Mui-checked': {
                color: 'transparent !important',
                '& .MuiFormControlLabel-label': {
                  borderBottom:'1px solid'
                },
              },
            }}
             />}
            label={<CashPayment />}
           sx={{width:{sm:'49%',xs:'48%'}, height:'50px',border:'1px solid',  borderRadius: "5px", display:'flex', justifyContent:'center',"& .MuiFormControlLabel-label": {
            fontSize:{sm:'1.1rem', xs:'.9rem'},
            fontWeight:'600',
            fontFamily:'Jost !important',
            marginLeft:{xs:'-34px'},
          },...(value==='cash'?{borderBottom:'8px solid'}:{borderBottom:'1px solid'})
        }}
            />
          <FormControlLabel
            value="digital"
            control={<Radio
            sx={{
              color: 'transparent',
              '&.Mui-checked': {
                color: 'transparent !important',
                // '&,& + .MuiFormControlLabel-root':{
                //   background:'red'
                // }
              },
            }}
             />}
            label={<DigitalPayment />}
            sx={{width:{sm:'49%',xs:'48%'}, height:'50px', border:'1px solid', borderRadius: "5px", display:'flex', justifyContent:'center',"& .MuiFormControlLabel-label": {
              fontSize:{sm:'1.1rem', xs:'.9rem'},
              fontWeight:'600',
              fontFamily:'Jost !important',
              marginLeft:{xs:'-34px'},
            },...(value==='digital'?{borderBottom:'8px solid'}:{borderBottom:'1px solid'})
            }}
          />
          
        </RadioGroup>
      </FormControl>
    </Box>
  );
}
// "& .MuiSvgIcon-root": {
//   borderBottom: "8px solid !important",
// },