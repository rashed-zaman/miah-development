import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import commonService from "../../../../service/menu/commonService";

export default function HeaderWishList({ userInfo }) {
  // =========== hooks ============
  const wishList = useSelector((state) => state.auth.wishList);

  // local state

  const [wishLenght, setWishLength] = useState(0);

  // methods
  const getWishList = () => {
    commonService
      .authGetData("wishList", userInfo.token)
      .then((res) => {
        setWishLength(res.data.data.length);
        console.log(res.data.data);
        
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    userInfo.token && getWishList();
  }, [wishList, userInfo]);

  return (
    <li className="ps-header__item">
      <Link href="/dashboard/wish-list?id=7">
        <a className="ps-header__link">
          <img src="/img/icon/heart.svg" alt="" />
          {userInfo.token ? (
            <span className="badge">{wishLenght}</span>
          ) : (
            <span className="badge">0</span>
          )}
        </a>
      </Link>
    </li>
  );
}
