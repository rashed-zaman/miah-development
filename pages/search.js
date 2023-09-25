import React, { useEffect, useState } from "react";
import { Grid, Box } from "@mui/material";
// import SingleProduct from "../components/product/SingleProduct";
import commonService from "../service/menu/commonService";
import { useRouter } from "next/router";
// import MiahPagination from "../components/pagination/Pagination";
import Skeleton from "@mui/material/Skeleton";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Product from "../components/core/product/Product";
import { Typography } from "@mui/material";
import ProductPagination from "../components/shared/pagination/ProductPagination";
import { getOffset } from "../service/common-service/commonService";

export default function Search() {
  // hooks
  const router = useRouter();

  // local state
  const [responseData, setResponseData] = useState({});
  const [product, setProduct] = useState([]);
  const [backDrp, setBackDrp] = React.useState(true);

  const [searchBy] = useState("search");
  const [params, setParams] = useState(router.query.searchBy);
  const [priceRange, setpriceRange] = useState([
    0,
    parseInt(responseData.maxRate),
  ]);

  // methods

  const setPaginationProducts = (res) => {
    // setResponseData(res.data.data);
  };

  useEffect(() => {
    if (router.isReady) {
      setBackDrp(true);
      const getProducts = () => {
        const api =
          "productByCatSubId?search=" +
          router.query.searchBy +
          "&offset=" +
          getOffset(router) +
          "&attribute=&tags=&price=&sorting=DESC";
        commonService
          .getData(api)
          .then((res) => {
            setProduct(res.product);
            setResponseData(res);
            setBackDrp(false);
          })
          .catch((error) => {
            console.log(error);
          });
      };

      getProducts();
    }
  }, [router.query, router.isReady]);


  useEffect(() => {
    setParams(router.query.searchBy)
  }, [router.query])
  

  return (
    <>
      <div className="ps-shop ps-shop--grid">
        <div className="container product-container">
          <div className="row">
            <div className="col-md-12">
              <Typography
                variant="h4"
                gutterBottom
                component="h1"
                sx={{ marginTop: 1 }}
              >
                Search Product
              </Typography>
              {/* <h1>Search</h1> */}
              <p>
                Search by <b>{params}</b>
              </p>
            </div>
            {backDrp ? (
              <Grid container spacing={5} mt={5} mb={5}>
                <Grid sm={3} xs={6} item>
                  <Skeleton variant="rectangular" width="100%">
                    <div style={{ paddingTop: "57%" }} />
                  </Skeleton>
                </Grid>
                <Grid sm={3} xs={6} item>
                  <Skeleton variant="rectangular" width="100%">
                    <div style={{ paddingTop: "57%" }} />
                  </Skeleton>
                </Grid>
                <Grid sm={3} xs={6} item>
                  <Skeleton variant="rectangular" width="100%">
                    <div style={{ paddingTop: "57%" }} />
                  </Skeleton>
                </Grid>
                <Grid sm={3} xs={6} item>
                  <Skeleton variant="rectangular" width="100%">
                    <div style={{ paddingTop: "57%" }} />
                  </Skeleton>
                </Grid>
                <Grid sm={3} xs={6} item>
                  <Skeleton variant="rectangular" width="100%">
                    <div style={{ paddingTop: "57%" }} />
                  </Skeleton>
                </Grid>
                <Grid sm={3} xs={6} item>
                  <Skeleton variant="rectangular" width="100%">
                    <div style={{ paddingTop: "57%" }} />
                  </Skeleton>
                </Grid>
                <Grid sm={3} xs={6} item>
                  <Skeleton variant="rectangular" width="100%">
                    <div style={{ paddingTop: "57%" }} />
                  </Skeleton>
                </Grid>
                <Grid sm={3} xs={6} item>
                  <Skeleton variant="rectangular" width="100%">
                    <div style={{ paddingTop: "57%" }} />
                  </Skeleton>
                </Grid>
              </Grid>
            ) : (
              <>
                {responseData.product.length > 0 ? (
                  responseData.product.map((product, index) => {
                    return (
                      <div key={index} className="col-6 col-md-4 col-lg-3 mb-5">
                        <Product product={product} />
                      </div>
                    );
                  })
                ) : (
                  <div className="col-12">
                    <p>No Product Found</p>
                  </div>
                )}
              </>
            )}
          </div>
          {responseData.product && !backDrp && <ProductPagination products={responseData} />}
        </div>
      </div>
    </>
  );
}
