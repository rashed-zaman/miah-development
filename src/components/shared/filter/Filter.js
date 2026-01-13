import React from "react";

export default function Filter({ setFilter, setMobileFilter }) {
  return (
    <div className="row">
      <div className="col-12 col-lg-3">
        <h3 className="ps-shop__name">Women</h3>
      </div>
      <div className="col-12 col-lg-9">
        <div
          className="ps-wrapper--mobile"
          onClick={() => setMobileFilter(true)}
        >
          <a className="ps-wrapper__action filter shop-filter">
            <img className="icon-funnel" src="/img/icon/filter.svg" alt="" />
            Filters & Sort
          </a>
        </div>
        <div className="ps-wrapper" style={{ display: "none" }}>
          <div className="ps-wrapper__type"></div>
          <div className="ps-wrapper__onsale"></div>
          <div className="ps-wrapper__show" onClick={() => setFilter(true)}>
            <a className="ps-wrapper__action filter shop-filter">
              <img
                className="icon-funnel mr-2"
                src="/img/icon/filter.svg"
                alt=""
              />
              Filters & Sort
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
