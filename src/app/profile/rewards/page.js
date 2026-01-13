"use client"

import React from "react";
import LayoutDashboard from "@/components/route/dashboard/LayoutDashboard";
import RewardCashback from "@/components/route/dashboard/RewardCashback";


export default function Rewards() {
  return (
    <>
      <LayoutDashboard>
        <RewardCashback/>
      </LayoutDashboard>
    </>
  );
}
