import { useEffect, useState, useCallback } from "react";
import RegularProcess from "./check-process/RegularProcess";
import EasyProcess from "./check-process/EasyProcess";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import commonService from "../../../service/menu/commonService";
import { replaceBag } from "@/store/shoppingBagSlice";
import { easyCheckOutDataLayer } from "../../../service/data-layer-creator/dataLayerCreator";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { setUserInfo } from "@/store/authSlice";

export default function CheckOutProcess({ setCheckout, setNewUserMobile }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const shoppingBag = useSelector((state) => state.shoppingBag.shoppingCart);

  const [mobile, setMobile] = useState("");
  const [code, setCode] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [processType, setProcesstype] = useState("regular");
  const [btnLoading, setBtnLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState(false);

  const handleClose = () => setOpen(false);

  const reSendOpt = useCallback(() => {
    setIsOtpSent(false);
    setCode("");
    sentOtp();
    setErr(false);
  }, []);

  const sentOtp = useCallback(() => {
    setBtnLoading(true);
    setErr(false);
    commonService.postData("alienOtp", { phone: mobile }).then(() => {
      setBtnLoading(false);
      setIsOtpSent(true);
      setCode("");
    }).catch(() => setBtnLoading(false));
  }, [mobile]);

  const verifyEasyCheckoutOtp = useCallback(() => {
    commonService.postData("easyCheckoutOtpVerify", { phone: mobile, code }).then((res) => {
      if (res.data.status == false) {
        setBtnLoading(false);
        setErr(true);
        return;
      }
      if (res.data.data.response === "success") {
        setCheckout(true);
        dispatch(setUserInfo(res.data.data));
      }
      setBtnLoading(false);
      processType === "easy" ? submitEasyCheckoutOrder() : setCheckout(true);
    }).catch(() => setBtnLoading(false));
  }, [mobile, code, processType, dispatch, setCheckout]);

  const checkStock = useCallback(() => {
    setBtnLoading(true);
    commonService.postData("cartStockChk", { cart: shoppingBag }).then((res) => {
      if (res.data.status === 0) verifyEasyCheckoutOtp();
      if (res.data.status === 1) {
        dispatch(replaceBag(res.data.data));
        router.push("/shopping-bag");
      }
    }).catch(console.error);
  }, [shoppingBag, dispatch, router, verifyEasyCheckoutOtp]);

  const submitEasyCheckoutOrder = useCallback(() => {
    const body = {
      name,
      mobile,
      address,
      cart: JSON.stringify(shoppingBag),
    };
    commonService.postData("easyCheckout", body).then((res) => {
      if (res.data.status) {
        router.push("/easy-checkout");
        easyCheckOutDataLayer(shoppingBag);
        setTimeout(() => {
          setBtnLoading(false);
          setIsOtpSent(false);
          setAddress("");
          setMobile("");
          setCode("");
        }, 4000);
      }
    }).catch(() => setBtnLoading(false));
  }, [name, mobile, address, shoppingBag, router]);

  useEffect(() => {
    setNewUserMobile(mobile);
  }, [mobile, setNewUserMobile]);

  return (
    <>
      {processType === "regular" ? (
        <RegularProcess
          setProcesstype={setProcesstype}
          setMobile={setMobile}
          mobile={mobile}
          btnLoading={btnLoading}
          handleSubmit={isOtpSent ? checkStock : sentOtp}
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
          handleSubmit={isOtpSent ? checkStock : sentOtp}
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
          reSendOpt={reSendOpt}
          err={err}
        />
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Your Order has been placed successfully</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>OK</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
