import React from "react";

export default function HeaderTop() {
  return (
    <div className="ps-header--top">
      <div className="ps-header__content">
        <div className="ps-header__social">
          <ul className="ps-header__list">
            <li className="ps-header__item">
              <a href="#" target="_blank">
                Facebook
              </a>
            </li>
            <li className="ps-header__item">
              <a href="#" target="_blank">
                Instagram
              </a>
            </li>
            <li className="ps-header__item">
              <a href="#" target="_blank">
                YouTube
              </a>
            </li>
          </ul>
        </div>
        <div className="ps-header__contact">
          <a className="ps-header__phone" href="tel:+8001234567890">
            (+800) 1234 5678 90
          </a>
          <a className="ps-header__mail" href="mailto:info@company.com">
            info@company.com
          </a>
          <div className="ps-language-currency">
            <select className="ps-single-no-search" name="state">
              <option value="en">EN</option>
              <option value="fr">FR</option>
            </select>
            <select className="ps-single-no-search" name="state">
              <option value="usd">USD</option>
              <option value="eur">EUR</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
