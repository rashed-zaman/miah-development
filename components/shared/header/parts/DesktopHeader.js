import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

// import HeaderInner from "./HeaderInner";
// import HeaderTop from "./HeaderTop";
// import Inner from "./Inner";
// import Notify from "./Notify";

const HeaderInner = dynamic(() => import("./HeaderInner"));
const HeaderTop = dynamic(() => import("./HeaderTop"));
const Inner = dynamic(() => import("./Inner"));
const Notify = dynamic(() => import("./Notify"));

import {
  fetchMenu,
  fetchStieOptions,
} from "../../../../redux/menu/menuActions";

export default function DesktopHeader() {
  // hooks
  const route = useRouter();
  const menu = useSelector((state) => state.menu.menu);
  const dispatch = useDispatch();

  // side effect
  useEffect(() => {
    dispatch(fetchStieOptions());
    dispatch(fetchMenu());
  }, []);
  
  return (
    <>
      {route.asPath === "/" ? (
        <header className="ps-header ps-header--3 ps-header--4">
          <HeaderInner menu={menu} />
        </header>
      ) : (
        <header className="ps-header ps-header--7">
          <Notify />
          <Inner menu={menu} />
        </header>
      )}
    </>
  );
}
