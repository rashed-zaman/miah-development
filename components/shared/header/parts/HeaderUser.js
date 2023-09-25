import Link from "next/link";
import React from "react";
import { MiahButton } from "../../../core/button/MiahButton";
import DashboradSideMenu from "../../../route/dashboard/DashboradSideMenu";
import HeaderUserInfo from "../../../route/dashboard/HeaderUserInfo";

export default function HeaderUser({ userInfo }) {
  return (
    <li className="ps-header__item open-user">
      <a className="ps-header__link" href="#">
        <img src="/img/icon/user.svg" alt="" />
      </a>
      {userInfo.token ? (
        <div className="ps-login--modal p-0">
          <HeaderUserInfo/>
          <DashboradSideMenu />
        </div>
      ) : (
        <div className="ps-login--modal">
          <Link href="/signin" scroll={false}>
            <a>
              <MiahButton>Signin</MiahButton>
            </a>
          </Link>
          <div>
            <br />
            {"Don't have account ?"}
            <Link href="/createaccount" scroll={false}>
              <a>
                <u> Create Account. </u>
              </a>
            </Link>
            <span style={{ marginLeft: "5px" }}> </span>
            <Link href="/password-recovery" scroll={false}>
              <a>
                <u>Forget Password. </u>
              </a>
            </Link>
          </div>
        </div>
      )}

      {/* <form method="get" action="do_action">
          <div className="form-group">
            <label>Username or Email Address</label>
            <input className="form-control" type="text" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input className="form-control" type="password" />
          </div>
          <div className="ps-login__footer">
            <button
              className="ps-btn ps-btn--rounded ps-btn--dark"
              type="submit"
            >
              Log In
            </button>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="rememberCheck"
              />
              <label className="form-check-label" htmlFor="rememberCheck">
                Remember Me
              </label>
            </div>
          </div>
        </form> */}
    </li>
  );
}
