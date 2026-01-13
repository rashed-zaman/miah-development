"use client";

import BagSubtotal from "@/components/shared/shopping-bag/BagSubtotal";
import BagTopArea from "@/components/shared/shopping-bag/BagTopArea";
import DesktopBag from "@/components/shared/shopping-bag/DesktopBag";
import MobileBag from "@/components/shared/shopping-bag/MobileBag";
import { stockStatus } from "@/service/order-service/orderService";
import {
  addItemQty,
  removeFromBag,
  removeItemQty,
} from "@/store/shoppingBagSlice";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function ShoopingBagPage() {
  const dispatch = useDispatch();

  // ===== Redux state =====
  const shoppingBag = useSelector((state) => state.shoppingBag.shoppingCart);
  const shoppingBagQty = useSelector((state) =>
    state.shoppingBag.shoppingCart.reduce((a, b) => a + (b.qty || 0), 0)
  );

  // ===== Methods =====
  const removeItem = (item) => {
    dispatch(removeFromBag(item));
  };

  const changeQty = async (item, changeType) => {
    try {
      const res = await stockStatus({
        sku: item.id,
        qty: changeType === "deduct" ? item.qty - 1 : item.qty + 1,
      });

      // Update stock info
      item.stock = !res.status;

      if (changeType === "add") {
        dispatch(addItemQty(item));
      } else if (changeType === "deduct" && item.qty > 1) {
        dispatch(removeItemQty(item));
      }
    } catch (err) {
      console.error("Error updating stock:", err);
    }
  };

  useEffect(() => {
    // Optional effect if you want to watch shoppingBag
  }, [shoppingBag]);

  return (
    <div className="ps-shopping">
      <div className="container">
        <BagTopArea shoppingBagQty={shoppingBagQty} />
        <div className="ps-shopping__content">
          <div className="row">
            <div className="col-12 col-lg-8">
              <MobileBag
                shoppingBag={shoppingBag}
                removeItem={removeItem}
                changeQty={changeQty}
              />
              <DesktopBag
                shoppingBag={shoppingBag}
                removeItem={removeItem}
                changeQty={changeQty}
              />
            </div>
            <BagSubtotal />
          </div>
        </div>
      </div>
    </div>
  );
}
