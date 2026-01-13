"use client";
import { useDispatch, useSelector } from "react-redux";
import dynamic from 'next/dynamic'
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { fetchMenu, selectMenu } from "@/store/menuSlice";

import HeaderInner from "./HeaderInner";
const Inner = dynamic(() => import("./Inner"));
const Notify = dynamic(() => import("./Notify"));

export default function DesktopHeader() {

   const [scrolled, setScrolled] = useState(false);


     useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  const dispatch = useDispatch();
  const pathname = usePathname();

  const menu = useSelector(selectMenu);

    // Define profile-related routes
  const profileRoutes = [
    "/profile/order-history",
    "/profile/rewards",
    "/profile/account-information",
    "/profile/address-book",
    "/profile/wish-list",
  ];


  useEffect(() => {
    dispatch(fetchMenu());
  }, [dispatch]);

  return (
    <>
      {pathname === "/" ? (
        <header className={scrolled ? "ps-header ps-header--3 ps-header--4 ps-header--sticky" : "ps-header ps-header--3 ps-header--4"}>
          <HeaderInner menu={menu} />
        </header>
      ) : profileRoutes.includes(pathname) ? (
        <header className={scrolled ? "ps-header ps-header--10000 ps-header--sticky" : "ps-header ps-header--10000"}>
          <Notify />
          <Inner menu={menu} />
        </header>
      ) : (
        <header className={scrolled ? "ps-header ps-header--7 ps-header--sticky" : "ps-header ps-header--7"}>
          <Notify />
          <Inner menu={menu} />
        </header>
      )}
    </>
  );
}
