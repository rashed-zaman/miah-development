import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

// import HeaderRight from "./HeaderRight";

const HeaderRight = dynamic(() => import("./HeaderRight"));

export default function Inner({ menu }) {
  return (
    <div className="ps-header__inner">
      <div className="ps-header__left">
        <div className="ps-logo">
          <Link href="/">
            <a>
              <img
                src="/img/web-black-logo.gif"
                alt=""
                style={{ width: "200px" }}
              />
            </a>
          </Link>
        </div>
      </div>
      <div className="ps-header__center">
        <ul className="menu">
          {menu &&
            menu.map((root, rootIndex) => {
              return (
                <li key={rootIndex} className="has-mega-menu">
                  <Link href={"/" + root.slug}>
                    <a>
                      {root.root_category}
                      <span className="sub-toggle">
                        <i className="fa fa-chevron-down"></i>
                      </span>
                    </a>
                  </Link>
                  <div className="mega-menu">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-5 text-right">
                          <img src="/img/1.jpg" alt="" />
                        </div>
                        <div className="col-md-7">
                          <div className="row">
                            {root.category &&
                              root.category.map((category, categoryIndex) => {
                                return (
                                  <div
                                    className={
                                      categoryIndex > 3
                                        ? "mega-menu__column col-md-2 mt-4"
                                        : "mega-menu__column col-md-2"
                                    }
                                    key={categoryIndex}
                                  >
                                    <h4>
                                      <Link
                                        href={
                                          "/" + root.slug + "/" + category.slug
                                        }
                                      >
                                        <a>{category.category}</a>
                                      </Link>
                                    </h4>
                                    <ul className="sub-menu--mega sub-column--1">
                                      {category.subcategory
                                        ? category.subcategory.map(
                                            (subcategory, subcategoryIndex) => {
                                              return (
                                                <li key={subcategoryIndex}>
                                                  <Link
                                                    href={
                                                      "/" +
                                                      root.slug +
                                                      "/" +
                                                      category.slug +
                                                      "/" +
                                                      subcategory.slug
                                                    }
                                                  >
                                                    <a>
                                                      {subcategory.sub_category}
                                                    </a>
                                                  </Link>
                                                </li>
                                              );
                                            }
                                          )
                                        : null}
                                    </ul>
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
            {/* <li className="has-mega-menu">
              <Link href={"/exclusive-trendz-product/festiveProduct"}>
                <a>
                  Eid Collection
                </a>
              </Link>
            </li> */}
            <li className="has-mega-menu">
              <Link href={"/exclusive-trendz-product/saleableProduct"}>
                <a>
                 Sale
                </a>
              </Link>
            </li>
        </ul>
      </div>
      <HeaderRight />
    </div>
  );
}
