
import Link from "next/link";
import dynamic from "next/dynamic";
const HeaderRight = dynamic(() => import("./HeaderRight"));

export default function HeaderInner({ menu }) {
  return (
    <div className="ps-header__inner">
      <div className="ps-header__left">
        <div className="ps-logo">
          <Link href="/">
              <img src="/img/logo.gif" />
              <img className="logo-sticky" src="/img/web-black-logo.gif" />
          </Link>
        </div>
      </div>
      <div className="ps-header__center">
        <ul className="menu">
          {menu &&
            menu.map((root, rootIndex) => {
              return (
                <li key={rootIndex} className="has-mega-menu">
                  <Link href={"/" + root.slug} onClick={(e) => e.preventDefault()}>
                      {root.root_category}
                      <span className="sub-toggle">
                        <i className="fa fa-chevron-down"></i>
                      </span>
                  </Link>
                  <div className="mega-menu">
                    <div className="container">
                      <div className="mega-menu__row">
                        {root.category
                          ? root.category.map((category, categoryIndex) => {
                              return (
                                <div
                                  className="mega-menu__column column-flex"
                                  key={categoryIndex}
                                >
                                  <span>
                                    <Link
                                      href={
                                        "/" + root.slug + "/" + category.slug
                                      }
                                    >
                                      {category.category}
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
                                                    // "/" +
                                                    // category.slug +
                                                    "/" +
                                                    subcategory.slug
                                                  }
                                                >

                                                    {subcategory.sub_category}
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
                    </div>
                  </div>
                </li>
              );
            })}
          {/* <li className="has-mega-menu">
            <Link href={"/eid-collection"}>
              <a>Eid Collection</a>
            </Link>
          </li> */}

          <li className="has-mega-menu">
            <Link href={"/exclusive-trendz-product/saleableProduct"}>
              Sale
            </Link>
          </li>
        </ul>
      </div>
      <HeaderRight />
    </div>
  );
}
