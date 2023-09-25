import React, { useEffect } from "react";
import axios from "axios";
import { getSession } from 'next-auth/react';

import { BASE_URL } from "../service/serviceConfig";
import { getOffset, priceRangeOffset } from "../service/common-service/commonService";
import LayoutProductList from "../components/shared/layout/LayoutProductList";
// import { useRouter } from 'next/router'

const RootCategory = ({ data }) => {
  // const router = useRouter()
  
  // useEffect(() => {
  //   console.log(getOffset(router))
  // }, [router.asPath])
  
  return (
    <>
      {data.error ? (
        <div className="no-products-found">No Products Found</div>
      ) : (
        <LayoutProductList data={data} type="rootCategory" />
      )}
    </>
  );
  // return <LayoutProductList data={data} type="rootCategory" />;
};

export default RootCategory;

export async function getServerSideProps(context) {
  const session = await getSession( context );
  const { params, query } = context;

  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + session?.token,
  }

  const priceOffset = priceRangeOffset(context);
  const axiosRes = await axios
    .get(
      ` ${BASE_URL}productByCatSubId?departmentId=${params.rootCategory}
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
