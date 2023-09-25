import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { axiosCredential, BASE_URL } from "../../service/serviceConfig";
import CircularProgress from "@mui/material/CircularProgress";

export default function MobileOtpContainer({
  userInfo,
  phoneNumber,
  open,
  handeDialog,
  verifySucceed,
}) {
  // local state
  // const [open, setOpen] = React.useState(false);
  const [otpType, setOtpType] = React.useState("new");
  const [btnLoading, setBtnLoading] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [errMsg, setErrMsg] = React.useState("");

  // methods
  const handleClose = () => {
    handeDialog(false);
  };

  const handeleSucceed = () => {
    verifySucceed();
  };

  const onSubmit = () => {
    if (code !== "") {
      setBtnLoading(true);
      setErrMsg("");
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userInfo.token,
      };
      const body = {
        phone: phoneNumber,
        code: code,
        countryid: 80,
      };

      axiosCredential.get("sanctum/csrf-cookie").then((res) => {
        axios
          .post(BASE_URL + "updatePhone", body, { headers })
          .then(function (response) {
            if (response.data.status === true) {
              handeleSucceed();
              setBtnLoading(false);
            }
            if (response.data.status === 0) {
              setErrMsg(response.data.data);
              setOtpType("new");
              setBtnLoading(false);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      });
    }
  };

  const handleCode = (e) => {
    const { value } = e.target;
    setCode(value);
  };

  const handleReset = () => {
    setCode("");
    setErrMsg("");
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + userInfo.token,
    };
    axiosCredential.get("sanctum/csrf-cookie").then((res) => {
      axios
        .get(BASE_URL + "customerOtp/" + phoneNumber, { headers })
        .then(function (response) {
          if (response.data.status === true) {
            setOtpType("resend");
            setErrMsg("");
          } else {
            setErrMsg(response.data.msg);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  };

  // side effects
  React.useEffect(() => {
    setOtpType("new");
  }, []);

  return (
    <React.Fragment>
      <Dialog fullWidth maxWidth="sm" open={open}>
        <p className="mt-2 text-center">
          <b>VERIFY MOBILE NUMBER: {phoneNumber}</b>
        </p>
        <DialogContent>
          <DialogContentText>
            A verification code is sent to your mobile number
          </DialogContentText>
          <Box
            sx={{
              mt: "10px",
            }}
          >
            <TextField
              onChange={handleCode}
              fullWidth
              value={code}
              label="Enter verification code"
              variant="outlined"
            />
            <p style={{ color: "red" }}> {errMsg} </p>
            {otpType === "new" ? (
              <Button onClick={handleReset}>Resend</Button>
            ) : null}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          {btnLoading ? (
            <Button variant="contained">
              <CircularProgress
                color="inherit"
                sx={{ marginRight: "10px" }}
                size={18}
              />
            </Button>
          ) : (
            <Button onClick={onSubmit} variant="contained">
              Submit
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
