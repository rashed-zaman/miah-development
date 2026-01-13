"use client";

import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { Button, Grid, Box } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import commonService from "../../../service/menu/commonService";

export default function UpdateDetails({ data, userInfo, setOpend }) {
  const [msg, setMsg] = useState("");
  const [gender, setGender] = useState(data.gender);
  const [date, setDate] = useState(
    data?.birthday ? dayjs(data.birthday) : null
  );
  const [fname, setFname] = useState(userInfo.first_name);
  const [lname, setLname] = useState(userInfo.last_name);

  const updateChange = () => {
    const body = {
      title: "Mr.",
      first_name: fname,
      last_name: lname,
      birthday: date ? dayjs(date).format("YYYY-MM-DD") : null,
      gender: gender,
    };

    commonService
      .postAuthData("updateProfile", body, userInfo.token)
      .then((res) => {
        setMsg(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (msg === "Profile update successfully") {
      setTimeout(() => setOpend(false), 500);
    }
  }, [msg, setOpend]);

  return (
    <Formik>
      <Form>
        <Box px={2} py={1}>
          <Grid container spacing={2}>
            {/* First & Last Name */}
            <Grid size={{xs:12}}>
              <TextField
                required
                label="First Name"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                fullWidth
              />
            </Grid>

            <Grid size={{xs:12}}>
              <TextField
                required
                label="Last Name"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
                fullWidth
              />
            </Grid>

            {/* DOB */}
            <Grid size={{xs:12}}>
              <h5 className="mt-15 pb-0">DATE OF BIRTH</h5>
            </Grid>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid item xs={4}>
                <DatePicker
                  label="DD"
                  views={["day"]}
                  value={date}
                  onChange={(newDate) => setDate(newDate)}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </Grid>

              <Grid item xs={4}>
                <DatePicker
                  label="MM"
                  views={["month"]}
                  value={date}
                  onChange={(newDate) => setDate(newDate)}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </Grid>

              <Grid item xs={4}>
                <DatePicker
                  label="YYYY"
                  views={["year"]}
                  value={date}
                  onChange={(newDate) => setDate(newDate)}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </Grid>
            </LocalizationProvider>

            {/* Gender */}
            <Grid size={{xs:12}}>
              <FormControl>
                <FormLabel>Gender</FormLabel>
                <RadioGroup
                  row
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
              </FormControl>
            </Grid>

            {/* Submit */}
            <Grid size={{xs:12}}>
              <Button fullWidth onClick={updateChange} variant="contained">
                UPDATE DETAILS
              </Button>
            </Grid>

            {msg && <Grid size={{xs:12}}>{msg}</Grid>}
          </Grid>
        </Box>
      </Form>
    </Formik>
  );
}
