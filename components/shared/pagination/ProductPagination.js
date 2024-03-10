import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Pagination from "@mui/material/Pagination";

export default function ProductPagination({ products }) {
  // =============== hooks ================
  const router = useRouter();

  // =============== state ================
  const [page, setPage] = React.useState(1);
  // =============== methods ==============
  const isSearchPagination = () => {
    return router.asPath.indexOf("searchBy") !== -1 ? true : false;
  };

  const searchPagination = (value) => {
    let prevRoute = router.asPath.split("?");
    router.push(
      prevRoute[0] +
        "?searchBy=" +
        router.query.searchBy +
        // "&promoProduct=0" +
        "&page=" +
        value
    );
  };

  const regularPagination = (value) => {
    let prevRoute = router.asPath.split("?");
    router.asPath.indexOf("filter") !== -1
      ? router.push(
          prevRoute[0] +
            "?page=" +
            value +
            "&filter=" +
            // "&promoProduct=0" +
            "&occasion=" +
            router.query.occasion +
            "&color=" +
            router.query.color +
            "&fabric=" +
            router.query.fabric +
            "&order=" +
            router.query.order +
            "&priceOrder=" +
            router.query.priceOrder +
            "&bestSelling=" +
            router.query.bestSelling +
            "&featured=" +
            router.query.featured +
            "&styles=" + router.query.styles
        )
      : router.push(prevRoute[0] + "?page=" + value );
  };
  const handleChange = (event, value) => {
    setPage(value);
    const searchType = isSearchPagination();
    searchType ? searchPagination(value) : regularPagination(value);
  };

  // ================== side effect ==========
  useEffect(() => {
    router.query.page > 1
      ? setPage(Number(router.query.page))
      : setPage(1);
  }, [router.query]);

  return (
    <>
      <Pagination
        count={products.last_page}
        page={page}
        boundaryCount={4}
        size="small"
        onChange={handleChange}
      />
    </>
  );
}
