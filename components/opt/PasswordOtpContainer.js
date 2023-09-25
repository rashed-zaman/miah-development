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
  formData,
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
    formData.otp = code;
    if (code !== "") {
      setBtnLoading(true);
      setErrMsg("");
      axios
        .post(BASE_URL + "resetPassword", formData)
        .then(function (response) {
          if (response.data.status === true) {
            handeleSucceed();
            handleClose();
            setBtnLoading(false);
          }
          if (response.data.response === 0) {
            setErrMsg(response.data.message);
            setBtnLoading(false);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const handleCode = (e) => {
    const { value } = e.target;
    setCode(value);
  };

  const handleReset = () => {
    axiosCredential.get("sanctum/csrf-cookie").then((res) => {
      axios
        .post(BASE_URL + "forgotPassword", { phone: formData.phone })
        .then(function (response) {
          if (response.data.status === true) {
            setCode("");
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
    setErrMsg("");
  }, []);

  return (
    <>
      <Dialog fullWidth maxWidth="sm" open={open}>
        <p className="text-center mt-3 mb-1">
          <b>VERIFY MOBILE NUMBER {formData.phone}</b>
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
    </>
  );
}
