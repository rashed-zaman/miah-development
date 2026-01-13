import React from "react";
import axios from "axios";
import Head from "next/head";
import { BASE_URL } from "../../service/serviceConfig";
import Product from "../../components/core/product/Product";
import { Box } from "@mui/material";

export default function ExclusiveProduct({ data, title }) {
  console.log(data);
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="ps-shop ps-shop--grid">
        <div className="container product-container">
        <h3 className="ps-shop__name mt-4">{title}</h3>
          <hr />
          <div className="ps-shop__product">
            <Box sx={{padding:{xs:'0px 10px'}}}>
              <div className="row">
                {data.product ? (
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
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { params, query } = context;
  let title = "";
  if (params.exclusive === "trending") {
    title = "Trending";
  } else if (params.exclusive === "exclusiveMen") {
    title = "Exclusive product for Men";
  } else if (params.exclusive === "exclusiveWomen") {
    title = "Exclusive product for Women";
  } else if (params.exclusive === "newArrival") {
    title = "New Arrival";
  }

  const axiosRes = await axios
    .get(
      ` ${BASE_URL}productByCatSubId?exclusiveMen
        =${true}
        &offset=0
        &promoProduct=${query.promoProduct ? query.promoProduct : 1}
        &attribute=
        &tags=
        &price=
        &color=
        &fabric=
        &occasion=
        &price=
        &sizes=
        &pattern=
        &sorting=DESC
      `
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
