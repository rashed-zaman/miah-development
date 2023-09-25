import React from "react";
import { Card, Divider, Box, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ChangePassword from "./ChangePassword";
import ChangeEmail from "./ChangeEmail";
import ChangeMobile from "./ChangeMobile";

export default function AccountInformation() {
  // hooks
  const userInfo = useSelector((state) => state.auth.userInfo);
  // state
  const [passwordCheckd, setPasswordCheckd] = React.useState(false);
  const [emailCheckd, setEmailCheckd] = React.useState(false);
  const [mobileCheckd, setMobileCheckd] = React.useState(false);

  const handlePasswordChange = () => {
    setPasswordCheckd((prev) => !prev);
  };
  const handleEmailChange = () => {
    setEmailCheckd((prev) => !prev);
  };
  const handleMobileChange = () => {
    setMobileCheckd((prev) => !prev);
  };

  React.useEffect(() => {
    // console.log(userInfo);
  }, []);

  return (
    <>
      <h3>Account Information</h3>
      <Card variant="outlined">
        <Box
          sx={{
            borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
            padding: "0px 15px",
            paddingTop: '5px'
          }}
        >
          <h4>Pesrsonal Information</h4>
        </Box>
        <Grid container spacing={2} pl={2}>
          <Grid item sm={6} xs={6}>
            <p>First Name</p>
            <p>
              <b>{userInfo.first_name}</b>
            </p>
          </Grid>
          <Grid item sm={6} xs={6}>
            <p>Last Name</p>
            <p>
              <b>{userInfo.last_name}</b>
            </p>
          </Grid>
          <Grid item sm={6} xs={12}>
            <p>Email</p>
            <p>
              <b>{userInfo.email}</b>
            </p>
          </Grid>
          <Grid item sm={12}>
            <p>Mobile Number</p>
            <p>
              <b>{userInfo.phone}</b>
            </p>
          </Grid>
        </Grid>
        <Grid container spacing={2} pl={2}>
          <Grid item sm={12}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handlePasswordChange}
                    checked={passwordCheckd}
                  />
                }
                label="Change Password"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleEmailChange}
                    checked={emailCheckd}
                  />
                }
                label="Change Email"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleMobileChange}
                    checked={mobileCheckd}
                  />
                }
                label="Change Mobile Number"
              />
            </FormGroup>
          </Grid>
        </Grid>
      </Card>

      {passwordCheckd ? (
        <Card variant="outlined" sx={{ marginTop: "20px" }}>
          <Box
            sx={{
              borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
              padding: "0px 15px",
            }}
          >
            <h4>Change Password</h4>
            <Divider />
          </Box>

          <Grid container spacing={2}>
            <Grid item sm={6}>
              <ChangePassword userInfo={userInfo} />
            </Grid>
          </Grid>
        </Card>
      ) : null}

      {emailCheckd ? (
        <Card variant="outlined" sx={{ marginTop: "20px" }}>
          <Box
            sx={{
              borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
              padding: "0px 15px",
            }}
          >
            <h4>Change Email</h4>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} mt={2}>
              <ChangeEmail userInfo={userInfo}/>
            </Grid>
          </Grid>
        </Card>
      ) : null}

      {mobileCheckd ? (
        <Card variant="outlined" sx={{ marginTop: "20px" }}>
          <Box
            sx={{
              borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
              padding: "0px 15px",
            }}
          >
            <h4>Change Mobile</h4>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} mt={2}>
              <ChangeMobile userInfo={userInfo} />
            </Grid>
          </Grid>
        </Card>
      ) : null}
    </>
  );
}
