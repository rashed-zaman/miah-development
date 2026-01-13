import React from "react";
import axios from "axios";
import { getSession } from 'next-auth/react';

import { BASE_URL } from "../../../service/serviceConfig";
import { priceRangeOffset } from "../../../service/common-service/commonService";
import LayoutProductList from "../../../components/shared/layout/LayoutProductList";
import Custom404 from "../../404";
import HeadComponent from "../../../components/shared/formUI/head/HeadComponent";

const SubCategory = ({ data }) => {
  return (
    <>
      {data.error ? (
        <div className="no-products-found"><Custom404/></div>
      ) : (
        <>
          <HeadComponent data={data} />
          <LayoutProductList data={data} type="subcategory" />
        </>
      )}
    </>
  );
};

export default SubCategory;

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


  const { subCategory } = params;

  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + session?.token,
  };

  const priceOffset = priceRangeOffset(context);
  const device = getDeviceType(req.headers['user-agent']);
  const axiosRes = await axios
    .get(
      ` ${BASE_URL}productList?subCategoryId=${subCategory}
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
