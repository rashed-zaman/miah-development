"use client"

import React, { useEffect, useState } from "react";
import { Dialog, IconButton } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { CookiesProvider, useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { IMAGE_URL } from "../../../service/serviceConfig";



export default function Popup() {
  // ============== hooks =================
  const siteOptions = useSelector((state) => state.menu.siteOptions);
  const [cookies, setCookie, get] = useCookies(["demoPromoCookie"]);
  // ========= local state ============
  const [open, setOpen] = useState(false);

  // ============== methods ============

  const initialPromo = () => {
    var date = new Date();
    date.setTime(date.getTime() + (60 * 1000));
    setCookie('demoPromoCookie', 'demoPromoCookie', { path: '/', expires: date });

    // console.log("cookies", cookies);

    const promiCookie = cookies
    if (promiCookie.demoPromoCookie != "demoPromoCookie") {
      document.cookie =
        "promiCookie=promiCookie; expires=Thu, 18 Dec 2030 12:00:00 UTC;";
      setTimeout(() => {
        setOpen(true);
      }, 2000);
    }
  };

  const destroyPromoCookie = () => {
    setTimeout(() => {
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
            <img   src={`https://images.miah.shop/banner/${siteOptions.popup.image}`} alt="" />
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
