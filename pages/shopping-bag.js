import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import BagSubtotal from "../components/shared/shopping-bag/BagSubtotal";
import BagTopArea from "../components/shared/shopping-bag/BagTopArea";
import DesktopBag from "../components/shared/shopping-bag/DesktopBag";
import MobileBag from "../components/shared/shopping-bag/MobileBag";
import {
  removeFromBag,
  addItemQty,
  removeItemQty,
} from "../redux/shoppingBag/shoppingBagActions";

import { stockStatus } from "../service/order-service/orderService";

export default function ShoppingBag() {
  // =========== hooks ============
  const shoppingBag = useSelector((state) => state.shoppingBag.shoppingCart);
  const shoppingBagQty = useSelector((state) =>
    state.shoppingBag.shoppingCart.reduce((a, b) => a + (b.qty || 0), 0)
  );
  const dispatch = useDispatch();

  // methods
  const removeItem = (item) => {
    dispatch(removeFromBag(item));
  };

  const changeQty = (item, changeType) => {
    stockStatus({
      sku: item.id,
      qty: changeType === "deduct" ? item.qty - 1 : item.qty + 1,
    }).then((res) => {
      if (res.status === true) {
        item.stock = false;
        if (changeType === "add") {
          dispatch(addItemQty(item));
        }
        if (changeType === "deduct" && item.qty > 1) {
          dispatch(removeItemQty(item));
        }
      } else {
        item.stock = true;
        if (changeType === "add") {
          dispatch(addItemQty(item));
        }
        if (changeType === "deduct" && item.qty > 1) {
          dispatch(removeItemQty(item));
        }
      }
    });
  };

  useEffect(() => {
  }, [shoppingBag])
  
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
