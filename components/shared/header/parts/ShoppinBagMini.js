import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromBag, repleaceBag } from "../../../../redux/shoppingBag/shoppingBagActions";

import { IMAGE_URL } from "../../../../service/serviceConfig";
import { removecartDataLayer } from "../../../../service/data-layer-creator/dataLayerCreator";
import { useEffect } from "react";
import commonService from "../../../../service/menu/commonService";
import { useState } from "react";
import { saveUserCart } from "../../../../service/cart-service/cartService";
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

  // function calculateTotalAmount(items) {
  //   let totalAmount = 0;
  
  //   for (const item of items) {
  //     totalAmount += item.unitPrice * item.qty;
  //   }
  
  //   return totalAmount;
  // }
  
  // // // Calculate total cost of all items
  // const totalAmount = calculateTotalAmount(shoppingBag);

  const dispatch = useDispatch();
  // ================== methods =============
  const removeItem = (item) => {
    dispatch(removeFromBag(item));
    removecartDataLayer(item);
  };
  // -------------------test-------------------
  const[cart,setCart] = useState([]);
  
  const changeCart = () => {
    commonService
      .postAuthData("cartLog", { cart: shoppingBag }, userInfo.token)
      .then((res) => {
        // --------------------------------------------

        console.log(res);

        // setCart(JSON.parse(res.config.data))
        // const combineCart =[...cart.cart, shoppingBag];
        // const uniq = Object.values(combineCart.reduce((result, obj) => {
        //   if (!result[obj.id] ) {
        //     result[obj.id] = { ...obj };
        //   } else {
        //     result[obj.id].qty += parseInt(obj.qty);
        //   }
        //   return result;
        // }, {}));
          
        // if(res.data.status == 1) {
        //   dispatch(repleaceBag(uniq))
        // }

        // --------------------------------------------
        // if(res.data.status == 1) {
        //   dispatch(repleaceBag(shoppingBag))
        // }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (userInfo.token) {
      changeCart()
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
                      <span
                        className="ps-product__thumbnail"
                      >
                        <Link href={`/product/${item.slug}`}>
                          <a>
                            <img
                              src={`${IMAGE_URL + "/m_thumb/"}${item.image}`}
                              alt="alt"
                            />
                          </a>
                        </Link>
                      </span>
                      <div className="ps-product__content">
                        <Link href={`/product/${item.slug}`}>
                          <a>
                            <span className="ps-product__name">
                              {item.name}
                            </span>
                          </a>
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
            <Link href="/shopping-bag">
              <a className="ps-btn ps-btn--rounded ps-btn--dark">View Bag</a>
            </Link>
            <Link href="/checkout">
              <a className="ps-btn ps-btn--rounded ps-btn--danger">Checkout</a>
            </Link>
          </div>
        </div>
        <div className="ps-cart__empty">
          <img src="img/icon/cart-empty.svg" alt="" />
          <p className="ps-cart__text">Your cart is currently empty.</p>
        </div>
      </div>
    </li>
  );
}
