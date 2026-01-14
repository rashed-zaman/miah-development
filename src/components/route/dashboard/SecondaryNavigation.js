"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import Link from "next/link";
import commonService from "../../../service/menu/commonService";

export default function SecondaryNavigation() {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const pathname = usePathname();

  // ---------------------------sticky-----------------------
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  // ---------------------------sticky-----------------------

  const [data, setData] = useState({
    credit_amount: 0,
    pending_credit_amount: 0,
    pending_reward: 0,
    reward_point: 0,
    status: 1,
  });

  const getRewards = () => {
    commonService
      .authGetData("rewardPoint", userInfo.token)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (userInfo?.token) {
      getRewards();
    }
  }, [userInfo]);

  return (
    <>
      <div className="container">
        <div className="ps-second----header">
          <div>
            <h2 style={{ textTransform: "uppercase" }}>
              HI {userInfo?.first_name}
            </h2>
            <img src="/img/miahpoint.svg" className="miahpoint" alt="points" />
            <span>{data.reward_point} Points to Spend</span>
          </div>

          <div>
            {userInfo?.userLevel == 1 ? (
              <img src="/img/miahclublevel/miah club level-01.svg" alt="level1" />
            ) : userInfo?.userLevel == 2 ? (
              <img src="/img/miahclublevel/miah club level-02.svg" alt="level2" />
            ) : userInfo?.userLevel == 3 ? (
              <img src="/img/miahclublevel/miah club level-03.svg" alt="level3" />
            ) : userInfo?.userLevel == 4 ? (
              <img src="/img/miahclublevel/miah club level-04.svg" alt="level4" />
            ) : (
              <img src="/img/miahclublevel/miah club level-05.svg" alt="level5" />
            )}
          </div>
        </div>
      </div>

      <header className={`tab___2p-VC ${isSticky ? "ps-header--sticky" : ""}`}>
        <ul className="menu">
          <li className="has-mega-menu">
            <Link
              href="/profile/rewards"
              className={pathname === "/profile/rewards" ? "active" : ""}
            >
              FEED
            </Link>
          </li>

          <li className="has-mega-menu">
            <Link
              href="/profile/order-history"
              className={
                pathname === "/profile/order-history" ? "active" : ""
              }
            >
              ORDERS
            </Link>
          </li>

          <li className="has-mega-menu">
            <Link
              href="/profile/account-information"
              className={
                pathname === "/profile/address-book" ||
                pathname === "/profile/account-information" ||
                pathname === "/profile/cancle-order" ||
                pathname === "/profile/wish-list"
                  ? "active"
                  : ""
              }
            >
              ACCOUNT
            </Link>
          </li>
        </ul>
      </header>
    </>
  );
}
