import React, { useEffect, useState } from "react";
import axios from "axios";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { BASE_URL } from "../service/serviceConfig";
import Product from "../components/core/product/Product";
import { Box } from "@mui/material";
import commonService from "../service/menu/commonService";
import ProductPagination from "../components/shared/pagination/ProductPagination";
import { priceRangeOffset } from "../service/common-service/commonService";


export default function EidCollection({ data }) {
  return (
    <>
      <Head>
        <title>Eid Collection</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="ps-shop ps-shop--grid">
        <div className="container product-container">
            <div className="col-md-12 px-0">
              <img
                src="https://d25xyv9ldicae3.cloudfront.net/media/home/eid-banner.jpg"
                alt="eid collection"
                width="100%"
              />
            </div>
          <h3 className="ps-shop__name mt-4">Eid Collection</h3>
          <hr />
          <div className="ps-shop__product">
            <Box sx={{ padding: { xs: "0px 10px" } }}>
              <div className="row">
                {data.product.data.length > 0 ? (
                  data.product.data.map((product, index) => {
                    return (
                      <div key={index} className="col-6 col-md-4 col-lg-3 px-1">
                        <Product product={product} />
                      </div>
                    );
                  })
                ) : (
                  <div className="col-12">
                    <p>No Product Found</p>
                  </div>
                )}
              </div>
            </Box>
          </div>
          {data.product && <ProductPagination products={data.product} />}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { params, query } = context;

  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + session?.token,
  };

  const priceOffset = priceRangeOffset(context);

  const axiosRes = await axios
    .get(
      `${BASE_URL}productList?festiveProduct=1
      &offset=${priceOffset}
      &sorting=${query.order ? query.order : "DESC"}
      &device=desktop&page=${query.page || 1}
      &promoProduct=${query.promoProduct ? query.promoProduct : 0}
      `,
      { headers }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      let errObj = { error: true };
      return errObj;
    });
  return { props: { data: axiosRes} };
}
