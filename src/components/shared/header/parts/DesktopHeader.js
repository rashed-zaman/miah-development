import React from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

// Dynamically import components
const HeaderInner = dynamic(() => import("./HeaderInner"));
const HeaderTop = dynamic(() => import("./HeaderTop"));
const Inner = dynamic(() => import("./Inner"));
const Notify = dynamic(() => import("./Notify"));

export default function DesktopHeader() {
  const router = useRouter();
  const menu = useSelector((state) => state.menu.menu);

  // Define profile-related routes
  const profileRoutes = [
    "/profile/order-history",
    "/profile/rewards",
    "/profile/account-information",
    "/profile/address-book",
    "/profile/wish-list",
  ];

  return (
    <>
      {router.asPath === "/" ? (
        <header className="ps-header ps-header--3 ps-header--4">
          <HeaderInner menu={menu} />
        </header>
      ) : profileRoutes.includes(router.asPath) ? (
        <header className="ps-header ps-header--10000">
          {/* <Notify /> */}
          <Inner menu={menu} />
        </header>
      ) : (
        <header className="ps-header ps-header--7">
          {/* <Notify /> */}
          <Inner menu={menu} />
        </header>
      )}
    </>
  );
}
