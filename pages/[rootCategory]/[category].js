import React from "react";
import axios from "axios";
import { getSession } from 'next-auth/react';

import { BASE_URL } from "../../service/serviceConfig";
import { priceRangeOffset } from "../../service/common-service/commonService";
import LayoutProductList from "../../components/shared/layout/LayoutProductList";

const Category = ({ data }) => {
  return (
    <>
      {data.error ? (
        <div className="no-products-found">No Products Found</div>
      ) : (
        <LayoutProductList data={data} type="category" />
      )}
    </>
  );
};

export default Category;

const getDeviceType = (userAgent) => {
  if (/mobi/i.test(userAgent)) {
    return 'mobile';
  } else {
    return 'desktop';
  }
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { params, query, req } = context;

  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + session?.token,
  };

  const priceOffset = priceRangeOffset(context);
  const device = getDeviceType(req.headers['user-agent']);
  const axiosRes = await axios
    .get(
      ` ${BASE_URL}productList?categoryId=${params.category}
        &offset=${priceOffset}
        &attribute=
        &tags=
        &price=
        &color=${query.color ? query.color : ""}
        &fabric=${query.fabric ? query.fabric : ""}
        &occasion=${query.occasion ? query.occasion : ""}
        &price=${query.priceRange ? query.priceRange : ""}
        &sizes=${query.size ? query.size : ""}
        &pattern=${query.pattern ? query.pattern : ""}
        &sorting=${query.order ? query.order : "DESC"}
        &device=${device}
        &styles=${query.styles ? query.styles : ""}
        &featured=${query.featured ? query.featured : ""}
        &priceOrder=${query.priceOrder ? query.priceOrder : ""}
        &page=${query.page || 1}
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

  return { props: { data: axiosRes } };
}
