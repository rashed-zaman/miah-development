import React from "react";
import WishList from "../../components/route/dashboard/WishList";
import LayoutDashboard from "../../components/route/dashboard/LayoutDashboard";

export default function WishListPage() {
  return (
    <>
      <LayoutDashboard>
        <WishList />
      </LayoutDashboard>
    </>
  );
}
