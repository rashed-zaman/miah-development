import React, { useEffect, useState } from "react";
import { Dialog, IconButton } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
// import { CookiesProvider, useCookies } from "react-cookie";
import { useSelector } from "react-redux";

export default function Popup() {
  // ============== hooks =================
  const siteOptions = useSelector((state) => state.menu.siteOptions);
  // const [cookies, setCookie, get] = useCookies(["demoPromoCookie"]);
  // ========= local state ============
  const [open, setOpen] = useState(false);

  // ============== methods ============

  const initialPromo = () => {
    // var date = new Date();
    // date.setTime(date.getTime() + (60 * 1000));
    // setCookie('demoPromoCookie', 'demoPromoCookie', { path: '/', expires: date });

    // const promiCookie = get(cookies);

    // console.log(promiCookie);

    // if (promiCookie === -1) {
    //   document.cookie =
    //     "promiCookie=promiCookie; expires=Thu, 18 Dec 2030 12:00:00 UTC;";
    //   setTimeout(() => {
    //     setOpen(true);
    //   }, 2000);
    // }
  };

  const destroyPromoCookie = () => {
    setTimeout(() => {
      console.log("promo destroye");
      document.cookie = "promiCookie=; expires=Thu, 18 Dec 1970 12:00:00 UTC;";
    }, 200 * 1000);
  };

  const handleClose = () => {
    setOpen(false);
    destroyPromoCookie();
  };

  useEffect(() => {
    initialPromo();
  }, []);

  return (
    <>
      {siteOptions.popup && (
        <Dialog onClose={handleClose} open={open}>
          <div className="popup-container">
            <img src="/img/popup/discount-200tk-dsk.jpg" alt="" />
            <IconButton
              aria-label="close button"
              className="close-icon-button"
              onClick={handleClose}
            >
              <HighlightOffIcon sx={{ fontSize: 30 }} />
            </IconButton>
          </div>
        </Dialog>
      )}
    </>
  );
}
