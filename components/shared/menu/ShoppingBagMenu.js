import React from "react";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Divider, Badge, Box, Menu, Button } from "@mui/material";
import { removeFromBag } from "../../redux/shoppingBag/shoppingBagActions";
import { MiahButtonRegular } from "../button/MiahButton";
import { IMAGE_URL } from "../../service/serviceConfig";

export default function ShoppingBagMenu() {
  // hooks
  const SgoppingBagLength = useSelector((state) =>
    state.shoppingBag.shoppingCart.reduce((a, b) => a + (b.qty || 0), 0)
  );
  const shoppingBag = useSelector((state) => state.shoppingBag.shoppingCart);
  const dispatch = useDispatch();

  // Desktop Menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const removeItem = (item) => {
    dispatch(removeFromBag(item));
  };
  return (
    <>
      <Badge
        id="sopping-bag-badge"
        aria-controls={open ? "sopping-bag-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onMouseEnter={handleClick}
        sx={{ cursor: "pointer" }}
        badgeContent={SgoppingBagLength}
      >
        <ShoppingBagOutlinedIcon sx={{ marginLeft: "3px" }} />
      </Badge>
      <Menu
        id="sopping-bag-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            height: 300,
            width: "35ch",
            position: "relative",
          },
        }}
        MenuListProps={{
          "aria-labelledby": "sopping-bag-badge",
        }}
      >
        <Box
          sx={{
            height: "240px",
            overflowY: "auto",
            width: "35ch",
            padding: "5px",
          }}
        >
          {shoppingBag.length ? (
            <Grid container spacing={0}>
              {shoppingBag.map((item, pos) => {
                return (
                  <Grid item xs={12} key={pos} mb={1}>
                    <Grid container spacing={2} mb={1}>
                      <Grid item xs={3}>
                        <Image
                          src={`${IMAGE_URL}m_thumb/${item.image}`}
                          alt="Picture of the author"
                          width={300}
                          height={300}
                          layout="responsive"
                        />
                      </Grid>
                      <Grid item xs={9}>
                        <p className="mrY">
                          <b>
                            <small>{item.name}</small>
                          </b>
                        </p>
                        <p className="mrY">
                          <small>
                            <b>Sku : </b>
                            {item.id}
                          </small>
                        </p>
                        {item.size ? (
                          <p className="mrY">
                            <small>
                              <b>Size : </b>
                              {item.size}
                            </small>
                          </p>
                        ) : null}
                        <p className="mrY">
                          <small>
                            <b>Unit Price : </b>
                            {item.unitPrice}
                          </small>
                        </p>
                        <p className="mrY">
                          <small>
                            {item.category_id === 7 ? (
                              <b>YARD : </b>
                            ) : (
                              <b>QTY : </b>
                            )}
                            {item.qty}
                          </small>
                        </p>
                        <Box
                          sx={{
                            width: "70px",
                            background: "#473427",
                            color: "white",
                            textAlign: "center",
                            padding: "0px 2px 3px 2px",
                            cursor: "pointer",
                          }}
                          onClick={() => removeItem(item)}
                        >
                          <small>Remove</small>
                        </Box>
                      </Grid>
                    </Grid>
                    <Divider />
                  </Grid>
                );
              })}
            </Grid>
          ) : (
            <p className="textCenter">Empty shopping bag</p>
          )}
        </Box>
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <Box sx={{ paddingLeft: "10px" }}>
              <Button variant="text">
                <Link href="/shoppingBag">
                  <a>bag details</a>
                </Link>
              </Button>
            </Box>
          </Grid>
          <Grid item sm={6}>
            <Box sx={{ textAlign: "right", paddingRight: "10px" }}>
              <MiahButtonRegular>
                <Link href="/Checkout">
                  <a>Checkout</a>
                </Link>
              </MiahButtonRegular>
            </Box>
          </Grid>
        </Grid>
      </Menu>
    </>
  );
}
