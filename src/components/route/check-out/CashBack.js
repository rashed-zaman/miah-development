import React from "react";
import { useSelector } from "react-redux";

export default function CashBack() {
  const offerDiscount = useSelector((state) => state.checkout.offerDiscount);

  return (
    <>
      {offerDiscount.casbackAmount > 0 && (
        <div className="cashback-container mt-3">
          <img src="/img/cash_back_icon.svg" alt="" />
          <span>TK {offerDiscount.casbackAmount}</span>
        </div>
      )}
    </>
  );
}
