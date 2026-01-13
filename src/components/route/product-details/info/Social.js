import React from "react";

export default function Social() {
  return (
    <>
      <div className="ps-product__variations">
        <span className="ps-product__link">
          <i className="fa fa-heart-o"></i>Add to wishlist
        </span>
      </div>
      <div className="ps-product__social">
        <ul className="ps-social">
          <li>
            <a className="ps-social__link facebook" href="#">
              <i className="fa fa-facebook"> </i>
              <span className="ps-tooltip">Facebook</span>
            </a>
          </li>
          <li>
            <a className="ps-social__link instagram" href="#">
              <i className="fa fa-instagram"></i>
              <span className="ps-tooltip">Instagram</span>
            </a>
          </li>
          <li>
            <a className="ps-social__link youtube" href="#">
              <i className="fa fa-youtube-play"></i>
              <span className="ps-tooltip">Youtube</span>
            </a>
          </li>
          <li>
            <a className="ps-social__link pinterest" href="#">
              <i className="fa fa-pinterest-p"></i>
              <span className="ps-tooltip">Pinterest</span>
            </a>
          </li>
          <li>
            <a className="ps-social__link linkedin" href="#">
              <i className="fa fa-linkedin"></i>
              <span className="ps-tooltip">Linkedin</span>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
