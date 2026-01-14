import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Slide, Divider } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";

import PasswordWrapper from "../formUI/passwordFeild/PasswordWrapper";
import TextField from "../../../components/shared/formUI/textField";
import {
  Dialog,
  DialogContent,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import {
  MiahButton,
  MiahLoadingButton,
  MiahSubmitButton,
} from "../../core/button/MiahButton";
import commonService from "../../../service/menu/commonService";
import Link from "next/link";
import { setMobileUserAccount, setUserInfo } from "@/store/authSlice";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});
// Initaial form value
const INITIAL_FORM_STATE = {
  email: "",
  password: "",
};

// form validation rules
const FORM_VALIDATION = Yup.object().shape({
  email: Yup.string().required("Requird"),
  password: Yup.string().required("Requird"),
});

const MobileAccount = () => {
  // hooks
  const router = useRouter();
  const dialog = useSelector((state) => state.auth.mobileUserDialog);
  const dispatch = useDispatch();

  // local state
  const [btnLoading, setBtnLoading] = useState(false);
  const [errMsg, seterrMsg] = useState("");

  // methods
  const handleClose = () => {
    dispatch(setMobileUserAccount(false));
  };

  const onSubmit = (vlaues) => {
    setBtnLoading(true);
    seterrMsg("");
    commonService
      .postData("login", vlaues)
      .then((res) => {
        setBtnLoading(false);
        if (res.data.data.response === "success") {
          dispatch(setUserInfo(res.data.data));
          router.push("/profile/account-information");
          handleClose();
        }
        if (res.data.data.response === "error") {
          seterrMsg(res.data.data.msg);
        }
        console.log(res.data.data);
      })
      .catch((error) => {
        console.log("errror", error);
      });
  };
  return (
    <>
      <Dialog
        fullScreen
        open={dialog}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", padding: "0px", background: 'rgba(0,0,0,.0)' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="primary"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1, color: 'rgba(0,0,0,.8)' }} variant="h6" component="div">
              Identification
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent sx={{paddingBottom: 15 }}>
          <Box>
            <p>
              <b>I ALREADY HAVE AN ACCOUNT</b>
            </p>
            <Formik
              initialValues={{
                ...INITIAL_FORM_STATE,
              }}
              validationSchema={FORM_VALIDATION}
              enableReinitialize={true}
              onSubmit={onSubmit}
            >
              <Form>
                <Grid container spacing={2}>
                  <Grid size={12}>
                    <TextField name="email" label="Email" type="text" />
                  </Grid>
                  <Grid size={12}>
                    <PasswordWrapper name="password" label="Password" />
                  </Grid>
                  <Grid size={12}>
                    <p className="textCenter textRed">{errMsg}</p>
                    {btnLoading ? (
                      <MiahLoadingButton></MiahLoadingButton>
                    ) : (
                      <MiahSubmitButton>SignIn</MiahSubmitButton>
                    )}
                  </Grid>
                </Grid>
              </Form>
            </Formik>
            <Link href="/password-recovery">
           
                <p onClick={handleClose}>
                  Forget password ?
                </p>
             
            </Link>
            <Divider />
            <p>
              {"I DON'T HAVE AN ACCOUNT"}
            </p>
            <MiahButton>
              <div className="mb-0 text-white" onClick={handleClose}>
                <Link href="/createaccount">
                  Create Account
                </Link>
              </div>
            </MiahButton>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MobileAccount;
