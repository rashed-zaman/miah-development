import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromBag, replaceBag } from "@/store/shoppingBagSlice";

import { IMAGE_URL } from "@/service/serviceConfig";
import { removecartDataLayer } from "@/service/data-layer-creator/dataLayerCreator";
import { useEffect } from "react";
import { postAuthData } from "@/lib/commonService";
import { useState } from "react";
import { saveUserCart } from "@/service/cart-service/cartService";
import axios from "axios";
export default function ShoppinBagMini() {
  // =========== hooks ============
  const userInfo = useSelector((state) => state.auth.userInfo);
  const shoppingBag = useSelector((state) => state.shoppingBag.shoppingCart);
  const SgoppingBagLength = useSelector((state) =>
    state.shoppingBag.shoppingCart.reduce((a, b) => a + (b.qty || 0), 0)
  );
  const totalAmount = useSelector((state) =>
    state.shoppingBag.shoppingCart.reduce((a, b) => a + (b.amount || 0), 0)
  );

  const dispatch = useDispatch();
  // ================== methods =============
  const removeItem = (item) => {
    dispatch(removeFromBag(item));
    removecartDataLayer(item);
  };
  // -------------------test-------------------
  const [cart, setCart] = useState([]);

  const changeCart = () => {
    postAuthData("cartLog", { cart: shoppingBag }, userInfo.token)
      .then((res) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (userInfo.token) {
      changeCart();
    }
  }, [shoppingBag]);
  // -------------------test-------------------

  return (
    <li className="ps-header__item open-cart-mini">
      <a className="ps-header__link" href="#">
        <img src="/img/icon/cart.svg" alt="" />
        <span className="badge">{SgoppingBagLength}</span>
      </a>
      <div className="ps-cart--mini">
        <div className="ps-cart__content">
          <ul className="ps-cart__items">
            {shoppingBag &&
              shoppingBag.map((item, index) => {
                return (
                  <li className="ps-cart__item" key={index}>
                    <div className="ps-product--mini-cart">
                      <span className="ps-product__thumbnail">
                        <Link href={`/product/${item.slug}`}>
                            <img
                              src={`${IMAGE_URL + "/m_thumb/"}${item.image}`}
                              alt="alt"
                            />
                        </Link>
                      </span>
                      <div className="ps-product__content">
                        <Link href={`/product/${item.slug}`}>
                            <span className="ps-product__name">
                              {item.name}
                            </span>
                        </Link>
                        <div className="ps-product__meta">
                          <span className="ps-product__price">
                            TK {item.unitPrice}
                          </span>
                        </div>
                        {item?.size && (
                          <div className="ps-product__meta">
                            <span className="ps-product__price">
                              Size {item.size}
                            </span>
                          </div>
                        )}
                        <div className="ps-product__quantity">
                          <span className="ps-product__price">
                            Qty {item.qty}
                          </span>
                          <div className="ps-product__total">
                            <span className="ps-product__price">
                              TK {item.unitPrice * item.qty}{" "}
                            </span>
                          </div>
                        </div>
                      </div>
                      <a
                        className="ps-product__remove"
                        onClick={() => removeItem(item)}
                      >
                        <img src="/img/icon/close.svg" alt="" />
                      </a>
                    </div>
                  </li>
                );
              })}
          </ul>
          <div className="ps-cart__total">
            <span>Subtotal </span>
            <span>TK {totalAmount} </span>
          </div>
          <div className="ps-cart__footer">
            <Link href="/shopping-bag" className="ps-btn ps-btn--rounded ps-btn--dark">
              View Bag
            </Link>
            <Link href="/checkout" className="ps-btn ps-btn--rounded ps-btn--danger">
              Checkout
            </Link>
          </div>
        </div>
        <div className="ps-cart__empty">
          <img src="/img/icon/cart-empty.svg" alt="" />
          <p className="ps-cart__text">Your cart is currently empty.</p>
        </div>
      </div>
    </li>
  );
}
