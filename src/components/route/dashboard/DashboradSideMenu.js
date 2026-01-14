"use client";

import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useRouter, useSearchParams } from "next/navigation";

import { defaultAddress, formInitialValue } from "@/app/demoData/demoData";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "next-auth/react";
import commonService from "@/service/menu/commonService";
import { resetShoppingCart } from "@/store/shoppingBagSlice";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { logout } from "@/store/authSlice";
import { resetForm } from "@/store/checkoutSlice";

export default function DashboradSideMenu({ page, setBoard }) {
  // hooks
  const userInfo = useSelector((state) => state.auth.userInfo);
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  // local state
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  // methods
  const logoutAccount = () => {
    const data = {
      formInitialValue: formInitialValue,
      defaultAddress: defaultAddress,
    };

    dispatch(logout());
    dispatch(resetForm(data));
    router.push("/");
    signOut({ redirect: false });
    handleLogout();
    dispatch(resetShoppingCart());
  };

  const handleLogout = () => {
    commonService
      .postAuthData("logout", {}, userInfo.token)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };

  const handleListItemClick = (e, index) => {
    if (index === 0 ) {
      router.push("/profile/account-information?id=0");
    } else if (index === 1 ) {
      router.push("/profile/address-book?id=1");
    } else if (index === 2 ) {
      router.push("/profile/wish-list?id=2");
    }
    setBoard(false);
  };

  React.useEffect(() => {
    const id = searchParams.get("id");
    if (id !== null) {
      setSelectedIndex(parseInt(id));
    }
  }, [searchParams]);

  return (
    <>
      <h4>ACCOUNT OVERVIEW</h4>
      <Box sx={{ width: { sm: "80%", xs: "100%" }, background: "white" }}>
        <List
          sx={{
            "& .MuiListItemButton-root:hover": {
              backgroundColor: "#000",
              color: "#fff",
            },
            "& .MuiSvgIcon-root": {
              fontSize: "1rem",
            },
            "& .MuiTypography-root": {
              fontSize: "1.2rem",
            },
          }}
          component="nav"
          className="pt-0"
        >
          <ListItemButton
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0)}
          >
            <ListItemText primary="Account Information" />
            <ListItemIcon>
              <ArrowForwardIosIcon />
            </ListItemIcon>
          </ListItemButton>

          <ListItemButton
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1)}
          >
            <ListItemText primary="Address Book" />
            <ListItemIcon>
              <ArrowForwardIosIcon />
            </ListItemIcon>
          </ListItemButton>

          <ListItemButton
            selected={selectedIndex === 2}
            onClick={(event) => handleListItemClick(event, 2)}
          >
            <ListItemText primary="Wish List" />
            <ListItemIcon>
              <ArrowForwardIosIcon />
            </ListItemIcon>
          </ListItemButton>

          <ListItemButton onClick={logoutAccount}>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </Box>
    </>
  );
}
