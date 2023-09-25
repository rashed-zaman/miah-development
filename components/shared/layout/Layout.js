import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Popup from "../popup/Popup";
import FacebookChat from "../facebook-chat/FacebookChat";
import Link from "next/link";
import { useRouter } from "next/router";
import { Box } from "@mui/material";

// import Footer from "../footer/Footer";
// import Header from "../header/Header";
// import FooterNavigation from "../header/parts/FooterNavigation";
// import MenuSlideBar from "../menu-slidebar/MenuSlideBar";
// import PreLoader from "../pre-loader/PreLoader";
// import Search from "../search/Search";
// import SearchPanel from "../searchpanel/SearchPanel";
// import MobileAccount from "../../shared/menu/MobileAccount";
// import MobileShoppingDialog from "../shopping-bag/MobileShoppingDialog";

const Footer = dynamic(() => import("../footer/Footer"));
const Header = dynamic(() => import("../header/Header"));
const FooterNavigation = dynamic(() =>
  import("../header/parts/FooterNavigation")
);
// const MenuSlideBar = dynamic(() => import("../menu-slidebar/MenuSlideBar"));
const PreLoader = dynamic(() => import("../pre-loader/PreLoader"));
const Search = dynamic(() => import("../search/Search"));
const SearchPanel = dynamic(() => import("../searchpanel/SearchPanel"));
const MobileAccount = dynamic(() => import("../../shared/menu/MobileAccount"));
const MobileShoppingDialog = dynamic(() =>
  import("../shopping-bag/MobileShoppingDialog")
);

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: grey[900],
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#11cb5f",
    },
  },
  typography: {
    fontFamily: "Jost",
  },
});

export default function Layout({ children }) {
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
        accept
      </Button>
    </>
  );

  useEffect(() => {
    checkCookies();
  }, []);
  const route = useRouter();
  return (
    // {route.asPath === "/" ? (
    <ThemeProvider theme={theme}>
      <div className="ps-page">
        <Header />
        {children}
        <Box sx={{display:{xs:'none', sm:'block'}}}>
          <Footer />
        </Box>
        <Box sx={{display:{xs:'block', sm:'none'}}}>
          {route.asPath === "/checkout" ? 
            null: <Footer />
          }
        </Box>
      </div>
      <Search />
      <SearchPanel />
      <MobileAccount />
      <FooterNavigation />
      {/* <MenuSlideBar /> */}
      <PreLoader />
      <MobileShoppingDialog />
      {/* <Popup /> */}
      <FacebookChat />

      <Snackbar
        sx={{ maxWidth: { sm: "500px" } }}
        open={snackbar}
        onClose={handleClose}
        message={
          <p className="text-light mb-0">
            This website uses cookies to provide you with a great user
            experience. By using it, you accept our use of cookies {' '}
            <Link href="/page/privacyPolicy">
              <a>
                <u>privacy policy.</u>
              </a>
            </Link>
          </p>
        }
        action={action}
      />
    </ThemeProvider>
  );
}
