import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { BASE_URL } from "@/service/serviceConfig";
import Head from "next/head";
import { Box } from "@mui/material";
import Product from "@/components/core/product/Product";
import ProductPagination from "@/components/shared/pagination/ProductPagination";

export default async function ExclusiveProduct({ params, searchParams }) {
  // ✅ MUST await
  const session = await getServerSession(authOptions);
  const token = session?.token ?? session?.accessToken ?? "";

  // ✅ params is sync
  const { exclusive } = await params;
  const search = await searchParams;

  const qs = new URLSearchParams();
  qs.set("sorting", "DESC");
  qs.set("device", "desktop");
  qs.set("promoProduct", search?.promoProduct ?? 0);
  qs.set("page", String(search?.page ?? "1"));

  let title = "";

  if (exclusive === "trending") {
    title = "Trending";
  } else if (exclusive === "exclusiveMen") {
    title = "Exclusive product for Men";
  } else if (exclusive === "exclusiveWomen") {
    title = "Exclusive product for Women";
  } else if (exclusive === "newArrival") {
    title = "New Arrival";
  } else if (exclusive === "festiveProduct") {
    title = "Eid Collection";
  } else if (exclusive === "saleableProduct") {
    title = "Sale";
  }

  const endpoint = `${BASE_URL}productList?${exclusive}=1&${qs.toString()}`;
  const headersObj = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  let data;
  try {
    const res = await fetch(endpoint, {
      headers: headersObj,
      cache: "no-store",
    });
    data = await res.json();
  } catch (e) {
    data = { error: true, message: e.message };
  }

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
                {data.product?.data?.length > 0 ? (
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
