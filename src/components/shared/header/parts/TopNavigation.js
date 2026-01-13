import React from "react";

export default function TopNavigation() {
  return (
    <nav className="ps-navigation">
      <div className="container">
        <ul className="menu">
          <li className="has-mega-menu">
            <a href="#">
              Shop
              <span className="sub-toggle">
                <i className="fa fa-chevron-down"></i>
              </span>
            </a>
            <div className="mega-menu">
              <div className="container">
                <div className="mega-menu__row">
                  <div className="mega-menu__column column-flex">
                    <h4>Men</h4>
                    <ul className="sub-menu--mega sub-column--2">
                      <li>
                        <a href="#">Jackets &amp; Coats</a>
                      </li>
                      <li>
                        <a href="#">Suits</a>
                      </li>
                      <li>
                        <a href="#">Jeans</a>
                      </li>
                      <li>
                        <a href="#">Swimwear</a>
                      </li>
                      <li>
                        <a href="#">Loungewear</a>
                      </li>
                      <li>
                        <a href="#">T-shirts</a>
                      </li>
                      <li>
                        <a href="#">Polo shirts</a>
                      </li>
                      <li>
                        <a href="#">Tracksuits</a>
                      </li>
                      <li>
                        <a href="#">Shirts</a>
                      </li>
                      <li>
                        <a href="#">Trousers</a>
                      </li>
                      <li>
                        <a href="#">Shorts</a>
                      </li>
                      <li>
                        <a href="#">Underwear</a>
                      </li>
                    </ul>
                  </div>
                  <div className="mega-menu__column column-flex">
                    <h4>Women</h4>
                    <ul className="sub-menu--mega sub-column--2">
                      <li>
                        <a href="#">Coats &amp; Jackets</a>
                      </li>
                      <li>
                        <a href="#">Dresses</a>
                      </li>
                      <li>
                        <a href="#">Jeans</a>
                      </li>
                      <li>
                        <a href="#">Lingerie</a>
                      </li>
                      <li>
                        <a href="#">Loungewear</a>
                      </li>
                      <li>
                        <a href="#">Shorts</a>
                      </li>
                      <li>
                        <a href="#">Skirts</a>
                      </li>
                      <li>
                        <a href="#">Suits</a>
                      </li>
                      <li>
                        <a href="#">Swimwear</a>
                      </li>
                      <li>
                        <a href="#">Tops</a>
                      </li>
                      <li>
                        <a href="#">Trousers</a>
                      </li>
                    </ul>
                  </div>
                  <div className="mega-menu__column column-flex">
                    <h4>Other</h4>
                    <ul className="sub-menu--mega sub-column--2">
                      <li>
                        <a href="#">Accessories</a>
                      </li>
                      <li>
                        <a href="#">Bags</a>
                      </li>
                      <li>
                        <a href="#">Belts</a>
                      </li>
                      <li>
                        <a href="#">Hats</a>
                      </li>
                      <li>
                        <a href="#">Watches</a>
                      </li>
                      <li>
                        <a href="#">Jewellery</a>
                      </li>
                      <li>
                        <a href="#">Sale</a>
                      </li>
                      <li>
                        <a href="#">Vintage</a>
                      </li>
                      <li>
                        <a href="#">Designers</a>
                      </li>
                      <li>
                        <a href="#">Lifestyle</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}
