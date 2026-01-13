import React from "react";
import AddressBook from "../../components/route/dashboard/AddresBook";
import LayoutDashboard from "../../components/route/dashboard/LayoutDashboard";


export default function AddressBookPage() {
  return (
    <>
      <LayoutDashboard>
        <AddressBook />
      </LayoutDashboard>
    </>
  );
}
