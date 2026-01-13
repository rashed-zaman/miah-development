import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import StaticHeader from "../../components/shared/header/StaticHeader";
import Canonical from "../../components/cnonical/Canonical";


export default function SiteMap() {
  // hooks
  const menu = useSelector((state) => state.menu.menu);

  return (
    <>
      <Canonical />
      <StaticHeader
        title="Sitemap - Navigate Our Pages | MIAH"
        des="Explore the MIAH Sitemap to easily navigate all pages, including Men, Women, Kids and informative sections. Find everything you need in one place!"
      />
      <div className="ps-header__inner" id="sitemap">
        <div className="ps-header__center">
          <div className="container">
            <ul className="menu">
              {menu &&
                menu.map((root, rootIndex) => {
                  return (
                    <li key={rootIndex} className="has-mega-menu">
                      <Link href={"/" + root.slug}>
                        <a>{root.root_category}</a>
                      </Link>
                      <div className="mega-menu__row">
                        {root.category
                          ? root.category.map((category, categoryIndex) => {
                              return (
                                <div
                                  className="mega-menu__column"
                                  key={categoryIndex}
                                >
                                  <span>
                                    <Link
                                      href={
                                        "/" + root.slug + "/" + category.slug
                                      }
                                    >
                                      <a>{category.category}</a>
                                    </Link>
                                  </span>
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
                            })
                          : null}
                      </div>
                    </li>
                  );
                })}
              <li className="has-mega-menu">
                <Link href={"/exclusive-trendz-product/saleableProduct"}>
                  <a>Sale</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
