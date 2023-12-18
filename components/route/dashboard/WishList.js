import React from "react";
import { Box, Card, Grid, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import commonService from "../../../service/menu/commonService";
import Image from "next/image";
import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";

export default function WishList() {
  // hooks
  const userInfo = useSelector((state) => state.auth.userInfo);

  // state
  const [allWishList, setAllWishList] = React.useState([]);
  // methods
  const getWishList = () => {
    commonService
      .authGetData("wishList", userInfo.token)
      .then((res) => {
        setAllWishList(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const removeWishList = (id) => {
    commonService
      .authGetData("removeWishList/" + id, userInfo.token)
      .then((res) => {
        getWishList();
      })
      .catch((err) => console.log(err));
  };

  // sideeffects
  React.useEffect(() => {
    getWishList();
  }, []);

  return (
    <>
      <Card variant="outlined">
        <Box
          sx={{
            padding: "0px 15px",
            paddingTop: '5px',
            paddingBottom: '60px',
          }}
        >
          <div className="pt-15">
            <h3>WISH LIST</h3>
          </div>
          <div className="pt-30">
            <Grid container spacing={2}>
              {allWishList.map((wish, pos) => {
                return (
                  <Grid item sm={3} xs={6} key={pos}>
                    <Link href={`/product/${wish.slug}`}>
                      <a>
                        <Image
                          src={`https://images.miah.shop/product/m_thumb/${wish.img}`}
                          alt="Picture of the author"
                          width={300}
                          height={300}
                          layout="responsive"
                        />
                        {wish.name}
                      </a>
                    </Link>
                    <div>
                      <small>TK {wish.sales_cost}</small>
                    </div>
                    <div>
                      <IconButton
                        onClick={() => removeWishList(wish.product_id)}
                        aria-label="delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </Box>
      </Card>
    </>
  );
}
