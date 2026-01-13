"use client"

import React from "react";
import OrderHistory from "@/components/route/dashboard/OrderHistory";
import LayoutDashboard from "@/components/route/dashboard/LayoutDashboard";
import ShowOrderHistory from "@/components/route/dashboard/ShowOrderHistory";
import CurrentOrder from "@/components/route/dashboard/CurrentOrder";


export default function OrderHistoryPage() {
  return (
    <>
      <LayoutDashboard>
        <CurrentOrder />
        <ShowOrderHistory />
      </LayoutDashboard>
    </>
  );
}
