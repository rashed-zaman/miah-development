"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";
import { CookiesProvider, useCookies } from "react-cookie";

import Footer from "./footer/Footer";
import Header from "./header/Header";
const FooterNavigation = dynamic(() =>
  import("@/components/shared/header/parts/FooterNavigation")
);
const PreLoader = dynamic(() =>
  import("@/components/shared/pre-loader/PreLoader")
);
const Search = dynamic(() =>
  import("@/components/shared/searchpanel/SearchPanel")
);

import Link from "next/link";
import SearchPanel from "@/components/shared/searchpanel/SearchPanel";
import MobileShoppingDialog from "../shared/shopping-bag/MobileShoppingDialog";
import Popup from "../shared/popup/Popup";

export default function MainLayout({ children }) {
  const [snackbar, setSnackbar] = useState(false);
  // mehtods
  const checkCookies = () => {
    const checkCookie = document.cookie.indexOf("CookieBy=miahShop");
    if (checkCookie === -1) {
      setSnackbar(true);
    }
  };
  const setCookie = () => {
    document.cookie =
      "CookieBy=miahShop; expires=Thu, 18 Dec 2030 12:00:00 UTC; path=/";
    setSnackbar(false);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setCookie();
  };

  const action = (
    <>
      <Button color="secondary" size="small" onClick={handleClose}>
        Decline
      </Button>
      <Button color="secondary" size="small" onClick={handleClose}>
        accept
      </Button>
    </>
  );

  useEffect(() => {
    checkCookies();
  }, []);

  return (
    <>
      <CookiesProvider>
        <div className="ps-page">
          <Header />
          {children}
          <Footer />
        </div>
        <FooterNavigation />
        <PreLoader />
        <MobileShoppingDialog />
        <Popup />
        <Snackbar
          sx={{ maxWidth: { sm: "500px" } }}
          open={snackbar}
          onClose={handleClose}
          message={
            <p className="text-light mb-0">
              This website uses cookies to provide you with a great user
              experience. By using it, you accept our use of cookies{" "}
              <Link href="/page/privacyPolicy">
                <u>privacy policy.</u>
              </Link>
            </p>
          }
          action={action}
        />
        <SearchPanel />
      </CookiesProvider>
    </>
  );
}
