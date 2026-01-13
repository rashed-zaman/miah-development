import React, { useState, useEffect } from "react";
import commonService from "../../service/menu/commonService";
import Canonical from "../../components/cnonical/Canonical";
import StaticHeader from "../../components/shared/header/StaticHeader";

export default function PrivacyPolicy() {
  // state
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // side effects

  useEffect(() => {
    commonService
      .getData("page/privacyPolicy")
      .then((res) => {
        setTitle(res.title);
        setBody(res.body);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Canonical />
      <StaticHeader
        title="Privacy Policy | MIAH"
        des="Read the privacy policy at MIAH to understand how we protect your personal information when you shop for our exclusive fashion collections."
      />
      <div className="container pt-5">
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: body }} />
      </div>
    </>
  );
}
