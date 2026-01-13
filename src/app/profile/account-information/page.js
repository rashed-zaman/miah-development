"use client";

import React from "react";
import AccountInformation from "@/components/route/dashboard/AccountInformation";
import LayoutDashboard from "@/components//route/dashboard/LayoutDashboard";

export default function AccountInformationPage() {
  return (
    <>
      <LayoutDashboard>
        <AccountInformation/>
      </LayoutDashboard>
    </>
  );
}
