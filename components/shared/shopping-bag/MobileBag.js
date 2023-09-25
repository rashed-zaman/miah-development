import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import { mobileBagDialog } from "../../../redux/shoppingBag/shoppingBagActions";
import { IMAGE_URL } from "../../../service/serviceConfig";

export default function MobileBag({ shoppingBag, removeItem, changeQty }) {
  // hooks
  const dispatch = useDispatch();
  // methods
  const removeBagItem = (item) => {
    removeItem(item);
  };

  const colseMobileDialog = () => {
    dispatch(mobileBagDialog(false));
  };

  const changeItemQty = (item, changeType) => {
    changeQty(item, changeType);
  };

  return (
    <ul className="ps-shopping__list">
      {shoppingBag &&
        shoppingBag.map((item, i) => {
          return (
            <li key={i} className="border-bottom">
              <div className="row">
                <div className="col-4">
                  <Link href={`/product/${item.slug}`}>
                    <a>
                      <figure onClick={colseMobileDialog}>
                        <img
                          className="ps-product__image-default"
                          src={`${IMAGE_URL + "/m_thumb/"}${item.image}`}
                          alt="alt"
                        />
                      </figure>
                    </a>
                  </Link>
                </div>
                <div className="col-8">
                  <h5 className="ps-product__title" onClick={colseMobileDialog}>
                    <Link href={`/product/${item.slug}`}>
                      <a>{item.name}</a>
                    </Link>
                  </h5>
                  <h5 className="ps-product__title mb-0">
                    Tk {item.unitPrice}
                  </h5>
                  <div className="ps-product__value">
                    <small className="ps-product__price">sku {item.id}</small>
                  </div>
                  <div className="ps-product ps-product--wishlist border-0 py-0 pl-0">
                    <div className="ps-product__content">
                      <div className="ps-product__row ps-product__quantity py-0 border-0">
                        <div className="ps-product__value">
                          <div className="def-number-input number-input safari_only">
                            <button
                              className="minus py-2"
                              onClick={() => changeItemQty(item, "deduct")}
                            >
                              <img src="/img/icon/minus.svg" alt="" />
                            </button>
                            {item.qty}
                            <button
                              className="plus py-2"
                              onClick={() => changeItemQty(item, "add")}
                            >
                              <img src="/img/icon/plus.svg" alt="" />
                            </button>
                          </div>
                          <div className="text-center">
                            {item.stock == true ? (
                              <span className="text-danger">out of stock </span>
                            ) : null}
                          </div>
                          <div className="ps-product__value">
                            <small
                              className="ps-product__price"
                              onClick={() => removeBagItem(item)}
                            >
                              Remove
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-6">
                  <h5 className="ps-product__title">Subtotal</h5>
                </div>
                <div className="col-6 text-right">
                  <h5 className="ps-product__title mb-0">
                    Tk {item.unitPrice * item.qty}
                  </h5>
                </div>
              </div>
            </li>
          );
        })}
    </ul>
  );
}
