import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MobileOtpContainer from "../../opt/MobileOtpContainer";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { axiosCredential, BASE_URL } from "../../../service/serviceConfig";
// import { BASE_URL } from "../../service/serviceConfig";

export default function ChangeMobile({ userInfo }) {
  // hooks
  // state
  const [loading, setLoading] = React.useState(false);
  const [dialog, setDialog] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState(userInfo.phone);

  // methods
  const handeDialog = (status) => {
    setDialog(status);
  };

  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };
  const verifySucceed = () => {
    console.log("success");
  };

  const sentOtp = () => {
    setLoading(true);
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + userInfo.token,
    };

    axiosCredential.get("sanctum/csrf-cookie").then((res) => {
      axios
        .get(BASE_URL + "customerOtp/" + phoneNumber, { headers })
        .then(function (response) {
          if (response.data.status === true) {
            setDialog(true);
            setLoading(false);
          }
          if (response.data.status === false) {
            setLoading(false);
            setErrMsg(response.data.msg);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  };

  return (
    <>
      <Box px={2} py={1}>
        <TextField
          fullWidth
          label="Moblile Number"
          value={phoneNumber}
          onChange={handlePhoneNumber}
        />
        <div>
          <p className="textCenter textRed ">{errMsg}</p>
        </div>
        {loading ? (
          <Button variant="contained" fullWidth>
            <CircularProgress
              color="inherit"
              sx={{ marginRight: "10px" }}
              size={18}
            />
          </Button>
        ) : (
          <Button
            onClick={sentOtp}
            variant="contained"
            sx={{ marginTop: "15px" }}
            fullWidth
          >
            Change Mobile
          </Button>
        )}
      </Box>

      <MobileOtpContainer
        userInfo={userInfo}
        phoneNumber={phoneNumber}
        open={dialog}
        verifySucceed={verifySucceed}
        handeDialog={handeDialog}
      />
    </>
  );
}
