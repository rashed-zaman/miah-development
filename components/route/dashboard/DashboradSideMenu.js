import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DoDisturbRoundedIcon from "@mui/icons-material/DoDisturbRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import RoomIcon from "@mui/icons-material/Room";
import { useRouter } from "next/router";
import { defaultAddress, formInitialValue } from "../../../demoData/demoData";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/auth/authActions";
import { setFormInitailValueNull } from "../../../redux/checkout/checkoutActions";
import { signOut } from 'next-auth/react';
import commonService from "../../../service/menu/commonService";
import { repleaceBag, resetShoppingCart } from "../../../redux/shoppingBag/shoppingBagActions";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


export default function DashboradSideMenu({page, setBoard}) {
  // hooks
  const userInfo = useSelector((state) => state.auth.userInfo);
  const route = useRouter();
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

    dispatch(setFormInitailValueNull(data));
    route.push("/");
    signOut({ redirect: false })
    handleLogout()
    dispatch(resetShoppingCart());
  };
  const handleLogout = () => {
    commonService
      .postAuthData("logout", {}, userInfo.token)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const handleListItemClick = (e, index) => {
    if (index === 0 && page===true) {
      route.push("/profile/account-information");
    } else if (index === 1 && page===true) {
      route.push("/profile/address-book");
    } else if (index === 2 && page===true) {
      route.push("/profile/wish-list");
    }
    setBoard(false)
  };
  //   if (index === 0) {
  //     route.push("/dashboard/account-information?id=" + index);
  //   } else if (index === 1) {
  //     route.push("/dashboard/address-book?id=" + index);
  //   } else if (index === 3) {
  //     route.push("/dashboard/order-history?id=" + index);
  //   } else if (index === 4) {
  //     route.push("/dashboard/cancle-order?id=" + index);
  //   } else if (index === 6) {
  //     route.push("/dashboard/rewards?id=" + index);
  //   } else if (index === 7) {
  //     route.push("/dashboard/wish-list?id=" + index);
  //   }
  // };

  React.useEffect(() => {
    setSelectedIndex(parseInt(route.query.id));
  }, [route.query.id]);

  return (
    <>
      <h4>ACCOUNT OVERVIEW</h4>
      <Box sx={{ width: { sm: "80%", xs: "100%" }, background: 'white' }}>
        <List sx={{
          '& .MuiListItemButton-root:hover': {
            backgroundColor: '#000',
            color: '#fff',
          }, '& .MuiSvgIcon-root': {
            fontSize: '1rem',
          }, '& .MuiTypography-root': {
            fontSize: '1.2rem',
          }
        }} component="nav" aria-label="main mailbox folders" className="pt-0">
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
            selected={selectedIndex === 7}
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
