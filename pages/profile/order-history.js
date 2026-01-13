import React from "react";
import LayoutDashboard from "../../components/route/dashboard/LayoutDashboard";
import OrderHistory from "../../components/route/dashboard/OrderHistory";
import CurrentOrder from "../../components/route/dashboard/CurrentOrder";
import OrderQuery from "../../components/route/dashboard/OrderQuery";
import ShowOrderHistory from "./OrderHistory";


export default function OrderHistoryPage() {
  return (
    <>
      <LayoutDashboard>
        {/* <OrderHistory/> */}
        <CurrentOrder/>
        <ShowOrderHistory/>
      </LayoutDashboard>
      <OrderQuery />
    </>
  );
}
