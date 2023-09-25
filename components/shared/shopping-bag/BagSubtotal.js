import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import CalculateShipping from "./CalculateShipping";

export default function BagSubtotal() {
  const totalAmount = useSelector((state) =>
    state.shoppingBag.shoppingCart.reduce((a, b) => a + (b.amount || 0), 0)
  );

  // local state
  const [shippingCharge, setShippingCharge] = useState(0);

  // methods

  const handleShippingCharge = (shippingCharge) => {
    setShippingCharge(shippingCharge);
  };

  return (
    <div className="col-12 col-lg-4">
      <div className="ps-shopping__box">
        <h3 className="ps-title">Bag totals</h3>
        <div style={{ background: "white", padding: "15px 5px" }}>
          <CalculateShipping handleShippingCharg={handleShippingCharge} />
        </div>
        <div className="ps-shopping__row">
          <div className="ps-shopping__label">Subtotal</div>
          <div className="ps-shopping__price">TK {totalAmount}</div>
        </div>
        <div className="ps-shopping__row">
          <div className="ps-shopping__label">Shipping</div>
          <div className="ps-shopping__price">TK {shippingCharge}</div>
        </div>
        <div className="ps-shopping__row">
          <div className="ps-shopping__label">Discount</div>
          <div className="ps-shopping__price">TK 0</div>
        </div>
        <div className="ps-shopping__row" style={{ borderBottom: "none" }}>
          <div className="ps-shopping__label">Total</div>
          <div className="ps-shopping__total">TK {totalAmount + shippingCharge}</div>
        </div>
        <div className="ps-shopping__checkout">
          <Link href='/checkout'>
            <a
              className="ps-btn ps-btn--rounded ps-btn--dark"
            >
              Proceed to checkout
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
