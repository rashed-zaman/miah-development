import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IMAGE_URL } from "../service/serviceConfig";
import Link from "next/link";
import { Grid } from "@mui/material";
import { setBagNull } from "../redux/shoppingBag/shoppingBagActions";

export default function EasyCheckout() {
  const dispatch = useDispatch();
  
  const shoppingBag = useSelector((state) => state.shoppingBag.shoppingCart);
  const siteOptions = useSelector((state) => state.menu.siteOptions);

  const ProductLength = useSelector((state) =>
    state.shoppingBag.shoppingCart.reduce((a, b) => a + (b.qty || 0), 0)
  );

  // local state
  const [tax, seTaxt] = useState(0);

  function calculateTotalAmount(items) {
    let totalAmount = 0;

    for (const item of items) {
      totalAmount += item.unitPrice * item.qty;
    }

    return totalAmount;
  }

  // Calculate total cost of all items
  const totalAmount = calculateTotalAmount(shoppingBag);

  const calculateTex = () => {
    if (totalAmount > 0) {
      const tax = (siteOptions.tax * totalAmount) / 100;
      seTaxt(tax);
    }
  };

  // site effects
  useEffect(() => {
    calculateTex();
  }, [totalAmount]);

  useEffect(() => {
    return () => {
      dispatch(setBagNull());
    };
  }, []);

  return (
    <>
      <div className="container">
        <div className="col-md-12 py-5">
          <h3 className="text-center">Order has been placed successfully</h3>
        </div>
        <div className="col-md-12">
          <div>
            <Grid container>
              <Grid item xs={6}>
                <b>Product</b>
              </Grid>
              <Grid item xs={2}>
                <b>Price</b>
              </Grid>
              <Grid item xs={2}>
                <b>QTY</b>
              </Grid>
              <Grid item xs={2}>
                <b>Subtotal</b>
              </Grid>
            </Grid>
          </div>
          <hr />
          {shoppingBag &&
            shoppingBag.map((item, index) => {
              return (
                <div key={index}>
                  <Grid container>
                    <Grid item xs={6}>
                      <Grid container spacing={2}>
                        <Grid item xs={4}>
                          <Link href={`/product/${item.slug}`}>
                            <a>
                              <figure className="ps-product__image">
                                <img
                                  className="ps-product__image-default"
                                  src={`${IMAGE_URL + "/m_thumb/"}${
                                    item.image
                                  }`}
                                  alt="alt"
                                />
                              </figure>
                            </a>
                          </Link>
                        </Grid>
                        <Grid item xs={8}>
                          <div className="ps-product__content">
                            <h5 className="ps-product__title mb-1">
                              <Link href={`/product/${item.slug}`}>
                                <a>{item.name}</a>
                              </Link>
                            </h5>
                            <p className="ps-product__selected mb-0">
                              Sku: {item.id}
                            </p>
                            {item?.size && (
                              <p className="ps-product__selected">
                                Size: {item.size}
                              </p>
                            )}
                          </div>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={2}>
                      <div className="ps-product__content text-center">
                        <h5 className="ps-product__title mb-1">{item.qty}</h5>
                      </div>
                    </Grid>
                    <Grid item xs={2}>
                      <div className="ps-product__content">
                        <h5 className="ps-product__title mb-1">
                          TK {item.unitPrice}
                        </h5>
                      </div>
                    </Grid>
                    <Grid item xs={2}>
                      <div className="ps-product__content">
                        <h5 className="ps-product__title mb-1">
                          {item.unitPrice * item.qty}
                        </h5>
                      </div>
                    </Grid>
                  </Grid>
                  <hr />
                </div>
              );
            })}

          {/* <div className="ps-shopping__table">
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
                            <div className="ps-product ps-product--standard">
                              <div className="ps-product__thumbnail">
                                <Link href={`/product/${item.slug}`}>
                                  <a>
                                    <figure className="ps-product__image">
                                      <img
                                        className="ps-product__image-default"
                                        src={`${IMAGE_URL + "/m_thumb/"}${
                                          item.image
                                        }`}
                                        alt="alt"
                                      />
                                    </figure>
                                  </a>
                                </Link>
                              </div>
                              <div className="ps-product__content">
                                <h5 className="ps-product__title">
                                  <Link href={`/product/${item.slug}`}>
                                    <a>{item.name}</a>
                                  </Link>
                                </h5>
                                <p className="ps-product__selected">
                                  Sku: {item.id}
                                </p>
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
                          <span className="ps-table__price">
                            TK {item.unitPrice}
                          </span>
                        </td>
                        <td className="ps-table__quantity">{item.qty}</td>
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
          </div> */}
        </div>
        <div className="col-md-12">
          <Grid container justifyContent="end" justifyItems="end">
            <Grid item sm={6} xs={10}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <div className="ps-product__content">
                    <h5 className="ps-product__title text-right">
                      Total Item : {ProductLength} Items{" "}
                    </h5>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div className="ps-product__content">
                    <h5 className="ps-product__title text-right">
                      Estimated Shipping Charge : TK 0.00
                    </h5>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <p className="text-right">VAT :TK {tax}</p>
                </Grid>
                <Grid item xs={12}>
                  <div className="ps-product__content">
                    <h5 className="ps-product__title text-right">
                      Shopping Bag Subtotal : TK {totalAmount}
                    </h5>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <hr />

                  <div className="ps-product__content">
                    <h5 className="ps-product__title text-right">
                      <b>
                        Estimated Total : TK{" "}
                        {parseFloat(totalAmount) + parseFloat(tax)}
                      </b>
                    </h5>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <hr />
          <Grid container spacing={2} justifyContent="center" p={1}>
            <Grid item sm={8} xs={12}>
              <p className="text-center">
                We have received your order and will contact with you soon
              </p>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
}
