import React, { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Slide } from "@mui/material";
import { connect, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import { useDispatch } from "react-redux";




import { stockStatus } from "../../../service/order-service/orderService";
import MobileBag from "./MobileBag";
import { addItemQty, removeFromBag, removeItemQty, setMobileBagDialog } from "@/store/shoppingBagSlice";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function MobileShoppingDialog() {
  // hooks
  const shoppingBag = useSelector((state) => state.shoppingBag.shoppingCart);
  const dialog = useSelector((state) => state.shoppingBag.mobileBagDialog);
  const dispatch = useDispatch();
  const router = useRouter();
  const totalAmount = shoppingBag.reduce((a, b) => a + (b.amount || 0), 0);

  // methods

  const removeItem = (item) => {
    dispatch(removeFromBag(item));
  };

  const changeQty = (item, changeType) => {
    stockStatus({
      sku: item.id,
      qty: changeType === "deduct" ? item.qty - 1 : item.qty + 1,
    }).then((res) => {
      if (res.status === true) {
        item.stock = false;
        if (changeType === "add") {
          dispatch(addItemQty(item));
        }
        if (changeType === "deduct" && item.qty > 1) {
          dispatch(removeItemQty(item));
        }
      } else {
        item.stock = true;
        if (changeType === "add") {
          dispatch(addItemQty(item));
        }
        if (changeType === "deduct" && item.qty > 1) {
          dispatch(removeItemQty(item));
        }
      }
    });
  };
  const goToCheckout = () => {
    router.push("/checkout");
    dispatch(setMobileBagDialog(false));
  };
  const goToShoppingBag = () => {
    router.push("/shopping-bag");
    dispatch(setMobileBagDialog(false));
  };
  const handleClose = () => {
    dispatch(setMobileBagDialog(false));
  };

  useEffect(() => {
    if (shoppingBag.length == 0) {
      handleClose();
    }
  }, [shoppingBag]);

  return (
    <>
      <Dialog
        fullScreen
        open={dialog}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar
          sx={{ position: "relative", padding: "0px", backgroundColor: "#fff" }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="primary"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              sx={{ ml: 2, flex: 1, color: "rgba(0,0,0.8)" }}
              variant="h6"
              component="div"
            >
              Your Bag
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <div className="ps-shopping">
            <div className="ps-shopping__content">
              <MobileBag
                shoppingBag={shoppingBag}
                removeItem={removeItem}
                changeQty={changeQty}
              />
            </div>
          </div>
        </DialogContent>
        <Box
          sx={{
            background: "#fff",
            color: "#000",
            fontSize: "14px",
            textAlign: "center",
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            zIndex: "modal",
            padding: "15px 0px",
            boxShadow: "2px 2px 5px rgba(0,0,0,.5)",
            display: { xs: "block", sm: "none" },
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={4}>
              Total TK {totalAmount}
            </Grid>
            <Grid item xs={4} onClick={goToShoppingBag}>
              View Bag Details
            </Grid>
            <Grid item xs={4} onClick={goToCheckout}>
              Checkout
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </>
  );
}
