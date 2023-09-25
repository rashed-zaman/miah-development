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
      ` ${BASE_URL}productByCatSubId?categoryId=${params.category}
        &offset=${priceOffset}
        &promoProduct=${query.promoProduct ? query.promoProduct : 1}
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

  return { props: { data: axiosRes } };
}
