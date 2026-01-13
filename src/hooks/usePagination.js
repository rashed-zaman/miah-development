import React from "react";
// import useSWR from "swr";
// import axios from "axios";

export default function usePagination() {
  // hooks
  const fetcher = (url) => axios.get(url).then((res) => res);
  const { data, error } = useSWR(
    "https://www.miahapi.amanatshahgroup.com/api/productByCatSubId?departmentId=women&offset=" +
      offset +
      "&attribute=&tags=&price=",
    fetcher
  );

  return {
    user: data,
    isLoading: !error && !data,
    isError: error
  }
}
