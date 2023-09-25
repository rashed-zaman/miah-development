import React from "react";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Signin from '../../route/check-out/signin/Signin'
import { useSelector } from "react-redux";


export default function CheckOutSignin({value, setValue}) {
  const userInfo = useSelector((state) => state.auth.userInfo);
  // const [value, setValue] = React.useState("old");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  
  return (
    <>
      {
        !userInfo.token
        ?
        (
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12}>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={value}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="old"
                    control={<Radio />}
                    label={<p style={{fontSize: '.89rem', margin: '0px', fontFamily: 'Jost, Bangla1081, sans-serif'}}>Already Have An Account.</p>}
                  />
                  
                  <FormControlLabel
                    value="new"
                    control={<Radio />}
                    label={<p style={{fontSize: '.87rem', margin: '0px', fontFamily: 'Jost, Bangla1081, sans-serif'}}>Continue As A New User.</p>}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              {
                value === 'old' ?
                (
                  <Signin chekout="true"/>                  
                )
                :
                null
              }
            </Grid>            
          </Grid>
        )
        :
        null
      }
    </>
  );
}
