import React from "react";

export default function Content({ product }) {
  return (
    <div className="ps-product--content-tabs">
      <div className="container">
        <ul
          className="nav nav-tabs ps-tab-list"
          id="productContentTabs"
          role="tablist"
        >
          <li className="nav-item" role="presentation">
            <a
              className="nav-link active"
              id="description-tab"
              data-toggle="tab"
              href="#description-content"
              role="tab"
              aria-controls="description-content"
              aria-selected="true"
            >
              Description
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              className="nav-link"
              id="reviews-tab"
              data-toggle="tab"
              href="#reviews-content"
              role="tab"
              aria-controls="reviews-content"
              aria-selected="false"
            >
              Specification
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              className="nav-link"
              id="size-chart-tab"
              data-toggle="tab"
              href="#size-chart-content"
              role="tab"
              aria-controls="size-chart-content"
              aria-selected="false"
            >
              Size chart
            </a>
          </li>
          {/* <li className="nav-item" role="presentation">
            <a
              className="nav-link"
              id="gallery-tab"
              data-toggle="tab"
              href="#gallery-content"
              role="tab"
              aria-controls="gallery-content"
              aria-selected="false"
            >
              Gallery
            </a>
          </li> */}
        </ul>
        <div className="tab-content" id="productContent">
          <div
            className="tab-pane fade show active"
            id="description-content"
            role="tabpanel"
            aria-labelledby="description-tab"
          >
            <section className="ps-product--desc">
              <div className="container">
                <div className="ps-product__grid">
                  <div className="ps-product__content">
                    <p>
                      <b>Description</b>
                    </p>
                    <span dangerouslySetInnerHTML={{__html: product.sales_info}}></span>
                  </div>
                  <div className="ps-product__thumbnail">
                    <img src="/img/banners/600_338.jpg" alt="" />
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div
            className="tab-pane fade"
            id="reviews-content"
            role="tabpanel"
            aria-labelledby="reviews-tab"
          >
            <p>
              <b>Specification</b>
            </p>
            <table className="table ps-table ps-table--responsive description-table">
              <tbody>
                {product.attributes &&
                  product.attributes.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td data-label="Size">{item.attribute_name}</td>
                        <td data-label="Size">{item.attribute_value}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div
            className="tab-pane fade"
            id="size-chart-content"
            role="tabpanel"
            aria-labelledby="size-chart-tab"
          >
            <table className="table ps-table ps-table--responsive">
              <thead>
                <tr>
                  <th>Size</th>
                  <th>XS</th>
                  <th>S</th>
                  <th>M</th>
                  <th>L</th>
                  <th>XL</th>
                  <th>XXL</th>
                  <th>3XL</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Size">Chest</td>
                  <td data-label="XS">82</td>
                  <td data-label="S">88</td>
                  <td data-label="M">94</td>
                  <td data-label="L">100</td>
                  <td data-label="XL">106</td>
                  <td data-label="XXL">114</td>
                  <td data-label="3XL">114</td>
                </tr>
                <tr>
                  <td data-label="Size">Waist</td>
                  <td data-label="XS">82</td>
                  <td data-label="S">88</td>
                  <td data-label="M">94</td>
                  <td data-label="L">100</td>
                  <td data-label="XL">106</td>
                  <td data-label="XXL">114</td>
                  <td data-label="3XL">114</td>
                </tr>
                <tr>
                  <td data-label="Size">Seat</td>
                  <td data-label="XS">82</td>
                  <td data-label="S">88</td>
                  <td data-label="M">94</td>
                  <td data-label="L">100</td>
                  <td data-label="XL">106</td>
                  <td data-label="XXL">114</td>
                  <td data-label="3XL">114</td>
                </tr>
                <tr>
                  <td data-label="Size">Shoulders</td>
                  <td data-label="XS">82</td>
                  <td data-label="S">88</td>
                  <td data-label="M">94</td>
                  <td data-label="L">100</td>
                  <td data-label="XL">106</td>
                  <td data-label="XXL">114</td>
                  <td data-label="3XL">114</td>
                </tr>
                <tr>
                  <td data-label="Size">Length</td>
                  <td data-label="XS">82</td>
                  <td data-label="S">88</td>
                  <td data-label="M">94</td>
                  <td data-label="L">100</td>
                  <td data-label="XL">106</td>
                  <td data-label="XXL">114</td>
                  <td data-label="3XL">114</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            className="tab-pane fade"
            id="gallery-content"
            role="tabpanel"
            aria-labelledby="gallery-tab"
          >
            <div className="ps-gallery">
              <div className="container">
                <div className="desktop-only">
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <a className="ps-gallery__link" href="#">
                        <img src="/img/promotion/banner-14.jpg" alt="" />
                      </a>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="row ps-gallery__images">
                        <div className="col-6">
                          <a className="ps-gallery__link" href="#">
                            <img src="/img/instagram/instagram1.jpg" alt="" />
                          </a>
                        </div>
                        <div className="col-6">
                          <a className="ps-gallery__link" href="#">
                            <img src="/img/instagram/instagram2.jpg" alt="" />
                          </a>
                        </div>
                        <div className="col-6">
                          <a className="ps-gallery__link" href="#">
                            <img src="/img/instagram/instagram3.jpg" alt="" />
                          </a>
                        </div>
                        <div className="col-6">
                          <a className="ps-gallery__link" href="#">
                            <img src="/img/instagram/instagram4.jpg" alt="" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mobile-only">
                  <div
                    className="owl-carousel"
                    data-owl-auto="false"
                    data-owl-loop="true"
                    data-owl-speed="10000"
                    data-owl-gap="10"
                    data-owl-nav="false"
                    data-owl-dots="true"
                    data-owl-item="4"
                    data-owl-item-xs="2"
                    data-owl-item-sm="2"
                    data-owl-item-md="3"
                    data-owl-item-lg="4"
                    data-owl-item-xl="4"
                    data-owl-duration="1000"
                    data-owl-mousedrag="on"
                  >
                    <a className="ps-gallery__link" href="#">
                      <img src="/img/promotion/banner-14.jpg" alt="" />
                    </a>
                    <a className="ps-gallery__link" href="#">
                      <img src="/img/instagram/instagram1.jpg" alt="" />
                    </a>
                    <a className="ps-gallery__link" href="#">
                      <img src="/img/instagram/instagram2.jpg" alt="" />
                    </a>
                    <a className="ps-gallery__link" href="#">
                      <img src="/img/instagram/instagram3.jpg" alt="" />
                    </a>
                    <a className="ps-gallery__link" href="#">
                      <img src="/img/instagram/instagram4.jpg" alt="" />
                    </a>
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
