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
import { signOut} from 'next-auth/react';
import commonService from "../../../service/menu/commonService";
import { repleaceBag, resetShoppingCart } from "../../../redux/shoppingBag/shoppingBagActions";


export default function DashboradSideMenu() {
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
    signOut({redirect: false})
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

  const handleListItemClick = (event, index) => {
    if (index === 0) {
      route.push("/dashboard/account-information?id=" + index);
    } else if (index === 1) {
      route.push("/dashboard/address-book?id=" + index);
    } else if (index === 3) {
      route.push("/dashboard/order-history?id=" + index);
    } else if (index === 4) {
      route.push("/dashboard/cancle-order?id=" + index);
    } else if (index === 6) {
      route.push("/dashboard/rewards?id=" + index);
    } else if (index === 7) {
      route.push("/dashboard/wish-list?id=" + index);
    }
  };

  React.useEffect(() => {
    setSelectedIndex(parseInt(route.query.id));
  }, [route.query.id]);

  return (
    <Box sx={{ width: "100%", border: "1px solid rgba(0,0,0,.12)" }}>
      <List component="nav" aria-label="main mailbox folders" className="pt-0">
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItemIcon>
            <AccountCircleOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Account Information" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemIcon>
            <RoomIcon />
          </ListItemIcon>
          <ListItemText primary="Address Book" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}
        >
          <ListItemIcon>
            <HistoryToggleOffIcon />
          </ListItemIcon>
          <ListItemText primary="Order History" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 4}
          onClick={(event) => handleListItemClick(event, 4)}
        >
          <ListItemIcon>
            <DoDisturbRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Cancled Order" />
        </ListItemButton>
        {/* <ListItemButton
          selected={selectedIndex === 5}
          onClick={(event) => handleListItemClick(event, 5)}
        >
          <ListItemIcon>
            <StarRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Product Review" />
        </ListItemButton> */}
        <ListItemButton
          selected={selectedIndex === 6}
          onClick={(event) => handleListItemClick(event, 6)}
        >
          <ListItemIcon>
            <CardGiftcardIcon />
          </ListItemIcon>
          <ListItemText primary="Reward And Cashback" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 7}
          onClick={(event) => handleListItemClick(event, 7)}
        >
          <ListItemIcon>
            <FavoriteBorderRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Wish List" />
        </ListItemButton>
        <ListItemButton onClick={logoutAccount}>
          <ListItemIcon>
            <LogoutRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
      <Divider />
    </Box>
  );
}
