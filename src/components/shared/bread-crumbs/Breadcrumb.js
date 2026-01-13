import Link from "next/link";
import React from "react";

export default function Breadcrumb() {
  return (
    <ul className="ps-breadcrumb">
      <li className="ps-breadcrumb__item">
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li className="ps-breadcrumb__item">
        <a className="active" aria-current="page" href="#">
          Shop
        </a>
      </li>
    </ul>
  );
}
