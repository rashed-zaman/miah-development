import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import commonService from "../../../service/menu/commonService";
import { axiosCredential } from "../../../service/serviceConfig";

export default function ChangeEmail({ userInfo, data, setOpen}) {
  // hooks

  // state
  const [btnLoading, setBlnLoading] = useState(false);
  const [verifybtnLoading, setVerifyBtnLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState("");
  const [email, setEmail] = useState(data.email);
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  // methods
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  
  const handleCode = (e) => {
    setCode(e.target.value);
  };

  const sentEmail = () => {
    setErrMsg("");
    setBlnLoading(true);
    const body = {
      email: email,
    };

    axiosCredential.get("sanctum/csrf-cookie").then((res) => {
      commonService
        .postAuthData("emailOtp", body, userInfo.token)
        .then((res) => {
          if (res.data.status === true) {
            setCodeSent(true);
            setBlnLoading(false);
          } else {
            setErrMsg(res.data.msg);
            setBlnLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    })
  };

  const verifyEmail = () => {
    setSuccessMsg("");
    setVerifyBtnLoading(true);
    const body = {
      email: email,
      otp: code,
    };

    axiosCredential.get("sanctum/csrf-cookie").then((res) => {
      commonService
        .postAuthData("checkEmailVerify", body, userInfo.token)
        .then((res) => {
          console.log(res)
          if (res.data.status === true) {
            setSuccessMsg(res.data.msg);
            setVerifyBtnLoading(false);
            console.log(res.data.msg);
          } else {
            setSuccessMsg(res.data.msg);
            setVerifyBtnLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    })
  };

  useEffect(() => {
    if(successMsg === 'Email update successfully!'){
      setTimeout(()=>setOpen(false),500)
    }
  }, [successMsg]);
  // side effects
  return (
    <>
      {codeSent ? (
        <Box px={2} py={1}>
          <Grid container spacing={2}>
            <Grid item sm={12}>
              <p>
                <small>A verification code is sent to your email</small>
              </p>
              <TextField
                fullWidth
                onChange={handleCode}
                value={code}
                label="Enter Verification Code"
              />
            </Grid>
            <Grid item sm={12}>
              <div>
                <p className="textCenter">
                  <small>{successMsg}</small>
                </p>
              </div>
            </Grid>
            <Grid item sm={6}>
              <Button variant="outlined" fullWidth>
                send again
              </Button>
            </Grid>
            <Grid item sm={6}>
              {verifybtnLoading ? (
                <Button variant="contained" fullWidth>
                  <CircularProgress color="inherit" size={18} />
                </Button>
              ) : (
                <Button onClick={verifyEmail} fullWidth variant="contained">
                  verify
                </Button>
              )}
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Box px={2} py={1}>
          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={handleEmail}
            type="email"
          />
          <div>
            <p className="textCenter textRed">
              <small>{errMsg}</small>
            </p>
          </div>
          {btnLoading ? (
            <Button variant="contained">
              <CircularProgress
                color="inherit"
                sx={{ marginRight: "10px" }}
                size={18}
              />
            </Button>
          ) : (
            <Button onClick={sentEmail} variant="contained" fullWidth>
              Change
            </Button>
          )}
        </Box>
      )}
    </>
  );
}
