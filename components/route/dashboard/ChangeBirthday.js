import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import { MiahSubmitButton, MiahLoadingButton } from "../../core/button/MiahButton";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import commonService from "../../../service/menu/commonService";
import { DatePicker } from "@mui/x-date-pickers";

export default function UpdateDetails({data, userInfo, setOpend}) {
  const[msg, setMsg] = useState('');
  const [value, setValue] = React.useState(data.gender);
  const[date, setDate] =React.useState(dayjs(data.birthday));
  const[fname, setFname] = useState(userInfo.first_name);
  const[lname, setLname] = useState(userInfo.last_name);
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  let bdDay = date.$y +'-'+0+(date.$M+1)+'-'+0+date.$D;
  const updateChange=()=>{
    const body={
      title: 'Mr.',
      first_name: fname,
      last_name: lname,
      birthday: bdDay,
      gender:value,
    };
    commonService.postAuthData("updateProfile",body, userInfo.token)
    .then((res) => {
      setMsg(res.data.data)
      console.log(res);
      console.log(res.data.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    if(msg === 'Profile update successfully'){
      setTimeout(()=>setOpend(false),500)
    }
  }, [msg]);
  return (
    <Formik
    >
      <Form>
        <Box px={2} py={1}>
          <Grid container spacing={2}>
            <Grid item sm={12}>
              <Grid container>
              <Grid sm={12}>
                  <TextField
                    required
                    id="outlined-required"
                    label="First Name"
                    value={data.first_name}
                    onChange={e=>setFname(e.target.value)}
                    fullWidth
                  />
                </Grid>
              <Grid sm={12} mt={2}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Last Name"
                    value={data.last_name}
                    onChange={e=>setLname(e.target.value)}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>
            <h5 className="mt-15 pb-0">DATE OF BIRTH</h5>
            <Grid item sm={12}>
              <Grid container spacing={2}>
                <Grid item sm={4}>      
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateField value={date} fullWidth label={'DD'} format='DD' onChange={date=>setDate(date)} />
                    </LocalizationProvider>
                </Grid>
                <Grid item sm={4}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateField value={date} fullWidth label={'MM'} format='MM' onChange={(month)=>setDate(month)} />
                    </LocalizationProvider>
                </Grid>
                <Grid item sm={4}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateField value={date} fullWidth label={'YYYY'}  format='YYYY' onChange={(year)=>setDate(year)} />
                  </LocalizationProvider>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={12}>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={value}
                  onChange={handleChange}
                >
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item sm={12}>
              {/* <MiahSubmitButton onClick={updateChange}>UPDATE DETAILS</MiahSubmitButton> */}
              <Button fullWidth onClick={updateChange} variant="contained">UPDATE DETAILS</Button>
            </Grid>
            <div>{msg}</div>
          </Grid>
        </Box>
      </Form>
    </Formik>
  );
}
