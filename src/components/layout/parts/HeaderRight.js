import React from "react";
import dynamic from 'next/dynamic'
import { useSelector } from "react-redux";
import { selectUserInfo } from "@/store/authSlice";


const HeaderSearch = dynamic(() => import("./HeaderSearch"))
const HeaderUser = dynamic(() => import("./HeaderUser"))
const HeaderWishList = dynamic(() => import("./HeaderWishList"))
const ShoppinBagMini = dynamic(() => import("./ShoppinBagMini"))

export default function HeaderRight() {
  const userInfo = useSelector(selectUserInfo);
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
