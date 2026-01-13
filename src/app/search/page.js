"use client";

import React, { useEffect, useState } from "react";
import { Grid, Box, Typography, Skeleton } from "@mui/material";
import axios from "axios";
import { useSearchParams } from "next/navigation";

import Product from "@/components/core/product/Product";
import ProductPagination from "@/components/shared/pagination/ProductPagination";

import { BASE_URL } from "@/service/serviceConfig";

export default function SearchPage() {
  // hooks
  const searchParams = useSearchParams();

  const searchBy = searchParams.get("searchBy");
  const page = searchParams.get("page") || 1;

  // local state
  const [responseData, setResponseData] = useState({});
  const [product, setProduct] = useState([]);
  const [backDrp, setBackDrp] = useState(true);
  const [params, setParams] = useState(searchBy);

  useEffect(() => {
    if (!searchBy) return;

    setBackDrp(true);

    const api = `productList?search=${searchBy}&page=${page}&device=desktop&sorting=DESC`;

    axios
      .get(BASE_URL + api)
      .then((response) => {
        setProduct(response.data.product.data);
        setResponseData(response);
        setBackDrp(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setBackDrp(false);
      });
  }, [searchBy, page]);

  useEffect(() => {
    setParams(searchBy);
  }, [searchBy]);

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
                sx={{ mt: 1 }}
              >
                Search Product
              </Typography>

              <p>
                Search by <b>{params}</b>
              </p>
            </div>

            {backDrp ? (
              <Grid container spacing={5} mt={5} mb={5}>
                {[...Array(8)].map((_, i) => (
                  <Grid sm={3} xs={6} item key={i}>
                    <Skeleton variant="rectangular" width="100%">
                      <div style={{ paddingTop: "57%" }} />
                    </Skeleton>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <>
                {product.length > 0 ? (
                  product.map((item, index) => (
                    <div key={index} className="col-6 col-md-4 col-lg-3 mb-5">
                      <Product product={item} />
                    </div>
                  ))
                ) : (
                  <div className="col-12">
                    <p>No Product Found</p>
                  </div>
                )}
              </>
            )}
          </div>

          {product.length > 0 && !backDrp && (
            <ProductPagination products={responseData.data.product} />
          )}
        </div>
      </div>
    </>
  );
}
