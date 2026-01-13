import Link from "next/link";
import React from "react";
import { MiahButton } from "@/components/core/button/MiahButton";
// import DashboradSideMenu from "@/components/route/dashboard/DashboradSideMenu";
import HeaderUserInfo from "@/components/route/dashboard/HeaderUserInfo";

export default function HeaderUser({ userInfo }) {
  return (
    <li className="ps-header__item cursor-pointer open-user ps-header__link" href="#">
      <span className="ps-header__link">
        <img src="/img/icon/user.svg" alt="" />
      </span>
      {userInfo.token ? (
        <div className="ps-login--modal p-0">
          <HeaderUserInfo/>
          {/* <DashboradSideMenu /> */}
        </div>
      ) : (
        <div className="ps-login--modal">
          <Link href="/signin" scroll={false}>
              <MiahButton>Signin</MiahButton>
          </Link>
          <div>
            <br />
            {"Don't have account ?"}
            <Link href="/createaccount" scroll={false}>
                <u> Create Account. </u>
            </Link>
            <span style={{ marginLeft: "5px" }}> </span>
            <Link href="/password-recovery" scroll={false}>
                <u>Forget Password. </u>
            </Link>
          </div>
        </div>
      )}
    </li>
  );
}
