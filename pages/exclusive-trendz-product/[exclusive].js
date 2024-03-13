import React, { useEffect, useState } from "react";
import axios from "axios";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { BASE_URL } from "../../service/serviceConfig";
import Product from "../../components/core/product/Product";
import { Box } from "@mui/material";
import commonService from "../../service/menu/commonService";
import ProductPagination from "../../components/shared/pagination/ProductPagination";
import { priceRangeOffset } from "../../service/common-service/commonService";

export default function ExclusiveProduct({ data, title }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="ps-shop ps-shop--grid">
        <div className="container product-container">
          {title === "Eid Collection" && (
            <div className="col-md-12 px-0">
              <img
                src="https://d25xyv9ldicae3.cloudfront.net/media/home/eid-banner.jpg"
                alt="eid collection"
                width="100%"
              />
            </div>
          )}
          <h3 className="ps-shop__name mt-4">{title}</h3>
          <hr />
          <div className="ps-shop__product">
            <Box sx={{ padding: { xs: "0px 10px" } }}>
              <div className="row">
                {data.product.length > 0 ? (
                  data.product.map((product, index) => {
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
          {data.product && <ProductPagination products={data} />}
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

  let title = "";
  if (params.exclusive === "trending") {
    title = "Trending";
  } else if (params.exclusive === "exclusiveMen") {
    title = "Exclusive product for Men";
  } else if (params.exclusive === "exclusiveWomen") {
    title = "Exclusive product for Women";
  } else if (params.exclusive === "newArrival") {
    title = "New Arrival";
  } else if (params.exclusive === "festiveProduct") {
    title = "Eid Collection";
  } else if (params.exclusive === "saleableProduct") {
    title = "Sale";
  }
  const axiosRes = await axios
    .get(
      `https://api.miah.shop/api/productByCatSubId?${
        params.exclusive
      }=1&offset=${priceOffset}&sorting=${query.order ? query.order : "DESC"}
      &promoProduct=${query.promoProduct ? query.promoProduct : 0}
      `,
      { headers }
    )
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      let errObj = { error: true };
      return errObj;
    });
  return { props: { data: axiosRes, title: title } };
}
