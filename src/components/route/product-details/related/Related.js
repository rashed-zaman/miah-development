import React from "react";

export default function Related() {
  return (
    <section className="ps-section--default ps-product--carousel">
      <div className="container">
        <h3 className="ps-section__title">New Arrivals</h3>
        <div className="ps-section__carousel">
          <div
            className="owl-carousel"
            data-owl-auto="false"
            data-owl-loop="false"
            data-owl-speed="13000"
            data-owl-gap="30"
            data-owl-nav="true"
            data-owl-dots="false"
            data-owl-item="4"
            data-owl-item-xs="2"
            data-owl-item-sm="2"
            data-owl-item-md="3"
            data-owl-item-lg="4"
            data-owl-item-xl="4"
            data-owl-duration="1000"
            data-owl-mousedrag="on"
          >
            <div className="ps-product ps-product--standard">
              <div className="ps-product__thumbnail">
                <a className="ps-product__image" href="product-1.html">
                  <figure>
                    <img
                      className="ps-product__image-default"
                      src="https://images.miah.shop/product/3635A-(1).jpg"
                      alt="alt"
                    />
                    <img
                      className="ps-product__image-back"
                      src="https://images.miah.shop/product/3635A-(1).jpg"
                      alt="alt"
                    />
                  </figure>
                </a>
                <div className="ps-product__actions">
                  <div
                    className="ps-product__item"
                    data-toggle="tooltip"
                    data-placement="left"
                    title="Wishlist"
                  >
                    <a href="wishlist.html">
                      <i className="fa fa-heart-o"></i>
                    </a>
                  </div>
                  <div
                    className="ps-product__item rotate"
                    data-toggle="tooltip"
                    data-placement="left"
                    title="Add to compare"
                  >
                    <a href="#" data-toggle="modal" data-target="#popupCompare">
                      <i className="fa fa-align-left"></i>
                    </a>
                  </div>
                  <div
                    className="ps-product__item"
                    data-toggle="tooltip"
                    data-placement="left"
                    title="Quick view"
                  >
                    <a
                      href="#"
                      data-toggle="modal"
                      data-target="#popupQuickview"
                    >
                      <i className="fa fa-search"></i>
                    </a>
                  </div>
                </div>
                <div className="ps-product__badge">
                  <div className="ps-badge ps-badge--sale">-70%</div>
                </div>
                <a
                  className="ps-btn ps-btn--dark ps-product__cart"
                  href="product-1.html"
                >
                  Select options
                </a>
              </div>
              <div className="ps-product__mobile">
                <a
                  className="ps-product__item"
                  href="#"
                  data-toggle="modal"
                  data-target="#popupAddcart"
                >
                  <img src="/img/icon/cart.svg" alt="" />
                </a>
                <a className="ps-product__item" href="wishlist.html">
                  <i className="fa fa-heart-o"></i>
                </a>
                <a className="ps-product__item rotate" href="compare.html">
                  <i className="fa fa-align-left"></i>
                </a>
              </div>
              <div className="ps-product__content">
                <h5 className="ps-product__title">
                  <a href="product-1.html">Short T-shirt with sequins.</a>
                </h5>
                <div className="ps-product__meta">
                  <span className="ps-product__price sale">$38.39</span>
                  <span className="ps-product__del">$53.99</span>
                </div>
                <div className="ps-product__footer">
                  <div className="custom-control custom-checkbox">
                    <input
                      className="custom-control-input"
                      type="radio"
                      id="arrival1Redundefined"
                      name="productOption"
                      value="Red"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="arrival1Redundefined"
                      
                    >
                      <span ></span>
                    </label>
                  </div>
                  <div className="custom-control custom-checkbox">
                    <input
                      className="custom-control-input"
                      type="radio"
                      id="arrival1Blackundefined"
                      name="productOption"
                      value="Black"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="arrival1Blackundefined"
                      
                    >
                      <span ></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="ps-product ps-product--standard">
              <div className="ps-product__thumbnail">
                <a className="ps-product__image" href="product-1.html">
                  <figure>
                    <img
                      className="ps-product__image-default"
                      src="https://images.miah.shop/product/3635D-(1).jpg"
                      alt="alt"
                    />
                    <img
                      className="ps-product__image-back"
                      src="https://images.miah.shop/product/3635D-(1).jpg"
                      alt="alt"
                    />
                  </figure>
                </a>
                <div className="ps-product__actions">
                  <div
                    className="ps-product__item"
                    data-toggle="tooltip"
                    data-placement="left"
                    title="Wishlist"
                  >
                    <a href="wishlist.html">
                      <i className="fa fa-heart-o"></i>
                    </a>
                  </div>
                  <div
                    className="ps-product__item rotate"
                    data-toggle="tooltip"
                    data-placement="left"
                    title="Add to compare"
                  >
                    <a href="#" data-toggle="modal" data-target="#popupCompare">
                      <i className="fa fa-align-left"></i>
                    </a>
                  </div>
                  <div
                    className="ps-product__item"
                    data-toggle="tooltip"
                    data-placement="left"
                    title="Quick view"
                  >
                    <a
                      href="#"
                      data-toggle="modal"
                      data-target="#popupQuickview"
                    >
                      <i className="fa fa-search"></i>
                    </a>
                  </div>
                </div>
                <div className="ps-product__badge"></div>
                <a
                  className="ps-btn ps-btn--dark ps-product__cart"
                  href="#"
                  data-toggle="modal"
                  data-target="#popupAddcart"
                >
                  Add to cart
                </a>
              </div>
              <div className="ps-product__mobile">
                <a
                  className="ps-product__item"
                  href="#"
                  data-toggle="modal"
                  data-target="#popupAddcart"
                >
                  <img src="/img/icon/cart.svg" alt="" />
                </a>
                <a className="ps-product__item" href="wishlist.html">
                  <i className="fa fa-heart-o"></i>
                </a>
                <a className="ps-product__item rotate" href="compare.html">
                  <i className="fa fa-align-left"></i>
                </a>
              </div>
              <div className="ps-product__content">
                <h5 className="ps-product__title">
                  <a href="product-1.html">Raw denim short with sequins</a>
                </h5>
                <div className="ps-product__meta">
                  <span className="ps-product__price">$69.00</span>
                </div>
              </div>
            </div>
            <div className="ps-product ps-product--standard">
              <div className="ps-product__thumbnail">
                <a className="ps-product__image" href="product-1.html">
                  <figure>
                    <img
                      className="ps-product__image-default"
                      src="https://images.miah.shop/product/3634A-(1).jpg"
                      alt="alt"
                    />
                    <img
                      className="ps-product__image-back"
                      src="https://images.miah.shop/product/3634A-(1).jpg"
                      alt="alt"
                    />
                  </figure>
                </a>
                <div className="ps-product__actions">
                  <div
                    className="ps-product__item"
                    data-toggle="tooltip"
                    data-placement="left"
                    title="Wishlist"
                  >
                    <a href="wishlist.html">
                      <i className="fa fa-heart-o"></i>
                    </a>
                  </div>
                  <div
                    className="ps-product__item rotate"
                    data-toggle="tooltip"
                    data-placement="left"
                    title="Add to compare"
                  >
                    <a href="#" data-toggle="modal" data-target="#popupCompare">
                      <i className="fa fa-align-left"></i>
                    </a>
                  </div>
                  <div
                    className="ps-product__item"
                    data-toggle="tooltip"
                    data-placement="left"
                    title="Quick view"
                  >
                    <a
                      href="#"
                      data-toggle="modal"
                      data-target="#popupQuickview"
                    >
                      <i className="fa fa-search"></i>
                    </a>
                  </div>
                </div>
                <div className="ps-product__badge">
                  <div className="ps-badge ps-badge--sold">Sold Out</div>
                </div>
                <a
                  className="ps-btn ps-btn--dark ps-product__cart"
                  href="#"
                  data-toggle="modal"
                  data-target="#popupAddcart"
                >
                  Add to cart
                </a>
              </div>
              <div className="ps-product__mobile">
                <a
                  className="ps-product__item"
                  href="#"
                  data-toggle="modal"
                  data-target="#popupAddcart"
                >
                  <img src="/img/icon/cart.svg" alt="" />
                </a>
                <a className="ps-product__item" href="wishlist.html">
                  <i className="fa fa-heart-o"></i>
                </a>
                <a className="ps-product__item rotate" href="compare.html">
                  <i className="fa fa-align-left"></i>
                </a>
              </div>
              <div className="ps-product__content">
                <h5 className="ps-product__title">
                  <a href="product-1.html">
                    White short checkered T-shirt & skirt
                  </a>
                </h5>
                <div className="ps-product__meta">
                  <span className="ps-product__price sale">$119.39</span>
                  <span className="ps-product__del">$110.99</span>
                </div>
              </div>
            </div>
            <div className="ps-product ps-product--standard">
              <div className="ps-product__thumbnail">
                <a className="ps-product__image" href="product-1.html">
                  <figure>
                    <img
                      className="ps-product__image-default"
                      src="https://images.miah.shop/product/Standard_Salwar_Kameez_1028_3371_1.jpg"
                      alt="alt"
                    />
                    <img
                      className="ps-product__image-back"
                      src="https://images.miah.shop/product/Standard_Salwar_Kameez_1028_3371_1.jpg"
                      alt="alt"
                    />
                  </figure>
                </a>
                <div className="ps-product__actions">
                  <div
                    className="ps-product__item"
                    data-toggle="tooltip"
                    data-placement="left"
                    title="Wishlist"
                  >
                    <a href="wishlist.html">
                      <i className="fa fa-heart-o"></i>
                    </a>
                  </div>
                  <div
                    className="ps-product__item rotate"
                    data-toggle="tooltip"
                    data-placement="left"
                    title="Add to compare"
                  >
                    <a href="#" data-toggle="modal" data-target="#popupCompare">
                      <i className="fa fa-align-left"></i>
                    </a>
                  </div>
                  <div
                    className="ps-product__item"
                    data-toggle="tooltip"
                    data-placement="left"
                    title="Quick view"
                  >
                    <a
                      href="#"
                      data-toggle="modal"
                      data-target="#popupQuickview"
                    >
                      <i className="fa fa-search"></i>
                    </a>
                  </div>
                </div>
                <div className="ps-product__badge">
                  <div className="ps-badge ps-badge--hot">Hot</div>
                </div>
                <a
                  className="ps-btn ps-btn--dark ps-product__cart"
                  href="product-1.html"
                >
                  Select options
                </a>
              </div>
              <div className="ps-product__mobile">
                <a
                  className="ps-product__item"
                  href="#"
                  data-toggle="modal"
                  data-target="#popupAddcart"
                >
                  <img src="/img/icon/cart.svg" alt="" />
                </a>
                <a className="ps-product__item" href="wishlist.html">
                  <i className="fa fa-heart-o"></i>
                </a>
                <a className="ps-product__item rotate" href="compare.html">
                  <i className="fa fa-align-left"></i>
                </a>
              </div>
              <div className="ps-product__content">
                <h5 className="ps-product__title">
                  <a href="product-1.html">{"Women's flax dress pump"}</a>
                </h5>
                <div className="ps-product__meta">
                  <span className="ps-product__price">$125.00 - $129.00</span>
                </div>
                <div className="ps-product__footer">
                  <div className="custom-control custom-checkbox">
                    <input
                      className="custom-control-input"
                      type="radio"
                      id="arrival3Greenundefined"
                      name="productOption"
                      value="Green"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="arrival3Greenundefined"
                      
                    >
                      <span ></span>
                    </label>
                  </div>
                  <div className="custom-control custom-checkbox">
                    <input
                      className="custom-control-input"
                      type="radio"
                      id="arrival3Yellowundefined"
                      name="productOption"
                      value="Yellow"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="arrival3Yellowundefined"
                      
                    >
                      <span ></span>
                    </label>
                  </div>
                  <div className="custom-control custom-checkbox">
                    <input
                      className="custom-control-input"
                      type="radio"
                      id="arrival3Redundefined"
                      name="productOption"
                      value="Red"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="arrival3Redundefined"
                      
                    >
                      <span ></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="ps-product ps-product--standard">
              <div className="ps-product__thumbnail">
                <a className="ps-product__image" href="product-1.html">
                  <figure>
                    <img
                      className="ps-product__image-default"
                      src="https://images.miah.shop/product/3635A-(1).jpg"
                      alt="alt"
                    />
                    <img
                      className="ps-product__image-back"
                      src="https://images.miah.shop/product/3635A-(1).jpg"
                      alt="alt"
                    />
                  </figure>
                </a>
                <div className="ps-product__actions">
                  <div
                    className="ps-product__item"
                    data-toggle="tooltip"
                    data-placement="left"
                    title="Wishlist"
                  >
                    <a href="wishlist.html">
                      <i className="fa fa-heart-o"></i>
                    </a>
                  </div>
                  <div
                    className="ps-product__item rotate"
                    data-toggle="tooltip"
                    data-placement="left"
                    title="Add to compare"
                  >
                    <a href="#" data-toggle="modal" data-target="#popupCompare">
                      <i className="fa fa-align-left"></i>
                    </a>
                  </div>
                  <div
                    className="ps-product__item"
                    data-toggle="tooltip"
                    data-placement="left"
                    title="Quick view"
                  >
                    <a
                      href="#"
                      data-toggle="modal"
                      data-target="#popupQuickview"
                    >
                      <i className="fa fa-search"></i>
                    </a>
                  </div>
                </div>
                <div className="ps-product__badge">
                  <div className="ps-badge ps-badge--sale">-70%</div>
                </div>
                <a
                  className="ps-btn ps-btn--dark ps-product__cart"
                  href="product-1.html"
                >
                  Select options
                </a>
              </div>
              <div className="ps-product__mobile">
                <a
                  className="ps-product__item"
                  href="#"
                  data-toggle="modal"
                  data-target="#popupAddcart"
                >
                  <img src="/img/icon/cart.svg" alt="" />
                </a>
                <a className="ps-product__item" href="wishlist.html">
                  <i className="fa fa-heart-o"></i>
                </a>
                <a className="ps-product__item rotate" href="compare.html">
                  <i className="fa fa-align-left"></i>
                </a>
              </div>
              <div className="ps-product__content">
                <h5 className="ps-product__title">
                  <a href="product-1.html">Short T-shirt with sequins.</a>
                </h5>
                <div className="ps-product__meta">
                  <span className="ps-product__price sale">$38.39</span>
                  <span className="ps-product__del">$53.99</span>
                </div>
                <div className="ps-product__footer">
                  <div className="custom-control custom-checkbox">
                    <input
                      className="custom-control-input"
                      type="radio"
                      id="arrival1Redundefined"
                      name="productOption"
                      value="Red"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="arrival1Redundefined"
                      
                    >
                      <span ></span>
                    </label>
                  </div>
                  <div className="custom-control custom-checkbox">
                    <input
                      className="custom-control-input"
                      type="radio"
                      id="arrival1Blackundefined"
                      name="productOption"
                      value="Black"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="arrival1Blackundefined"
                      
                    >
                      <span ></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="ps-product ps-product--standard">
              <div className="ps-product__thumbnail">
                <a className="ps-product__image" href="product-1.html">
                  <figure>
                    <img
                      className="ps-product__image-default"
                      src="https://images.miah.shop/product/3635D-(1).jpg"
                      alt="alt"
                    />
                    <img
                      className="ps-product__image-back"
                      src="https://images.miah.shop/product/3635D-(1).jpg"
                      alt="alt"
                    />
                  </figure>
                </a>
                <div className="ps-product__actions">
                  <div
                    className="ps-product__item"
                    data-toggle="tooltip"
                    data-placement="left"
                    title="Wishlist"
                  >
                    <a href="wishlist.html">
                      <i className="fa fa-heart-o"></i>
                    </a>
                  </div>
                  <div
                    className="ps-product__item rotate"
                    data-toggle="tooltip"
                    data-placement="left"
                    title="Add to compare"
                  >
                    <a href="#" data-toggle="modal" data-target="#popupCompare">
                      <i className="fa fa-align-left"></i>
                    </a>
                  </div>
                  <div
                    className="ps-product__item"
                    data-toggle="tooltip"
                    data-placement="left"
                    title="Quick view"
                  >
                    <a
                      href="#"
                      data-toggle="modal"
                      data-target="#popupQuickview"
                    >
                      <i className="fa fa-search"></i>
                    </a>
                  </div>
                </div>
                <div className="ps-product__badge"></div>
                <a
                  className="ps-btn ps-btn--dark ps-product__cart"
                  href="#"
                  data-toggle="modal"
                  data-target="#popupAddcart"
                >
                  Add to cart
                </a>
              </div>
              <div className="ps-product__mobile">
                <a
                  className="ps-product__item"
                  href="#"
                  data-toggle="modal"
                  data-target="#popupAddcart"
                >
                  <img src="/img/icon/cart.svg" alt="" />
                </a>
                <a className="ps-product__item" href="wishlist.html">
                  <i className="fa fa-heart-o"></i>
                </a>
                <a className="ps-product__item rotate" href="compare.html">
                  <i className="fa fa-align-left"></i>
                </a>
              </div>
              <div className="ps-product__content">
                <h5 className="ps-product__title">
                  <a href="product-1.html">Raw denim short with sequins</a>
                </h5>
                <div className="ps-product__meta">
                  <span className="ps-product__price">$69.00</span>
                </div>
              </div>
            </div>
            <div className="ps-product ps-product--standard">
              <div className="ps-product__thumbnail">
                <a className="ps-product__image" href="product-1.html">
                  <figure>
                    <img
                      className="ps-product__image-default"
                      src="https://images.miah.shop/product/3634A-(1).jpg"
                      alt="alt"
                    />
                    <img
                      className="ps-product__image-back"
                      src="https://images.miah.shop/product/3634A-(1).jpg"
                      alt="alt"
                    />
                  </figure>
                </a>
                <div className="ps-product__actions">
                  <div
                    className="ps-product__item"
                    data-toggle="tooltip"
                    data-placement="left"
                    title="Wishlist"
                  >
                    <a href="wishlist.html">
                      <i className="fa fa-heart-o"></i>
                    </a>
                  </div>
                  <div
                    className="ps-product__item rotate"
                    data-toggle="tooltip"
                    data-placement="left"
                    title="Add to compare"
                  >
                    <a href="#" data-toggle="modal" data-target="#popupCompare">
                      <i className="fa fa-align-left"></i>
                    </a>
                  </div>
                  <div
                    className="ps-product__item"
                    data-toggle="tooltip"
                    data-placement="left"
                    title="Quick view"
                  >
                    <a
                      href="#"
                      data-toggle="modal"
                      data-target="#popupQuickview"
                    >
                      <i className="fa fa-search"></i>
                    </a>
                  </div>
                </div>
                <div className="ps-product__badge">
                  <div className="ps-badge ps-badge--sold">Sold Out</div>
                </div>
                <a
                  className="ps-btn ps-btn--dark ps-product__cart"
                  href="#"
                  data-toggle="modal"
                  data-target="#popupAddcart"
                >
                  Add to cart
                </a>
              </div>
              <div className="ps-product__mobile">
                <a
                  className="ps-product__item"
                  href="#"
                  data-toggle="modal"
                  data-target="#popupAddcart"
                >
                  <img src="/img/icon/cart.svg" alt="" />
                </a>
                <a className="ps-product__item" href="wishlist.html">
                  <i className="fa fa-heart-o"></i>
                </a>
                <a className="ps-product__item rotate" href="compare.html">
                  <i className="fa fa-align-left"></i>
                </a>
              </div>
              <div className="ps-product__content">
                <h5 className="ps-product__title">
                  <a href="product-1.html">
                    White short checkered T-shirt & skirt
                  </a>
                </h5>
                <div className="ps-product__meta">
                  <span className="ps-product__price sale">$119.39</span>
                  <span className="ps-product__del">$110.99</span>
                </div>
              </div>
            </div>
            <div className="ps-product ps-product--standard">
              <div className="ps-product__thumbnail">
                <a className="ps-product__image" href="product-1.html">
                  <figure>
                    <img
                      className="ps-product__image-default"
                      src="https://images.miah.shop/product/Standard_Salwar_Kameez_1028_3371_1.jpg"
                      alt="alt"
                    />
                    <img
                      className="ps-product__image-back"
                      src="https://images.miah.shop/product/Standard_Salwar_Kameez_1028_3371_1.jpg"
                      alt="alt"
                    />
                  </figure>
                </a>
                <div className="ps-product__actions">
                  <div
                    className="ps-product__item"
                    data-toggle="tooltip"
                    data-placement="left"
                    title="Wishlist"
                  >
                    <a href="wishlist.html">
                      <i className="fa fa-heart-o"></i>
                    </a>
                  </div>
                  <div
                    className="ps-product__item rotate"
                    data-toggle="tooltip"
                    data-placement="left"
                    title="Add to compare"
                  >
                    <a href="#" data-toggle="modal" data-target="#popupCompare">
                      <i className="fa fa-align-left"></i>
                    </a>
                  </div>
                  <div
                    className="ps-product__item"
                    data-toggle="tooltip"
                    data-placement="left"
                    title="Quick view"
                  >
                    <a
                      href="#"
                      data-toggle="modal"
                      data-target="#popupQuickview"
                    >
                      <i className="fa fa-search"></i>
                    </a>
                  </div>
                </div>
                <div className="ps-product__badge">
                  <div className="ps-badge ps-badge--hot">Hot</div>
                </div>
                <a
                  className="ps-btn ps-btn--dark ps-product__cart"
                  href="product-1.html"
                >
                  Select options
                </a>
              </div>
              <div className="ps-product__mobile">
                <a
                  className="ps-product__item"
                  href="#"
                  data-toggle="modal"
                  data-target="#popupAddcart"
                >
                  <img src="/img/icon/cart.svg" alt="" />
                </a>
                <a className="ps-product__item" href="wishlist.html">
                  <i className="fa fa-heart-o"></i>
                </a>
                <a className="ps-product__item rotate" href="compare.html">
                  <i className="fa fa-align-left"></i>
                </a>
              </div>
              <div className="ps-product__content">
                <h5 className="ps-product__title">
                  <a href="product-1.html">{"Women's flax dress pump"}</a>
                </h5>
                <div className="ps-product__meta">
                  <span className="ps-product__price">$125.00 - $129.00</span>
                </div>
                <div className="ps-product__footer">
                  <div className="custom-control custom-checkbox">
                    <input
                      className="custom-control-input"
                      type="radio"
                      id="arrival3Greenundefined"
                      name="productOption"
                      value="Green"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="arrival3Greenundefined"
                      
                    >
                      <span ></span>
                    </label>
                  </div>
                  <div className="custom-control custom-checkbox">
                    <input
                      className="custom-control-input"
                      type="radio"
                      id="arrival3Yellowundefined"
                      name="productOption"
                      value="Yellow"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="arrival3Yellowundefined"
                      
                    >
                      <span ></span>
                    </label>
                  </div>
                  <div className="custom-control custom-checkbox">
                    <input
                      className="custom-control-input"
                      type="radio"
                      id="arrival3Redundefined"
                      name="productOption"
                      value="Red"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="arrival3Redundefined"
                      
                    >
                      <span ></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
