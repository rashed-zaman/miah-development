import React from "react";
import OrderHistory from "../../components/route/dashboard/OrderHistory";
import LayoutDashboard from "../../components/route/dashboard/LayoutDashboard";


export default function OrderHistoryPage() {
  return (
    <>
      <LayoutDashboard>
        <OrderHistory />
      </LayoutDashboard>
    </>
  );
}
