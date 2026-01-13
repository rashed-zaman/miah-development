import React from "react";
import dynamic from 'next/dynamic'
import { useSelector } from "react-redux";


// import HeaderSearch from "./HeaderSearch";
// import HeaderUser from "./HeaderUser";
// import HeaderWishList from "./HeaderWishList";
// import ShoppinBagMini from "./ShoppinBagMini";


const HeaderSearch = dynamic(() => import("./HeaderSearch"))
const HeaderUser = dynamic(() => import("./HeaderUser"))
const HeaderWishList = dynamic(() => import("./HeaderWishList"))
const ShoppinBagMini = dynamic(() => import("./ShoppinBagMini"))

export default function HeaderRight() {
  const userInfo = useSelector((state) => state.auth.userInfo);
  return (
    <div className="ps-header__right">
      <ul className="ps-header__icons">
        <HeaderSearch />
        <HeaderUser userInfo={userInfo} />
        <HeaderWishList userInfo={userInfo} />
        <ShoppinBagMini />
      </ul>
    </div>
  );
}
