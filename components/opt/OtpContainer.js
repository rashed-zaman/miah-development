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

export default function OtpContainer({
  email,
  phoneNumber,
  open,
  handeDialog,
  verifySucceed,
}) {
  // const [open, setOpen] = React.useState(false);
  const [otpType, setOtpType] = React.useState("new");
  const [btnLoading, setBtnLoading] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [errMsg, setErrMsg] = React.useState("");

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

      axiosCredential.get("sanctum/csrf-cookie").then((res) => {
        axios
          .post(BASE_URL + "checkOtp", { phone: phoneNumber, code: code })
          .then(function (response) {
            if (response.data.status === true) {
              handeleSucceed();
              setBtnLoading(false);
            } else {
              setErrMsg(response.data.msg);
              setOtpType("new");
              handeleSucceed();
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
    axiosCredential.get("sanctum/csrf-cookie").then((res) => {
      axios
        .post(BASE_URL + "otp", { phone: phoneNumber, email: email })
        .then(function (response) {
          if (response.data.status === true) {
            setOtpType("resend");
            setErrMsg("");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  };

  React.useEffect(() => {
    setOtpType("new");
  }, []);

  return (
    <React.Fragment>
      <Dialog fullWidth maxWidth="sm" open={open}>
        <p className="mt-2 text-center">
          <b>VERIFY MOBILE NUMBER : {phoneNumber}</b>
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
