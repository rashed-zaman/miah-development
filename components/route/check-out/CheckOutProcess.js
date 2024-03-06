import { useEffect, useState } from "react";
import RegularProcess from "./check-process/RegularProcess";
import EasyProcess from "./check-process/EasyProcess";
import { BASE_URL, axiosCredential } from "../../../service/serviceConfig";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import commonService from "../../../service/menu/commonService";
import { setUserInfo } from "../../../redux/auth/authActions";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function CheckOutProcess({ setCheckout, setNewUserMobile }) {
  // hooks
  const dispatch = useDispatch();
  const router = useRouter();
  const shoppingBag = useSelector((state) => state.shoppingBag.shoppingCart);

  // local state
  const [mobile, setMobile] = useState("");
  const [code, setCode] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [processType, setProcesstype] = useState("regular");
  const [btnLoading, setBtnLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);

  const [open, setOpen] = useState(false);
  const [err, setErr] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    isOtpSent ? checkStock() : sentOtp();
  };

  //  resend otp
  const reSendOpt = () => {
    setIsOtpSent(false);
    setCode("");
    sentOtp();
    setErr(false);
  };

  // send opt
  const sentOtp = () => {
    setBtnLoading(true);
    setErr(false);
    axiosCredential.get("sanctum/csrf-cookie").then((res) => {
      commonService
        .postData("alienOtp", { phone: mobile })
        .then((res) => {
          setBtnLoading(false);
          setIsOtpSent(true);
          setCode("");
        })
        .catch((error) => {
          setBtnLoading(false);
        });
    });
  };

  // check otp
  const checkOtp = () => {
    verifyEasyCehckoutOtp();
  };

  // easycheckout opt verify
  const verifyEasyCehckoutOtp = () => {
    axiosCredential.get("sanctum/csrf-cookie").then((res) => {
      commonService
        .postData("easyCheckoutOtpVerify", { phone: mobile, code: code })
        .then((res) => {
          console.log(res.data);

          if (res.data.status == false) {
            setBtnLoading(false);
            setErr(true)
            return;
          }

          if (res.data.data.response == "success") {
            setCheckout(true);
            dispatch(setUserInfo(res.data.data));
          }

          if (res.data.status) {
            if (processType === "easy") {
              submitEasyCheckoutOrder();
            } else {
              setCheckout(true);
            }
          }

          // if (res.data.status == true) {
          //   setBtnLoading(false);
          //   const { token } = res.data.data;
          //   if (token) {
          //     setCheckout(true);
          //     dispatch(setUserInfo(res.data.data));
          //   } else {
          //     if (processType === "regular") {
          //       setCheckout(true);
          //     } else {
          //       submitEasyCheckoutOrder();
          //     }
          //   }
          // } else{
          //   setErr(true)
          // }

          setBtnLoading(false);

          // setIsOtpSent(true);
        })
        .catch((error) => {
          setBtnLoading(false);
        });
    });
  };

  // check stock
  const checkStock = () => {
    setBtnLoading(true);
    commonService
      .postData("cartStockChk", { cart: shoppingBag })
      .then((res) => {
        // if stock error not found continue order
        if (res.data.status === 0) {
          // if payment type cash
          checkOtp();
        }
        // if stock erro found sent to shopping bag
        if (res.data.status === 1) {
          dispatch(repleaceBag(res.data.data));
          router.push("/shopping-bag");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // easy checkout order
  const submitEasyCheckoutOrder = () => {
    const body = {
      name: name,
      mobile: mobile,
      address: address,
      cart: toString(shoppingBag),
    };
    commonService
      .postData("easyCheckout", body)
      .then((res) => {
        if (res.data.status) {
          setOpen(true);
          setIsOtpSent(false);
          setAddress("");
          setMobile("");
          setCode("");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // side effect

  useEffect(() => {
    setNewUserMobile(mobile);
  }, [mobile]);

  return (
    <>
      {/* <button onClick={submitEasyCheckoutOurder}>Submit Order</button> */}
      {processType === "regular" ? (
        <RegularProcess
          setProcesstype={setProcesstype}
          setMobile={setMobile}
          mobile={mobile}
          btnLoading={btnLoading}
          setBtnLoading={setBtnLoading}
          handleSubmit={handleSubmit}
          isOtpSent={isOtpSent}
          setIsOtpSent={setIsOtpSent}
          code={code}
          setCode={setCode}
          reSendOpt={reSendOpt}
          err={err}
        />
      ) : (
        <EasyProcess
          setMobile={setMobile}
          setProcesstype={setProcesstype}
          handleSubmit={handleSubmit}
          mobile={mobile}
          isOtpSent={isOtpSent}
          setIsOtpSent={setIsOtpSent}
          code={code}
          setCode={setCode}
          address={address}
          setAddress={setAddress}
          name={name}
          setName={setName}
          btnLoading={btnLoading}
          setBtnLoading={setBtnLoading}
          reSendOpt={reSendOpt}
          err={err}
        />
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Your Order has been placed successfully"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
