import React from "react";

export default function QuickView() {
  return (
    <div
      className="modal fade"
      id="popupQuickview"
      data-backdrop="static"
      data-keyboard="false"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl modal-dialog-centered ps-quickview">
        <div className="modal-content">
          <div className="modal-body">
            <div className="wrap-modal-slider container-fluid ps-quickview__body">
              <button
                className="close ps-quickview__close"
                type="button"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <div className="ps-product--detail">
                <div className="row">
                  <div className="col-12 col-lg-6">
                    <div className="ps-product--gallery-2">
                      <div className="ps-product__thumbnail">
                        <div className="slide">
                          <img src="img/products/3.jpg" alt="alt" />
                        </div>
                        <div className="slide">
                          <img src="img/products/3_1.jpg" alt="alt" />
                        </div>
                        <div className="slide">
                          <img src="img/products/3_2.jpg" alt="alt" />
                        </div>
                        <div className="slide">
                          <img src="img/products/3_3.jpg" alt="alt" />
                        </div>
                        <div className="slide">
                          <img src="img/products/5.jpg" alt="alt" />
                        </div>
                        <div className="slide">
                          <img src="img/products/5_2.jpg" alt="alt" />
                        </div>
                      </div>
                      <div className="ps-gallery--images">
                        <div className="slide">
                          <div className="ps-gallery__item">
                            <img src="img/products/3.jpg" alt="alt" />
                          </div>
                        </div>
                        <div className="slide">
                          <div className="ps-gallery__item">
                            <img src="img/products/3_1.jpg" alt="alt" />
                          </div>
                        </div>
                        <div className="slide">
                          <div className="ps-gallery__item">
                            <img src="img/products/3_2.jpg" alt="alt" />
                          </div>
                        </div>
                        <div className="slide">
                          <div className="ps-gallery__item">
                            <img src="img/products/3_3.jpg" alt="alt" />
                          </div>
                        </div>
                        <div className="slide">
                          <div className="ps-gallery__item">
                            <img src="img/products/5.jpg" alt="alt" />
                          </div>
                        </div>
                        <div className="slide">
                          <div className="ps-gallery__item">
                            <img src="img/products/5_2.jpg" alt="alt" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6">
                    <div className="ps-product__info">
                      <div className="ps-product__branch">
                        <a href="#">Apple</a>
                      </div>
                      <h4 className="ps-product__title">
                        <a href="product-1.html">
                          Checkered shirt with long sleeves
                        </a>
                      </h4>
                      <div className="ps-product__rating">
                        <select className="ps-rating" data-read-only="true">
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">
                            4
                          </option>
                          <option value="5">5</option>
                        </select>
                        <span className="ps-product__review">45 Reviews</span>
                        <a className="ps-product__write" href="#">
                          Write a review
                        </a>
                      </div>
                      <div className="ps-product__meta">
                        <span className="ps-product__price sale">$695.00</span>
                        <span className="ps-product__del">$2295.00</span>
                      </div>
                      <div className="ps-product__available">
                        <div className="ps-product__text">
                          Hurry! Only left in stock
                        </div>
                        <div className="progress">
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{width: "75%"}}
                            aria-valuenow="75"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <div className="ps-product__sale">
                          <img src="img/icon/fire.svg" alt="" />
                          28 sold in last 24 hours
                        </div>
                      </div>
                      <div className="ps-product__feature">
                        <div className="ps-product__group">
                          <h6>Color</h6>
                          <div className="ps-product__color">
                            <div className="custom-control">
                              <input
                                className="custom-control-input"
                                type="radio"
                                name="color"
                                value="Gray"
                                id="color#5b6c8fquickview"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="color#5b6c8fquickview"
                              >
                                <img src="img/products/3.jpg" alt="" />
                              </label>
                            </div>
                            <div className="custom-control">
                              <input
                                className="custom-control-input"
                                type="radio"
                                name="color"
                                value="Red"
                                id="color#f00000quickview"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="color#f00000quickview"
                              >
                                <img src="img/products/3.jpg" alt="" />
                              </label>
                            </div>
                            <div className="custom-control">
                              <input
                                className="custom-control-input"
                                type="radio"
                                name="color"
                                value="Black"
                                id="color#313330quickview"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="color#313330quickview"
                              >
                                <img src="img/products/3.jpg" alt="" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="ps-product__group">
                          <h6>Size</h6>
                          <div className="ps-product__size ps-select--feature">
                            <div className="custom-control">
                              <input
                                className="custom-control-input"
                                type="radio"
                                name="size"
                                value="L"
                                id="sizeLquickview"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="sizeLquickview"
                              >
                                L
                              </label>
                            </div>
                            <div className="custom-control">
                              <input
                                className="custom-control-input"
                                type="radio"
                                name="size"
                                value="M"
                                id="sizeMquickview"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="sizeMquickview"
                              >
                                M
                              </label>
                            </div>
                            <div className="custom-control">
                              <input
                                className="custom-control-input"
                                type="radio"
                                name="size"
                                value="S"
                                id="sizeSquickview"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="sizeSquickview"
                              >
                                S
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="ps-product__quantity">
                        <h6>
                          Quantity<span> in stock</span>
                        </h6>
                        <div className="d-flex align-items-center">
                          <div className="def-number-input number-input safari_only">
                            <button
                              className="minus">
                              <img src="/img/icon/minus.svg" alt="" />
                            </button>
                            <input
                              className="quantity"
                              min="0"
                              name="quantity"
                              value="1"
                              type="number"
                            />
                            <button
                              className="plus">
                              <img src="/img/icon/plus.svg" alt="" />
                            </button>
                          </div>
                          <a
                            className="ps-btn ps-btn--rounded ps-btn--dark"
                            href="#"
                            data-toggle="modal"
                            data-target="#popupAddcartV2"
                          >
                            <img src="/img/icon/cart.svg" alt="" />
                            Add to cart
                          </a>
                        </div>
                      </div>
                      <a
                        className="ps-btn ps-btn--rounded ps-product__buy"
                        href="shopping-cart.html"
                      >
                        Buy it now
                      </a>
                      <div className="ps-product__variations">
                        <a className="ps-product__link" href="wishlist.html">
                          <i className="fa fa-heart-o"></i>Add to wishlist
                        </a>
                        <a className="ps-product__link rotate" href="compare.html">
                          <i className="fa fa-align-left"> </i>Add to Compare
                        </a>
                        <a className="ps-product__link" href="#">
                          <i className="fa fa-envelope-o"></i>Ask about product
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
