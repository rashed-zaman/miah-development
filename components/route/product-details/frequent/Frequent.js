import React from "react";
import Link from "next/link";

import { IMAGE_URL } from "../../../../service/serviceConfig";

export default function Frequent({ relatedProduct }) {
  return (
    <section className="ps-bought">
      <div className="container">
        <h3 className="ps-bought__title">Frequently bought together</h3>
        <div className="ps-bought__wapper">
          <ul className="ps-bought__product">
            {relatedProduct &&
              relatedProduct.map((product, index) => {
                return (
                  <li key={index}>
                    <Link href={`/product/${product.slug}`}>
                      <a>
                        <div className="ps-product ps-product--standard cursor-pointer">
                          <div className="ps-product__thumbnail">
                            <figure>
                              <img
                                className="ps-product__image-default"
                                src={`${IMAGE_URL}/${product.back_img}`}
                                alt={product.name}
                              />
                              <img
                                className="ps-product__image-back"
                                src={`${IMAGE_URL}/${product.front_img}`}
                                alt={product.name}
                              />
                            </figure>
                          </div>
                          <div className="ps-product__content">
                            <h5 className="ps-product__title">{product.name}</h5>
                            <div className="ps-product__meta">
                              <span className="ps-product__price">
                                TK {product.sales_cost}
                              </span>
                              {product.discount && (
                                <span className="ps-product__del">
                                  TK {product.discount}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </a>
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </section>
  );
}
