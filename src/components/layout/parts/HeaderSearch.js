import React from "react";

import { setSearchPanel } from "@/store/menuSlice";
import { useDispatch } from "react-redux";

export default function HeaderSearch() {
  // hooks
  const dispatch = useDispatch();

  const showSearchPanel = () => {
    dispatch(setSearchPanel(true));
  };

  return (
    <li className="ps-header__item cursor-pointer" onClick={showSearchPanel}>
      <span className="ps-header__link">
        <img src="/img/icon/search.svg" alt="" />
      </span>
    </li>
  );
}
