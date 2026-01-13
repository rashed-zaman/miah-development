import Link from "next/link";
import React from "react";
import { IMAGE_URL } from "../../../service/serviceConfig";

export default function DesktopBag({ shoppingBag, removeItem, changeQty }) {
  // methods
  const removeBagItem = (item) => {
    removeItem(item);
  };

  const changeItemQty = (item, changeType) => {
    changeQty(item, changeType);
  };

  return (
    <div className="ps-shopping__table">
      <table className="table ps-table ps-table--product">
        <thead>
          <tr>
            <th className="ps-table__product">Product</th>
            <th className="ps-table__meta">Price</th>
            <th className="ps-table__quantity">Quantity</th>
            <th className="ps-table__subtotal">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {shoppingBag &&
            shoppingBag.map((item, index) => {
              return (
                <tr key={index}>
                  <td className="ps-table__product">
                    <div className="ps-table__box">
                      <div className="ps-table__remove cursor-pointer">
                        <img
                          src="/img/icon/close.svg"
                          alt=""
                          onClick={() => removeBagItem(item)}
                        />
                      </div>
                      <div className="ps-product ps-product--standard">
                        <div className="ps-product__thumbnail">
                          <Link href={`/product/${item.slug}`}>
                              <figure className="ps-product__image">
                                <img
                                  className="ps-product__image-default"
                                  src={`${IMAGE_URL + "/m_thumb/"}${
                                    item.image
                                  }`}
                                  alt="alt"
                                />
                              </figure>
                          </Link>
                        </div>
                        <div className="ps-product__content">
                          <h5 className="ps-product__title">
                            <Link href={`/product/${item.slug}`}>
                              {item.name}
                            </Link>
                          </h5>
                          <p className="ps-product__selected">Sku: {item.id}</p>
                          {item?.size && (
                            <p className="ps-product__selected">
                              Size: {item.size}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="ps-table__meta">
                    <span className="ps-table__price">TK {item.unitPrice}</span>
                  </td>
                  <td className="ps-table__quantity">
                    <div className="def-number-input number-input safari_only">
                      <button
                        className="minus"
                        onClick={() => changeItemQty(item, "deduct")}
                      >
                        <img src="/img/icon/minus.svg" alt="" />
                      </button>
                      {item.qty}
                      <button
                        className="plus"
                        onClick={() => changeItemQty(item, "add")}
                      >
                        <img src="/img/icon/plus.svg" alt="" />
                      </button>
                    </div>
                    <div className="text-center">
                      {item.stock == true || item.stock == "true" ? (
                        <span className="text-danger">out of stock</span>
                      ) : null}
                    </div>
                  </td>
                  <td className="ps-table__subtotal">
                    <span className="ps-table__price">
                      TK {item.unitPrice * item.qty}
                    </span>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
