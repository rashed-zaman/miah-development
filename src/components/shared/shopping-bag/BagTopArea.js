import Link from "next/link";
import React from "react";

export default function BagTopArea({ shoppingBagQty }) {
  return (
    <>
      <ul className="ps-breadcrumb">
        <li className="ps-breadcrumb__item">
          <Link href="/">
            Home
          </Link>
        </li>
        <li className="ps-breadcrumb__item">
          <Link className="active" aria-current="page" href="#">
            Shopping bag
          </Link>
        </li>
      </ul>
      <h3 className="ps-shopping__title">
        Shopping bag<span className="badge">{shoppingBagQty}</span>
      </h3>
    </>
  );
}
