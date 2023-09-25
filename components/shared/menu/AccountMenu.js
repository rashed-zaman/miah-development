import React from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import LoginIcon from "@mui/icons-material/Login";
import { Badge, Box, Menu, Button, Grid } from "@mui/material";
import { logout } from "../../redux/auth/authActions";
import { setFormInitailValueNull } from "../../redux/checkout/checkoutActions";
import { defaultAddress, formInitialValue } from "../../demoData/demoData";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import { repleaceBag, resetShoppingCart } from "../../../redux/shoppingBag/shoppingBagActions";

export default function AccountMenu() {

  // hooks
  const route = useRouter();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const shoppingBag = useSelector((state) => state.shoppingBag.shoppingCart);
  // local state
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  // methods
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const logoutUser = () => {
    const data = {
      formInitialValue: formInitialValue,
      defaultAddress: defaultAddress,
    };

    dispatch(logout());
    // dispatch(resetShoppingCart());
    dispatch(setFormInitailValueNull(data));

    route.push('/')
  };

  return (
    <>
      <Badge
        id="sopping-bag-badge"
        aria-controls={open ? "sopping-bag-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onMouseEnter={handleClick}
        sx={{ cursor: "pointer", margin: "0px 10px" }}
      >
        <AccountCircleOutlinedIcon sx={{ marginLeft: "3px" }} />
      </Badge>
      <Menu
        id="sopping-bag-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: "30ch",
            position: "relative",
          },
        }}
        MenuListProps={{
          "aria-labelledby": "sopping-bag-badge",
        }}
      >
        <Box
          sx={{
            width: "30ch",
            padding: "5px",
          }}
        >
          {userInfo.token ? (
            <Grid container spacing={2} px={2} justifyContent="end">
              <Grid item sm={12}>
                <Grid container spacing={0}>
                  <Grid item sm={2} pt={1}>
                    <EmojiEmotionsIcon />
                  </Grid>
                  <Grid item sm={10}>
                    <Link href="/dashboard/account-information">
                      <a>
                        <Button fullWidth variant="outlined">
                          My Account
                        </Button>
                      </a>
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sm={12}>
                <Grid container spacing={0}>
                  <Grid item sm={2} pt={1}>
                    <FavoriteIcon />
                  </Grid>
                  <Grid item sm={10}>
                    <Link href="/dashboard/account-information">
                      <a>
                        <Button fullWidth variant="outlined">
                          My Wish List
                        </Button>
                      </a>
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sm={6}>
                <Button
                  onClick={logoutUser}
                  variant="contained"
                  fullWidth
                  size="small"
                  sx={{
                    background: '#9a7448',
                    "&:hover": {
                      backgroundColor: "#473427",
                      borderColor: "#473427",
                    },
                  }}
                >
                  Logout
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={2} px={2} justifyContent="end">
              <Grid item sm={12}>
                <Grid container spacing={0}>
                  <Grid item sm={2} pt={1}>
                    <LoginIcon />
                  </Grid>
                  <Grid item sm={10}>
                    <Link href="/signin">
                      <a>
                        <Button fullWidth variant="outlined">
                          Sign in
                        </Button>
                      </a>
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sm={12}>
                <Grid container spacing={0}>
                  <Grid item sm={2} pt={1}>
                    <PersonAddAltIcon />
                  </Grid>
                  <Grid item sm={10}>
                    <Link href="/createaccount">
                      <a>
                        <Button fullWidth variant="outlined">
                          Create Account
                        </Button>
                      </a>
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Box>
      </Menu>
    </>
  );
}
