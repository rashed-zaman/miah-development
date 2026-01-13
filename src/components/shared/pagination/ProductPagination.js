"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Pagination from "@mui/material/Pagination";

export default function ProductPagination({ products }) {
  // =============== hooks ================
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // =============== state ================
  const [page, setPage] = useState(1);

  // =============== methods ==============
  const isSearchPagination = () => {
    return pathname.indexOf("searchBy") !== -1;
  };

  const searchPagination = (value) => {
    let prevRoute = pathname;
    router.push(
      prevRoute +
        "?searchBy=" +
        searchParams.get("searchBy") +
        "&page=" +
        value
    );
  };

  const regularPagination = (value) => {
    let prevRoute = pathname;

    pathname.indexOf("filter") !== -1
      ? router.push(
          prevRoute +
            "?page=" +
            value +
            "&filter=" +
            "&occasion=" +
            searchParams.get("occasion") +
            "&color=" +
            searchParams.get("color") +
            "&fabric=" +
            searchParams.get("fabric") +
            "&priceOrder=" +
            searchParams.get("priceOrder") +
            "&bestSelling=" +
            searchParams.get("bestSelling") +
            "&featured=" +
            searchParams.get("featured") +
            "&priceRange=" +
            searchParams.get("priceRange") +
            "&styles=" +
            searchParams.get("styles") +
            "&size=" +
            searchParams.get("size")
        )
      : router.push(prevRoute + "?page=" + value);
  };

  const handleChange = (event, value) => {
    setPage(value);
    const searchType = isSearchPagination();
    searchType ? searchPagination(value) : regularPagination(value);
  };

  // ================== side effect ==========
  useEffect(() => {
    searchParams.get("page") > 1
      ? setPage(Number(searchParams.get("page")))
      : setPage(1);
  }, [searchParams]);

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
